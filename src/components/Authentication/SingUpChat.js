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
firebase.initializeApp(firebaseConfig);
const SingUpChat = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // statuses for toast = ["success", "error", "warning", "info"];

  const handleFileChange = (e) => {
    setPic(e.target.files[0]);
    console.log(pic);
    if (pic && pic.type === "image/jpeg") {
      setPic(pic);
    } else {
      toast({
        title: "Wrong Picture Selected.",
        description: "Only jpeg files are accepted.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      e.target.value = ""; // Clear the file input
    }
  };

  const submithandler = (event) => {
    event.preventDefault();
    if (pic) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(pic.name);

      fileRef.put(pic).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
      });
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
            onChange={handleFileChange}
          />
          {pic && <p>Selected File: {pic.name}</p>}
        </FormControl>

        <Button colorScheme="teal" variant="solid" type="submit">
          Sign Up
        </Button>
      </form>
    </VStack>
  );
};

export default SingUpChat;
