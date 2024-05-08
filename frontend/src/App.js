import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and necessary routing components
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import AddPost from './component/AddPost';
import Posts from './component/Posts';
import AddPosts from './component/Posting/AddPosts';
import Sharemealplan from './component/MealPlan/Sharemealplan';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './component/Profile/Profile';
import WorkoutForm from './component/WorkoutPlan/WorkoutPlan';
import ShareStatus from './component/Status/status';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<AddPost />} />
        <Route path='/viewpost' element={<Posts />} />
        <Route path='/meal' element={<Sharemealplan />} />
        <Route path='/addposts' element={<AddPosts />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/workoutplan' element={<WorkoutForm />} />
        <Route path='/status' element={<ShareStatus />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
