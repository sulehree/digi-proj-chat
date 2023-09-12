import React, { useState } from "react";
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
const LoginforChat = () => {
  const [show, setShow] = useState(true);
  const handleClick = () => setShow(!show);
  const [picLoading, setPicLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const Navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    
    setPicLoading(true);
    if (!email || !password) {
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

    console.log(email, password);
    // code to Store the Data in the DB
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email: email,
          password: password,
        },
        config
      );
      
      toast({
        title: "USer Login Successfully",
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

        <Button
          colorScheme="purple"
          variant="solid"
          width="100%"
          style={{ marginTop: 15 }}
          type="submit"
          isLoading={picLoading}
        >
          Sign In
        </Button>
        <Button
          colorScheme="whatsapp"
          style={{ marginTop: 15 }}
          width="100%"
          onClick={() => {
            setEmail("guest@gmail.com");
            setPassword("123456");
          }}
        >
          Guest User Login
        </Button>
      </form>
    </VStack>
  );
};

export default LoginforChat;
