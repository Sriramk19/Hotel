import { useState, useEffect } from "react";
//Api import
import axios from "axios";

import { motion } from "framer-motion";

//Image Imports
import location from "../assets/location.png";
import rating from "../assets/rating.png";
import leftArrow from "../assets/lessthan.png";
import rightArrow from "../assets/greaterthan.png";

interface Room {
  roomType: string;
  amount: number;
}

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  datesOfTravel: string[];
  boardBasis: string;
  rooms: Room[];
}

const HotelList = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const hotelsPerPage = 4;
  useEffect(() => {
    // Fetch the local JSON file from the public folder
    const fetchHotels = async () => {
      const response = await axios.get<Hotel[]>("/data/detail.json"); // Path from public directory
      setHotels(response.data);
      console.log(response, "data");
    };

    fetchHotels();
  }, []);

  const hotelsToDisplay = hotels.slice(
    currentIndex,
    currentIndex + hotelsPerPage
  );

  const currentPage = Math.floor(currentIndex / hotelsPerPage) + 1;

  // Total number of pages
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const nextPage = () => {
    if (currentIndex + hotelsPerPage < hotels.length) {
      setCurrentIndex(currentIndex + hotelsPerPage);
    }
  };

  // Handle previous page button click
  const prevPage = () => {
    if (currentIndex - hotelsPerPage >= 0) {
      setCurrentIndex(currentIndex - hotelsPerPage);
    }
  };

  return (
    <div>
      <div className="Hotel-List grid grid-cols-4 gap-4">
        {hotelsToDisplay.map((hotel) => (
          <motion.a
            key={hotel.id}
            href={`/hotel/${hotel.id}`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hotel-border"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-48"
            >
              <motion.img
                alt="HotelPicture"
                src={hotel.imageUrl}
                className="w-full h-full object-cover rounded-md"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="border bg-white shadow-lg rounded-md relative -mt-2 z-10 p-4"
            >
              <div className="flex items-center justify-end text-right">
                <p className="text-xs">{hotel.rating}</p>
                <img className="w-3" alt="rating Icon" src={rating} />
              </div>
              <h1 className="text-lg text-left font-semibold">{hotel.name}</h1>
              <div className="flex items-center text-left">
                <img className="w-4" alt="location Icon" src={location} />
                <p className="text-sm text-gray-400">{hotel.location}</p>
              </div>
            </motion.div>
          </motion.a>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-8">
        <img
          alt="leftArrow"
          src={leftArrow}
          onClick={prevPage}
          className="w-6"
        />
        <span className="text-md font-semibold text-gray-400 ">
          Page {currentPage} of {totalPages}
        </span>
        <img
          alt="rightArrow"
          src={rightArrow}
          onClick={nextPage}
          className="w-6"
        />
      </div>
    </div>
  );
};

export default HotelList;

//Installed Axios modul and TS type for axios
