import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem
} from "@mui/material";
import AspectRatio from '@mui/joy/AspectRatio';
import { ToastContainer, toast } from "react-toastify";
import CardCover from "@mui/joy/CardCover";
import Box from "@mui/joy/Box";

const CharacterComponent = () => {
  const character1 = 
  // [
  {
    name: "Barney",
    gender: "male",
    file: "./characters/barney.jpg", 
    imageURL: "./characters/barney.jpg", 
  }
  const character2 = 
  {
    name: "Elon",
    gender: "male",
    file: "./characters/elon.jpeg",
    imageURL: "./characters/elon.jpeg", 
  };

  const character3 = 
  {
    name: "Taylor",
    gender: "female",
    file: "./characters/taylor.jpeg",
    imageURL: "./characters/taylor.jpeg", 
  };


//add intial characters
  const [character, setCharacter] = useState([character1,character2,character3]);
  const [showForm, setShowForm] = useState(false);
  const [characterName, setCharacterName] = useState("");
  const [characterGender, setCharacterGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(character)

  const handleCharacterChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Display the form to input character details
      setShowForm(true);
      // Set the selected file
      setSelectedFile(files[0]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Hide the form
    setShowForm(false);

    // Create a FormData object to hold the character data
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", characterName);
    formData.append("gender", characterGender);

    // Save the character data to the characters state
    setCharacter((prevCharacters) => [
      ...prevCharacters,
      {
        name: characterName,
        gender: characterGender,
        file:selectedFile,
        imageURL: URL.createObjectURL(selectedFile),
      },
    ]);

    // Clear the form fields
    setCharacterName("");
    setCharacterGender("");
    setSelectedFile(null);
  };

  const handleCharacterSelect = (characterData) => {
    console.log("Selected Character:", characterData);
  };

  const getCharacters = () => {
    return character.map((characterData, index) => (
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          width: 150,
          display: "inline-block", 
          margin: "0 10px", 
          position: "relative", 
        }}
        key={index}
      >
        <div style={{ position: "relative", width: "100%", paddingBottom: "100%"}}>
          {/* Maintain aspect ratio */}
          <img
            src={characterData.imageURL}
            srcSet={characterData.file}
            loading="lazy"
            alt=""
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
    
    <div style={{ position: "relative", bottom: "-150px", left: "10px" }}>
          <Typography
            level="h2"
            fontSize="lg"
            id="card-description"
            color={"white"}
            
         
          >
            {characterData.name}
          </Typography>
            <Button
              size="sm"
              variant="contained"
              color="primary"
              onClick={() => handleCharacterSelect(characterData)}
            >
              Choose
            </Button>
          </div>
        </div>
      </Card>
    ));
    
    
  };

  return (
    <div>
      <Grid container spacing={1}>
        {getCharacters()}
      </Grid>

      <input
        accept="image/*"
        style={{ display: "none" }}
        id="upload-button"
        type="file"
        multiple
        onChange={handleCharacterChange}
      />
      <label htmlFor="upload-button">
        <Button variant="contained" color="primary" component="span">
          Upload a Character
        </Button>
      </label>

      {showForm && (
       <form onSubmit={handleFormSubmit}>
       <div style={{ display: "flex", justifyContent: "space-between" }}>
         <div style={{ flex: 1, marginRight: "10px" }}>
           <TextField
             label="Character Name"
             value={characterName}
             onChange={(e) => setCharacterName(e.target.value)}
             required
             fullWidth
           />
         </div>
         <div style={{ flex: 1, marginLeft: "10px" }}>
      <Select
        label="Gender"
        value={characterGender}
        onChange={(e) => setCharacterGender(e.target.value)}
        required
        fullWidth
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </Select>
    </div>
       </div>
       <Button type="submit" variant="contained" color="primary">
         save
       </Button>
     </form>
      )}
    </div>
  );
};

export default CharacterComponent;
