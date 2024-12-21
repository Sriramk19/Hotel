import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import HotelList from "./components/HotelList";
import HotelDetail from "./components/HotelDetail";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
// Background images for the main screen
import bg1 from "../src/assets/background1.jpg";
import bg2 from "../src/assets/background2.jpg";
import bg3 from "../src/assets/background3.jpg";
import bg4 from "../src/assets/background4.jpg";
import bg5 from "../src/assets/background5.jpg";

function App() {
  // Array of background images
  const bgImages = [bg1, bg2, bg3, bg4, bg5];

  // State to track the current background image
  const [currentBg, setCurrentBg] = useState(bgImages[0]);

  useEffect(() => {
    // Set interval to change background image every 3 seconds
    const interval = setInterval(() => {
      setCurrentBg((prevBg) => {
        const currentIndex = bgImages.indexOf(prevBg);
        const nextIndex = (currentIndex + 1) % bgImages.length;
        return bgImages[nextIndex];
      });
    }, 3000);
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <div className="relative h-full">
              {/* Main Background image*/}
              <div
                className="relative bg-cover w-full bg-center h-[520px] transition-all duration-1000 ease-in-out"
                style={{
                  backgroundImage: `url(${currentBg})`,
                }}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="ml-32 mt-28 absolute items-center tracking-wider text-white font-serif text-4xl">
                  <h1>
                    <span className="text-xs">
                      MORE THAN A HOTEL ~ AN EXPERIENCE
                    </span>{" "}
                    <br />
                    Your dream stay <br /> begins with us <br /> today.
                  </h1>
                </div>
              </div>
              {/* Hote List */}
              <div className="mt-7 pl-8 pr-8">
                <HotelList />
              </div>
            </div>
          }
        />
        {/* Route for hotel details */}
        <Route path="/hotel/:id" element={<HotelDetail />} />
      </Routes>
      {/* Footer at the bottom */}
      <Footer />
    </Router>
  );
}

export default App;
