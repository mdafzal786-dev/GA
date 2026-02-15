/* eslint-disable no-unused-vars */
import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/Header/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Verify from './pages/auth/Verify';
import Footer from './components/footer/Footer';
import About from './pages/about/About';
import Account from './pages/account/Account';
import { UserData } from './context/UserContext';
import Loading from './components/loading/Loading';
import Courses from './pages/courses/courses';
import Notes from './pages/Ebook/notes'
import ResultsB from './pages/Result/resultb'
import ResultC from './pages/Result/resultc'
import CourseDescription from './pages/coursedescription/CourseDescription';
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
import Dashbord from './pages/dashboard/Dashboard';
import CourseStudy from './pages/coursestudy/CourseStudy';
import Lecture from './pages/lecture/Lecture';
import AdminDashbord from './admin/Dashboard/AdminDashboard';
import AdminCourses from './admin/Courses/AdminCourses';
import AdminUsers from './admin/Users/AdminUsers';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Solution1 from './components/Solutions/solution1';
import Solution2 from './components/Solutions/solution2';
import Solution3 from './components/Solutions/solution3'
import Solution4 from './components/Solutions/solution4'
import Chatbot from './components/Chatbot/Chatbot';



const App = () => {
  const { isAuth, user, loading } = UserData();

  return (
    <>
      {loading ? <Loading /> : 
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses/>} />
            <Route path="/Notes" element={<Notes/>}/>
            <Route path="/solutions/class-9" element={<Solution1/>}/>
            <Route path="/solutions/class-10" element={<Solution2/>}/>
            <Route path="/solutions/class-11" element={<Solution3/>}/>
            <Route path="/solutions/class-12" element={<Solution4/>}/>
            <Route path="/result/bbse" element={<ResultsB/>}/>
            <Route path="/result/cbse" element={<ResultC/>}/>

            <Route path="/chatbot/ai" element={<Chatbot/>}/>

            
            <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/register" element={isAuth ? <Home /> : <Register />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />

            {/* ❗ FIXED — always allow */}
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            
            <Route path="/course/:id" element ={isAuth?<CourseDescription user={user}/>:<Login/>}/>
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashbord user={user} /> : <Login />}
            />
             <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
             <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
             path="/admin/dashboard" element={isAuth ? <AdminDashbord user={user}/>:<Login/>}
             />
            <Route
             path="/admin/course" element={isAuth ? <AdminCourses user={user}/>:<Login/>}
             />
              <Route
             path="/admin/users" element={isAuth ? <AdminUsers user={user}/>:<Login/>}
             />
              
              
          </Routes>
          <Footer />
        </BrowserRouter>
      }
    </>
  );
};

export default App;
