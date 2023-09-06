import React, { useState } from "react";
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

const LoginforChat = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submithandler = () => {};
  return (
    <VStack
      divider={<StackDivider borderColor="green.200" />}
      spacing={4}
      align="stretch"
    >
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

      <Button colorScheme="purple" variant="solid" onClick={submithandler}>
        Sign In
      </Button>
      <Button
        colorScheme="whatsapp"
        onClick={() => {
          setEmail("abbas@test.com");
          setPassword("12345");
        }}
      >
        Guest User Login
      </Button>
    </VStack>
  );
};

export default LoginforChat;
