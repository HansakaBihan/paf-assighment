import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/girlpic.jpg";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ImageIcon from "@mui/icons-material/Image";
import { useFormik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function ReplyModal({handleClose,open}) {
  const navigate = useNavigate();

  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectImage, setSelectedImage] = React.useState("");


  const handleSubmit = (values) => {
    // Store the reply in local storage
    const storedReplies = JSON.parse(localStorage.getItem("replies")) || [];
    const newReply = {
      id: storedReplies.length + 1,
      content: values.content,
      timestamp: new Date().toISOString(),
    };
    storedReplies.push(newReply);
    localStorage.setItem("replies", JSON.stringify(storedReplies));

    // Close the modal
    handleClose();
  };


  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      fitlinkId: 4,
    },
    onSubmit: handleSubmit,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex space-x-5">
            <Avatar
              onClick={() => navigate(`/profile/${6}`)}
              className="cursor-pointer"
              alt="username"
              src={profileImage}
              style={{ marginLeft: 40, width: 60, height: 60 }}
            />

            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                  <span className="font-semibold" style={{ fontSize: "18px" }}>
                    Shannon Fernando
                  </span>
                  <span className="text-gray-600">@shannon . 2m</span>
                </div>
              </div>

              <div className="mt-1">
                <div
                  onClick={() => navigate(`/fitlink/${3}`)}
                  className="cursor-pointer">
                  <p className="mb-2 p-0" style={{ fontSize: "18px" }}>
                    Quick Fitness Tips 👍
                  </p>
                </div>
              </div>
            </div>
            
          </div>
          <section className={`py-10`}>
              <div className="flex space-x-5">
                <Avatar
                  alt="username"
                  src={profileImage}
                  style={{ marginLeft: 40, width: 60, height: 60 }}
                />
                <div className="w-full">
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <input
                        type="text"
                        name="content"
                        placeholder="What is happening?"
                        className={`border-none outline-none text-xl bg-transparent`}
                        {...formik.getFieldProps("content")}
                      />
                      {formik.errors.content && formik.touched.content && (
                        <span className="text-red-500">
                          {formik.errors.content}
                        </span>
                      )}
                    </div>
                    <div>
                      <img src="" alt="" />
                    </div>
                    <div className="flex justify-between items-center mt-5">
                      <div className="flex space-x-5 items-center">
                        <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                          <ImageIcon
                            style={{ color: "#6C08CB", width: 30, height: 30 }}
                          />
                          <input
                            type="file"
                            name="imageFile"
                            className="hidden"
                            onChange={handleSelectImage}
                          />
                        </label>
                        <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                          <SlideshowIcon
                            style={{ color: "#6C08CB", width: 30, height: 30 }}
                          />
                          <input
                            type="file"
                            name="imageFile"
                            className="hidden"
                            onChange={handleSelectImage}
                          />
                        </label>

                        <FmdGoodIcon
                          className="flex items-center space-x-2 rounded-md cursor-pointer"
                          style={{ color: "#6C08CB", width: 30, height: 30 }}
                        />
                        <TagFacesIcon
                          className="flex items-center space-x-2 rounded-md cursor-pointer"
                          style={{ color: "#6C08CB", width: 30, height: 30 }}
                        />
                        <div>
                          <Button
                            sx={{
                              borderRadius: "20px",
                              paddingY: "8px",
                              bgcolor: "#1E0443",
                              marginLeft: "85px",
                              width: "100px",
                              color: "#fffffff",
                              fontSize: "16px",
                              "&:hover": {
                                bgcolor: "#2D0754",
                              },
                            }}
                            variant="contained"
                            type="submit">
                            POST
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
        </Box>
      </Modal>
    </div>
  );
}
