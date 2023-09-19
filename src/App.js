import {
  // BrowserRouter,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import "./App.css";
import ChatPage from "./Pages/ChatPage";
import HomePage from "./Pages/HomePage";
// import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
