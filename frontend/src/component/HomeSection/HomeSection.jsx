
import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import ImageIcon from "@mui/icons-material/Image";
import profileImage from "../../Images/avatar.png";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import * as Yup from "yup";
import FitLinkCard from "./FitLinkCard";

import WorkoutStatusCard from "../WorkoutStatusCard/WorkoutStatusCard";
import PlanSharingCard from "../PlanSharingCard/PlanSharingCard";
import MealplanCard from "../MealPlanCard/Mealplancard";



const validationSchema = Yup.object().shape({
  content: Yup.string().required("FitLink text is required"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, setSelectedImage] = useState("");

  const handleSubmit = (values) => {
    console.log("values", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div className="space-y-5">
      <section>
        <h1
          className="py-5 text-xl font-bold opacity-90"
          style={{ marginLeft: 40, fontSize: 24, color: "#1E0443" }}>
          Home
        </h1>

      </section>

      <section className={`pb-10`}>
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
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
              </div>
              {/*<div>
                <img src="" alt=""/>
            </div>*/}
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon style={{ color: "#6C08CB", width:30, height:30 }} />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                  </label>
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <SlideshowIcon style={{ color: "#6C08CB", width:30, height:30  }} />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                  </label>

                  <FmdGoodIcon className="flex items-center space-x-2 rounded-md cursor-pointer" style={{ color: "#6C08CB" , width:30, height:30  }} />
                  <TagFacesIcon className="flex items-center space-x-2 rounded-md cursor-pointer" style={{ color: "#6C08CB" , width:30, height:30 }} />
                  <div>
                    <Button
                      sx={{
                        borderRadius: "20px",
                        paddingY: "8px",
                        bgcolor: "#1E0443",
                        marginLeft:"275px",
                        width: "150px",
                        color:"#fffffff",
                        fontSize:"16px",
                        "&:hover": {
                            bgcolor: "#2D0754" 
                          }
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

      <section>
      {[1].map((item)=> <FitLinkCard/>)}
      {[1].map((item)=> <WorkoutStatusCard/>)}
      {[1].map((item)=> <PlanSharingCard/>)}
      {[1].map((item)=> <MealplanCard/>)}

      </section>
    </div>
  );
};

export default HomeSection;
