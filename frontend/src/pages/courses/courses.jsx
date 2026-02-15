import { useState } from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();
  const [search, setSearch] = useState("");

  // Filter courses
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="courses">
      <h2>Available Courses</h2>

      {/* Search Input */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="course-container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No matching courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
