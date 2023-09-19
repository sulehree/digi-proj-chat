import React, { useEffect } from "react";
// import Login from "./Login";
import {
  Box,
  Container,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import LoginforChat from "../components/Authentication/LoginforChat";
import SingUpChat from "../components/Authentication/SingUpChat";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const Navigate = useNavigate();

  // Here i will check if user is already login.. and his information in store in local storage.. i will re direct the use to Chat Page:

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo")); // when even we get information from local storgae we have to parse ..
    if (user) Navigate("/chats");
  }, [Navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          textAlign="center"
          fontSize="3xl"
          fontFamily="Work sans"
          color="green"
        >
          Digi-Chit-Chat
        </Text>
      </Box>

      <Box
        p={4}
        bg={"white"}
        w="100%"
        m="10px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs isFitted variant="enclosed">
          <TabList >
            <Tab color="blue">Login</Tab>
            <Tab color="blue">Signup </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LoginforChat />
            </TabPanel>
            <TabPanel>
              <SingUpChat />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
