import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Typography,
} from "@mui/material";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import {
  Image,
  useCreateGoalMutation,
  useGetAllImagesQuery,
} from "../api/goalApi";

//MUI Dialog Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "500px", // Adjust the width value as per your requirement
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

//MUI DialogTitle Properties
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

//MUI Dialog Creation
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
//To set today's date as current date
const currentDate = new Date().toISOString().split("T")[0];
console.log("currentDate ", currentDate);

export default function CreateGoals() {
  // set selected image
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  //Handle dialog open and close button
  const [open, setOpen] = useState(false);
  //React hook form for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  //Function to handle on opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Function to handle while closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  //Get goal images
  const { data: images } = useGetAllImagesQuery();
  //Handle card image click
  const handleCardClick = (imageUrl: any, imageName: any) => {
    setSelectedImageUrl(imageUrl);
    setSelectedImageName(imageName);
  };
  //Save the Data on form submit
  const [createGoal] = useCreateGoalMutation();
  const onSubmit = async (formData: any) => {
    // e.preventDefault();
    console.log(formData);
    // const formDataToSend = {
    //     ...formData,
    //     goalImageUrl: selectedImageUrl,
    //   };
    try {
      await createGoal(formData);
      console.log("Goal Created successfully");
      //close the dialog once it is submitted
      setOpen(false);
      // Handle success
      navigate("/goal");
    } catch (error) {
      // Handle error
      console.log("Error creating the goal");
    }
  };
  const filteredImages = images?.filter(
    (image) => image.imageName !== "HomePageImg"
  );

  const isButtonDisabled = !selectedImageUrl;

  return (
    <Box marginLeft={40} marginTop={5}>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          Select your goal type
          <Button
            sx={{ marginLeft: 45 }}
            variant="outlined"
            onClick={handleClickOpen}
            disabled={isButtonDisabled}
          >
            Create New Goal
          </Button>
        </Typography>
      </Box>
      <Box border={1} borderColor="primary.main" p={2} mt={2} marginRight={10}>
        <Grid display={"flex"} container spacing={2} justifyContent="center">
          {filteredImages?.map((image: Image, index) => (
            <Grid item xs={3} sm={4} key={index}>
              <Card
                key={image.imageUrl}
                onClick={() => handleCardClick(image.imageUrl, image.imageName)}
                sx={{
                  border:
                    selectedImageUrl === image.imageUrl
                      ? "2px solid blue"
                      : "none",
                }}
              >
                <CardMedia
                  component="img"
                  image={image.imageUrl}
                  alt={image.imageName}
                  style={{ objectFit: "cover", flexGrow: 1 }} // Set the desired height of the image
                />
                <CardContent>
                  <Typography component="div">{image.imageName}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create New Goal
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(onSubmit)}>
            {selectedImageUrl && (
              <Box display="flex" alignItems="center" marginRight={2}>
                <Box width={100} height={100} marginRight={2}>
                  <img
                    src={selectedImageUrl}
                    alt="Selected Goal"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography variant="h4">{selectedImageName}</Typography>
              </Box>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {selectedImageUrl && (
                <input
                  type="hidden"
                  value={selectedImageUrl}
                  {...register("goalImageUrl")}
                />
              )}
              <TextField
                id="standard-basic"
                variant="standard"
                label="Goal Name"
                {...register("goalName", { required: true })}
                error={!!errors.goalName}
                helperText={errors.goalName && "Goal Name is required"}
              />
              <TextField
                id="standard-basic"
                variant="standard"
                label="Description"
                {...register("description", { required: true })}
                error={!!errors.description}
                helperText={errors.description && "Description is required"}
              />

              <TextField
                id="standard-basic"
                variant="standard"
                label="Target Date"
                type="date"
                {...register("targetDate", { required: true })}
                error={!!errors.targetDate}
                helperText={errors.targetDate && "targetDate is required"}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: currentDate,
                }}
              />
              <TextField
                id="standard-basic"
                variant="standard"
                label="Target Amount"
                {...register("targetAmount", { required: true })}
                error={!!errors.targetAmount}
                helperText={errors.targetAmount && "Descriptionis required"}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
