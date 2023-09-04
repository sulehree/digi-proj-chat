import React from 'react'
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
import LoginforChat from "./Authentication/LoginforChat";
import SingUpChat from "./Authentication/SingUpChat";

const HomePage = () => {
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
        p={5}
        bg={"white"}
        w="100%"
        m="10px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab color="green">Login</Tab>
            <Tab color="green">Signup </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* <Login /> */}
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

export default HomePage