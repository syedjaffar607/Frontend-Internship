import "./App.css";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Expenses from "./pages/Expenses";

function App() {
  return (
    <>
      <Navbar />

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
