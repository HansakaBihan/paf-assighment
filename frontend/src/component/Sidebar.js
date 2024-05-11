import React, { useState } from 'react';
import { Menu, Search, AppRegistration, FoodBank, SportsGymnastics, EditCalendar, AddAPhoto } from '@mui/icons-material'; // Import AddAPhoto icon
import './Sidebar.css'; // Assuming you have a CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };

  const menuBtnChange = () => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");

    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo-details">
        <i className='bx bxl-codepen icon'></i>
        <div className="logo_name">HealthClub</div>
        <Menu className={`menu-icon ${isOpen ? 'open' : ''} white-icon large-icon`} id="btn" onClick={toggleSidebar} />
      </div>
      <ul className="nav-list">
        <li className="search">
          {isOpen ? (
            <input type="text" placeholder="Search..." />
          ) : (
            <Search className="search-icon" />
          )}
        </li>
        <li>
          <a href="#">
            {!isOpen ? (
              <Menu className={`menu-icon white-icon large-icon`} id="btn" />
            ) : (
              <i className='bx bx-chat white-icon'></i>
            )}
            <span className="links_name">Dashboard</span>
          </a>
        </li>

        <li>
          <a href="/profile">
            {!isOpen ? (
              <AppRegistration className={`menu-icon white-icon large-icon`} id="btn" />
            ) : (
              <i className='bx bx-chat white-icon'></i>
            )}
            <span className="links_name">User</span>
          </a>
        </li>

        <li>
          <a href="/meal">
            {!isOpen ? (
              <FoodBank className={`menu-icon white-icon large-icon`} id="btn" />
            ) : (
              <i className='bx bx-chat white-icon'></i>
            )}
            <span className="links_name">Meal Sharing</span>
          </a>
        </li>


        <li>
          <a href="/workoutplan">
            {!isOpen ? (
              <SportsGymnastics className={`menu-icon white-icon large-icon`} id="btn" />
            ) : (
              <i className='bx bx-chat white-icon'></i>
            )}
            <span className="links_name">Workout Planning</span>
          </a>
        </li>

        <li>
          <a href="/status">
            {!isOpen ? (
              <EditCalendar className={`menu-icon white-icon large-icon`} id="btn" />
            ) : (
              <i className='bx bx-chat white-icon'></i>
            )}
            <span className="links_name">Status</span>
          </a>
        </li>

        {/* New list item for Post Sharing */}
        <li>
          <a href="/viewpost">
            {!isOpen ? (
              <AddAPhoto className={`menu-icon white-icon large-icon`} id="btn" />
            ) : (
              <i className='bx bx-camera white-icon'></i> // Assuming you want a camera icon
            )}
            <span className="links_name">Post Sharing</span>
          </a>
        </li>

        <li className="profile">
        <a href="/login">
          <div className="profile-details">
            <i className='bx bx-export'></i>
            <div className="name_job">
              <div className="name">Logout</div>
            </div>
          </div>
          <i className='bx bx-log-out' id="log_out"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
