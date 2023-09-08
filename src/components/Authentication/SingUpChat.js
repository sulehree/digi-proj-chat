import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import firebaseConfig from "../../config/firebaseConfig";
import axios from "axios";
import {
  VStack,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
firebase.initializeApp(firebaseConfig);
const SingUpChat = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const [picUploaded, setPicUploaded] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  // statuses for toast = ["success", "error", "warning", "info"];

  const PicUpload = (uploadedPic) => {
    setPicLoading(true);
    if (uploadedPic === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(uploadedPic);
    setPic(uploadedPic);
    if (uploadedPic.type === "image/jpeg" || uploadedPic.type === "image/png") {
      // Firebase Code for uploaidng the file

      const storageRef = firebase.storage().ref("/uploads");
      const fileRef = storageRef.child(uploadedPic.name);

      fileRef
        .put(uploadedPic)
        .then((snapshot) => {
          fileRef.getDownloadURL().then((url) => {
            console.log("The Picture URL Is", url);
            setImageUrl(url);
          });
          setPicLoading(false);
          setPicUploaded(true);
          toast({
            title: "Image uploaded  Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
          setPicUploaded(false);
        });
    } else {
      toast({
        title: "Please Select an jpeg or png Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      setPicUploaded(false);
      return;
    }
  };

  const submithandler = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (!userName || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    console.log(userName, email, password, imageUrl);
    // code to Store the Data in the DB
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name: userName,
          email: email,
          password: password,
          pic: imageUrl,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      Navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <VStack
      divider={<StackDivider borderColor="green.200" />}
      spacing={4}
      align="stretch"
    >
      <form onSubmit={submithandler}>
        <FormControl isRequired id="userName">
          <FormLabel> Name :</FormLabel>
          <Input
            placeholder="Enter Your Name:"
            type={"text"}
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired id="userEmail">
          <FormLabel> Email :</FormLabel>
          <Input
            value={email}
            placeholder="Enter your Email:"
            type={"email"}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired id="userPassword">
          <FormLabel> Password :</FormLabel>
          <InputGroup>
            <Input
              value={password}
              placeholder="Enter your Passowrd:"
              type={show ? "password" : "text"}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                colorScheme="teal"
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? "Show" : "Hide"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl isRequired id="userConfirmPassword">
          <FormLabel>Confirm Password :</FormLabel>
          <InputGroup>
            <Input
              value={confirmPassword}
              placeholder="Confirm your Passowrd:"
              type={show ? "password" : "text"}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                colorScheme="teal"
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? "Show" : "Hide"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="pic" isRequired>
          <FormLabel>Add Your Pic</FormLabel>

          <Input
            p={1.5}
            type="file"
            accept="image/jpeg"
            onChange={(e) => {
              PicUpload(e.target.files[0]);
            }}
            disabled={picUploaded}
          />

          {pic && <p>Selected File: {pic.name}</p>}
        </FormControl>

        <Button
          colorScheme="teal"
          width="100%"
          style={{ marginTop: 15 }}
          type="submit"
          isLoading={picLoading}
        >
          Sign Up
        </Button>
      </form>
    </VStack>
  );
};

export default SingUpChat;
