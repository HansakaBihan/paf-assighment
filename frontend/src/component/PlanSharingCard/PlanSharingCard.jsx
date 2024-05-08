import React, { useState } from "react";
import "./PlanSharingCard.css";
import profileImage from "../../assets/avatar.png";
import wcard from "../../assets/wcard.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";
import ReplyModal from "../HomeSection/ReplyModal";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

function PlanSharingCard() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const [openReplyModal, setOpenReplyModal] = useState(false);
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
    <div className="flex space-x-5 ">
      <Avatar
        className="cursor-pointer"
        alt="username"
        src={profileImage}
        style={{ marginLeft: 40, width: 60, height: 60 }}
      />

      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center WorkoutStatusCard cursor-pointer">
            <span className="font-semibold" style={{ fontSize: "18px" }}>
              Shannon Fernando
            </span>
            <span className="text-gray-600">@shannon . 2m</span>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                "&:hover": {
                  bgcolor: "#ffffff",
                },
              }}>
              <MoreHorizIcon
                style={{
                  color: "#6C08CB",
                  width: 35,
                  height: 35,
                  marginRight: 70,
                }}
              />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem
                onClick={handleDeleteFitLink}
                style={{ fontWeight: 300 }}>
                Details
              </MenuItem>
              <MenuItem
                onClick={handleDeleteFitLink}
                style={{ fontWeight: 300 }}>
                Delete
              </MenuItem>
              <MenuItem
                onClick={handleDeleteFitLink}
                style={{ fontWeight: 300 }}>
                Edit
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="mt-1">
          <div className="cursor-pointer">
            <p className="p-0 mb-2" style={{ fontSize: "18px" }}>
              My Fitness Plans are here 🤗
            </p>
            <div
              className="flex flex-col  border border-gray-400 rounded-md"
              style={{ width: "70%" }}>
              <p
                style={{
                  marginTop: "4px",
                  color: "green",
                  fontSize: "18px",
                  marginLeft: "358px",
                  fontWeight: 600,
                }}>
                My Plans
              </p>
              <div className="flex flex-row mt-2">
                <div className="flex flex-col">
                  <b>
                    <h1 style={{ fontSize: "24px", marginLeft: "20px" }}>
                      Push Ups
                    </h1>
                  </b>
                  <h1 style={{ fontSize: "20px", marginLeft: "20px" }}>
                    2024.04.18
                  </h1>
                </div>

                <div style={{ marginLeft: "238px" }}>
                  <PendingActionsIcon
                    style={{ width: 60, height: 60, color: "#A05AEA" }}
                  />
                </div>
              </div>

              <div className="flex flex-row mt-7">
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    textAlign: "center",
                    marginLeft: "20px",
                  }}>
                  No Of Sets - 03
                </h2>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    textAlign: "center",
                    marginLeft: "115px",
                  }}>
                  No Of Repetitions - 10
                </h2>
              </div>

              <div
                className="mt-4"
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  marginBottom: "45px",
                }}>
                <p style={{ textAlign: "justify" }}>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between py-5">
            <div className="flex items-center space-x-3 text-gray-600">
              <ChatBubbleOutlineIcon
                className="cursor-pointer"
                onClick={handleOpenReplyModel}
                style={{ height: 30, width: 30 }}
              />
              <p>48</p>
            </div>
            <div
              className={`${
                true ? "text-pink-600" : "text-gray-600"
              } space-x-1 flex
              items-center`}>
              {true ? (
                <FavoriteIcon
                  onClick={handleLikeFitLink}
                  className="cursor-pointer"
                  style={{ height: 30, width: 30 }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={handleLikeFitLink}
                  className="cursor-pointer"
                  style={{ height: 30, width: 30 }}
                />
              )}
              <p style={{ marginRight: 400 }}>106</p>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal open={openReplyModal} handleClose={handleCloseReplyModal}/>
      </section>
    </div>
  );
}

export default PlanSharingCard;
