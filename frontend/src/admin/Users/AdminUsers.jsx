/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './users.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import Layout from '../Utils/Layout';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.mainrole !== "superadmin") return navigate("/");

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockReason, setBlockReason] = useState("");
  const [isBlocking, setIsBlocking] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUsers(data.users);
      setFiltered(data.users);
    } catch (error) {
      toast.error("Failed to load users");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search + Filter
  useEffect(() => {
    let data = users;

    if (search) {
      data = data.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      data = data.filter(u => u.role === roleFilter);
    }

    setFiltered(data);
    setPage(1);
  }, [search, roleFilter, users]);

  // Sorting
  const sortByField = (field) => {
    const sorted = [...filtered].sort((a, b) => 
      a[field].localeCompare(b[field])
    );
    setFiltered(sorted);
  };

  // Update Role
  const updateRole = async (id) => {
    if (!confirm("Change user role?")) return;
    try {
      const { data } = await axios.put(`${server}/api/user/${id}`, {}, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success(data.message);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  // Block / Unblock User with Email
  const toggleBlockUser = async (userId, currentStatus, userEmail, userName) => {
    const isBlockingNow = currentStatus !== "blocked";
    const action = isBlockingNow ? "block" : "unblock";

    if (isBlockingNow) {
      const reason = prompt(
        `You are about to BLOCK ${userName}\n\nWrite a reason (will be sent via email):`,
        "Violation of community guidelines"
      );
      if (!reason || reason.trim() === "") {
        toast.error("Reason is required to block user");
        return;
      }
      setBlockReason(reason);
    }

    if (!confirm(`Are you sure you want to ${action} this user?`)) return;

    setIsBlocking(true);
    try {
      const { data } = await axios.put(
        `${server}/api/user/block/${userId}`,
        { 
          block: isBlockingNow,
          reason: isBlockingNow ? blockReason : null 
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      toast.success(data.message);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${action} user`);
    } finally {
      setIsBlocking(false);
      setBlockReason("");
    }
  };

  // Excel Download
  const downloadExcel = () => {
    if (filtered.length === 0) {
      toast.error("No users to export");
      return;
    }

    const excelData = filtered.map(u => ({
      Name: u.name,
      Email: u.email,
      Role: u.role,
      Status: u.status,
      User_ID: u._id,
      CreatedAt: u.createdAt ? new Date(u.createdAt).toLocaleString() : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      `Users_${Date.now()}.xlsx`
    );

    toast.success("Excel file downloaded");
  };

  // Pagination
  const startIndex = (page - 1) * usersPerPage;
  const paginatedUsers = filtered.slice(startIndex, startIndex + usersPerPage);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>

        {/* Filters + Download button */}
        <div className="user-controls">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
            <option value="superadmin">SuperAdmin</option>
          </select>

          <button className="btn-download" onClick={downloadExcel}>
            📥 Download Excel
          </button>
        </div>

        <div className="users__table-wrapper">
          <table className="users__table">
            <thead>
              <tr>
                <th>#</th>
                <th onClick={() => sortByField("name")}>Name (Sort)</th>
                <th onClick={() => sortByField("email")}>Email (Sort)</th>
                <th onClick={() => sortByField("role")}>Role (Sort)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((e, i) => {
                  const isBlocked = e.status === "blocked";
                  return (
                    <tr key={e._id} className={isBlocked ? "blocked-row" : ""}>
                      <td>{startIndex + i + 1}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>
                        <span className={`role-badge ${e.role}`}>
                          {e.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${isBlocked ? "blocked" : "active"}`}>
                          {isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="actions">
                        <button className="btn btn-info" onClick={() => setSelectedUser(e)}>
                          View
                        </button>
                        <button className="btn" onClick={() => updateRole(e._id)}>
                          Update Role
                        </button>
                        <button
                          className={`btn ${isBlocked ? "btn-success" : "btn-danger"}`}
                          onClick={() => toggleBlockUser(e._id, e.status, e.email, e.name)}
                          disabled={isBlocking}
                          style={{ minWidth: "90px" }}
                        >
                          {isBlocking ? "..." : isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan="6">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>

        {/* Modal */}
        {selectedUser && (
          <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h3>User Details</h3>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> <span className={`role-badge ${selectedUser.role}`}>{selectedUser.role}</span></p>
              <p><strong>Status:</strong> 
                <span className={`status-badge ${selectedUser.status === "blocked" ? "blocked" : "active"}`}>
                  {selectedUser.status === "blocked" ? "Blocked" : "Active"}
                </span>
              </p>
              <p><strong>ID:</strong> <code>{selectedUser._id}</code></p>
              <button onClick={() => setSelectedUser(null)} className="btn">Close</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminUsers;
