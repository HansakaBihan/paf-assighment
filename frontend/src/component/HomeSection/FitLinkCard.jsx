import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/girlpic.jpg";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostImage from "../../assets/first.jpg";
import ReplyModal from "./ReplyModal";
import "./fitLinkCard.css";

const FitLinkCard = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openReplyModal, setOpenReplyModal] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteFitLink = () => {
    console.log("Delete FitLink");
    handleClose();
  };

  const handleLikeFitLink = () => {
    console.log("handle like FitLink");
  };

  return (
    <React.Fragment>
      <div className="fitlink-card">
        <div className="user-info">
          <div
            className="profile-infos"
            onClick={() => navigate(`/profile/${6}`)}
          >
            <img className="profile-images" src={profileImage} alt="profile" />
            <div className="username">
              <span className="name">Shannon Fernando</span>
              <span className="handle">@shannon . 2m</span>
            </div>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="more-icon-button"
            >
              <MoreHorizIcon className="more-icon" />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleDeleteFitLink}>Details</MenuItem>
              <MenuItem onClick={handleDeleteFitLink}>Delete</MenuItem>
              <MenuItem onClick={handleDeleteFitLink}>Edit</MenuItem>
            </Menu>
          </div>
        </div>

        <div className="post-info">
          <div onClick={() => navigate(`/fitlink/${3}`)}>
            <p className="post-title">Quick Fitness Tips 👍</p>
            <img className="post-image" src={PostImage} alt="post" />
          </div>
          <div className="interaction">
            <div className="comments">
              <ChatBubbleOutlineIcon
                className="comment-icon"
                onClick={handleOpenReplyModel}
              />
              <span>43</span>
            </div>
            <div className="likes">
              <span>54</span>
              <div
                className={`like-icon ${
                  true ? "liked" : ""
                }`}
                onClick={handleLikeFitLink}
              >
                {true ? (
                  <FavoriteIcon className="liked-icon" />
                ) : (
                  <FavoriteBorderIcon className="not-liked-icon" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <ReplyModal open={openReplyModal} handleClose={handleCloseReplyModal} />
      </section>
    </React.Fragment>
  );
};

export default FitLinkCard;
