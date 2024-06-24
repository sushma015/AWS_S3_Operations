import "./App.css";
import {Link, Route, Routes, useLocation } from "react-router-dom";
import UploadFile from "./upload";
import Files from "./files";
import { useEffect } from "react";
function App() {
  const loc=useLocation();
  useEffect(()=>{
    if(loc.pathname==='/files'){
    document.getElementById("cover").style.animation="front 0.5s forwards";
    document.getElementById("link2").style.color = "#8458B3";
    document.getElementById("link1").style.color = "white";
  }
  }
  ,);
  return (
    <div id="main">
        <div id="nav-bar">
          <span id="cover"></span>
          <Link
            to="/upload"
            id="link1"
            onClick={() => {
              document.getElementById("cover").style.animation =
                "back 0.5s forwards";
              document.getElementById("link1").style.color = "#8458B3";
              document.getElementById("link2").style.color = "white";
            }}
          >
            Upload
          </Link>
          <Link
            to="/files"
            id="link2"
            onClick={() => {
              document.getElementById("cover").style.animation =
                "front 0.5s forwards";
              document.getElementById("link2").style.color = "#8458B3";
              document.getElementById("link1").style.color = "white";
            }}
          >
            My Files</Link>
        </div>
        <Routes>
          <Route path="/" element={<UploadFile />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/files" element={<Files />} />
        </Routes>
    </div>
  );
}
export default App;
