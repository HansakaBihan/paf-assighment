import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import {
  IconButton,
  TextField,
  createTheme,
  ThemeProvider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import coverImg from "../../assets/coverImg.png";
import AvatarImg from "../../assets/girlpic.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1E0443",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  color: "white",
  borderRadius: 4,
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E0443", // Change primary color
    },
    text: {
      primary: "white", // Change text color to white
    },
    action: {
      hover: "rgba(255, 255, 255, 0.6)", // Change hover color with 60% opacity
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderColor: "rgba(255, 255, 255, 0.8)", // Change border color with 60% opacity
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Change hover color to white
          },
        },
      },
    },
  },
});

export default function ProfileModal({ open, handleClose }) {
  //   const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const handleSubmit = (values) => {
    console.log("handle submit", values);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      image: "",
    },
    onSubmit: handleSubmit,
  });

  const handleImageChange = (event) => {
    setUploading(true);
    const { name } = event.target;
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    setUploading(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon style={{ color: "white" }} />
                </IconButton>
                <p style={{ color: "white", fontSize: "18px" }}>Edit Profile</p>
              </div>
              <Button
                type="submit"
                style={{ color: "white", fontSize: "18px" }}>
                SAVE
              </Button>
            </div>
            <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
              <React.Fragment>
                <div className="w-full">
                  <div className="relative">
                    <img
                      className="w-full h-[12rem] object-cover object-center"
                      src={coverImg}
                      alt=""
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      name="backgroundImage"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                  <div className="relative">
                    <Avatar
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px solid white",
                      }}
                      src={AvatarImg}
                    />

                    <input
                      className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      name="image"
                      type="file"
                    />
                  </div>
                </div>
              </React.Fragment>

              <div className="space-y-3">
                <ThemeProvider theme={theme}>
                  <TextField
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fullName && Boolean(formik.errors.fullName)
                    }
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                    }
                    InputLabelProps={{
                      style: {
                        color: "rgba(255, 255, 255, 0.6)",
                      },
                    }}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="bio"
                    name="bio"
                    label="Bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                    helperText={formik.touched.bio && formik.errors.bio}
                    InputLabelProps={{
                      style: {
                        color: "rgba(255, 255, 255, 0.6)",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    id="website"
                    name="website"
                    label="Website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.website && Boolean(formik.errors.website)
                    }
                    helperText={formik.touched.website && formik.errors.website}
                    InputLabelProps={{
                      style: {
                        color: "rgba(255, 255, 255, 0.6)",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="Location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
                    }
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    InputLabelProps={{
                      style: {
                        color: "rgba(255, 255, 255, 0.6)",
                      },
                    }}
                  />
                </ThemeProvider>
                <div className="my-3">
                  <p className="text-lg">Birth Date . Edit</p>
                  <p className="text-2xl">October 05, 2001</p>
                </div>
                <p className="py-3 text-lg">Edit Professional Profile</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
