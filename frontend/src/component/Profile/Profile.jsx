import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import coverImg from "../../assets/cover.jpg";
import profileImage from "../../assets/girlpic.jpg";
import { Avatar, Box, Button, Tab } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FitLinkCard from "../HomeSection/FitLinkCard";
import WorkoutStatusCard from "../WorkoutStatusCard/WorkoutStatusCard";
import PlanSharingCard from "../PlanSharingCard/PlanSharingCard";
import "./profile.css"; // Import your CSS file

const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const navigate = useNavigate();
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleFollowUser = () => {
    console.log("follow user");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if (newValue === 4) {
      console.log("users meal plans");
    } else if (newValue === 1) {
      console.log("users posts");
    } else if (newValue === "home") {
      navigate("/");
    }
  };

  return (
    <div className="profile-container">
      <section className="header-section">
        <KeyboardBackspaceIcon className="back-icon" />
        <h1 className="profile-name">Hansaka Bihan</h1>
      </section>

      <section>
        <img className="cover-image" src={coverImg} alt="" />
      </section>

      <section className="profile-info-section">
        <div className="profile-header">
          <Avatar
            className="profile-avatar"
            alt="sewmi madhu"
            src={profileImage}
          />
          <Button
            variant="contained"
            className="edit-profile-button"
            onClick={handleFollowUser}
          >
            EDIT PROFILE
          </Button>
        </div>
        <div className="profile-details">
          <div className="profile-name">
            <h1>Hansak Bihan</h1>
            <p>@hans</p>
          </div>
          <p className="bio">
            An avid fitness enthusiast, I am committed to pushing personal limits
            and inspiring others through their dedication to a healthy and
            active lifestyle.
          </p>
          <div className="additional-details">
            <div className="detail">
              <BusinessCenterIcon className="icon" />
              <p>Education</p>
            </div>
            <div className="detail">
              <LocationOnIcon className="icon" />
              <p>Sri Lanka</p>
            </div>
            <div className="detail">
              <CalendarMonthIcon className="icon" />
              <p>Joined April 2024</p>
            </div>
          </div>
          <div className="follower-count">
            <div className="count">
              <span>1</span>
              <span className="label">Following</span>
            </div>
            <div className="count">
              <span>1</span>
              <span className="label">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="tabs-section">
        <TabContext value={tabValue}>
          <TabList
            onChange={handleTabChange}
            aria-label="lab API tabs example"
            className="tab-list"
          >
            <Tab label="HOME" value="home" />
            <Tab label="POSTS" value="1" />
            <Tab label="WORKOUT STATUS" value="2" />
            <Tab label="PLANS" value="3" />
            <Tab label="MEAL PLANS" value="4" />
          </TabList>
          <TabPanel value="1">
            {[1, 1, 1, 1].map((item) => (
              <FitLinkCard key={item} />
            ))}
          </TabPanel>
          <TabPanel value="2">
            {[1].map((item) => (
              <WorkoutStatusCard key={item} />
            ))}
          </TabPanel>
          <TabPanel value="3">
            {[1, 1, 1, 1].map((item) => (
              <PlanSharingCard key={item} />
            ))}
          </TabPanel>
          <TabPanel value="4">users meal plans</TabPanel>
        </TabContext>
      </section>
    </div>
  );
};

export default Profile;
