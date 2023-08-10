import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";

export default function ImageUpload({ userDisp, isOpen, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageSelected, setImageSelected] = useState('');

  function clearInputs() {
    setTitle('');
    setDescription('');
    setImageSelected('');
  }

  // const addImage = async (files) => {
  //   try {
  //     let image_url = '';

  //     if (imageSelected !== '') {
  //       const formData = new FormData();
  //       formData.append('file', imageSelected); // appending the imageSelected state to be the file selected by the user
  //       formData.append('upload_preset', 'scbbuugt'); // this is needed to upload to the cloudinary account

  //       // This does the actual work of posting the image to the cloudinary server
  //       const response = await axios.post('https://api.cloudinary.com/v1_1/lake-association-manager/image/upload', formData);
  //       // setting the variable of the image url from the response
  //       image_url = response.data.secure_url;
  //     }
  //     dispatch({ // This fires the post request to insert a new image into the db
  //       type: 'ADD_IMG',
  //       payload: {
  //         title: title,
  //         description: description,
  //         url: image_url,
  //         userDisp
  //       }
  //     });
  //     clearInputs();
  //   } catch (err) {
  //     console.log("Image add error!", err);
  //   }
  // };

  function addImage() {
    dispatch({
      type: 'ADD_IMG',
      payload: {
        title: title,
        description: description,
        image: imageSelected,
        userDisp,
      },
    });
    clearInputs();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: 4,
          borderRadius: '16px',
          borderColor: 'rgb(114, 162, 245)',
          boxShadow: 24,
          p: 4,
        }}>
        <CardHeader
          title="Add Image"
        />
        <TextField
          type="text"
          lable="Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 1.5 }}
        />
        <TextField
          type="text"
          lable="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={6}
          sx={{ mb: 1.5 }}
        />
        <input
          className="file-btn"
          type="file"
          onChange={e => setImageSelected(e.target.files[0])}
        />
        <Button
          onClick={addImage}
          variant="contained"
          color="primary"
          sx={{ mr: 1.5 }}
        >
          Submit</Button>

        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
        >Close</Button>
      </Card>
    </Modal>
  )
}