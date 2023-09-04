import React,{ useState } from "react";
import {
  VStack,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";


const SingUpChat = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid JPG file.");
      e.target.value = ""; // Clear the file input
    }
  };

  const submithandler = () => {};
  return (
    <VStack
      divider={<StackDivider borderColor="green.200" />}
      spacing={4}
      align="stretch"
    >
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

      <FormControl>
        <FormLabel>Add Your Pic</FormLabel>
        <Input
          p={1.5}
          type="file"
          accept="image/jpeg"
          onChange={handleFileChange}
        />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </FormControl>

      <Button colorScheme="teal" variant="solid" onClick={submithandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SingUpChat;
