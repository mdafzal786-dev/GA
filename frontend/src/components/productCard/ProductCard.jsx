/* eslint-disable react/prop-types */
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ProductData } from "../../context/ProductContext";
import { UserData } from "../../context/UserContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const {fetchProducts} = ProductData();  // Consolidated context usage

  // Function to handle product deletion
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {  // Added window to confirm for clarity
      try {
        const { data } = await axios.delete(`${server}/api/Product/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchProducts();  // Refetch products after deletion
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="product-card">
      <img src={`${server}/${product.image}`} alt="" className="product-image" />
      <h3>{product.title}</h3>
      <p>Instructor - {product.createdBy}</p>
      <p>Duration - {product.duration} weeks</p>
      <p>Price - ₹{product.price}</p>

      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(product._id) ? (
                <button
                  onClick={() => navigate(`/product/study/${product._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="common-btn"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/product/study/${product._id}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      )}

      <br />

      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(product._id)}
          className="common-btn"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ProductCard;
