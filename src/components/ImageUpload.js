import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import firebaseConfig from "../config/firebaseConfig";
firebase.initializeApp(firebaseConfig);


function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
      });
    }
  };

  return (
    <div>
      <h2>Image Upload to Firebase Storage</h2>
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
