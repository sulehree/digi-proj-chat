// import { Button } from "@chakra-ui/react";
import {
  // BrowserRouter,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import "./App.css";
import ChatPage from "./components/ChatPage";
import HomePage from "./components/HomePage";
// import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<ImageUpload />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
