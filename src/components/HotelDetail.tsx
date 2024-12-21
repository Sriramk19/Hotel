import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HotelErrorPage from "./HotelErrorPage";

import p1 from "../assets/p1.png";
import l1 from "../assets/l1.png";
import l2 from "../assets/l2.png";
import rating from "../assets/rating.png";
import location from "../assets/location.png";
// Type definition for Room object
interface Room {
  roomType: string;
  amount: number;
}
// Type definition for Hotel object
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

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>(); // Extracting hotel id from the URL
  const [hotel, setHotel] = useState<Hotel | null>(null); // State to store hotel details
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const htImage = [p1, l1, l2]; // Array of image sources for the hotel gallery
  const navigate = useNavigate(); //Navigate when clicked on Reserve room button

  useEffect(() => {
    // Fetch hotel data from JSON file when the component mounts
    const fetchHotel = async () => {
      try {
        const response = await axios.get<Hotel[]>(`/data/detail.json`); // Fetching hotel data from the JSON file
        const foundHotel = response.data.find((h) => h.id.toString() === id); // Finding the hotel based on the ID
        setHotel(foundHotel || null);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setHotel(null);
      } finally {
        setLoading(false); // Setting loading to false once data is fetched or error occurs
      }
    };

    fetchHotel();
  }, [id]);

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-dashed border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!hotel) {
    // If no hotel is found, show the error page
    return <HotelErrorPage />;
  }

  const handleNavigate = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-2 grid-rows-2 gap-1 p-4">
        <div className="col-span-1 row-span-2">
          {/* Hotel Image Gallery */}
          <img
            src={htImage[0]}
            alt="Potrait"
            className="w-full h-[408px] object-cover"
          />
        </div>
        <div className="row-span-1">
          <img
            src={htImage[1]}
            alt="Landscape Image 1"
            className="w-full h-[200px] object-cover"
          />
        </div>
        <div className="relative row-span-1 group">
          <img
            src={htImage[2]}
            alt="Landscape Image 2"
            className="w-full h-[200px] object-cover hover:opacity-30"
          />
          {/* Hover effect for show more */}
          <div className="absolute inset-0 flex justify-center items-center text-gray-200 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <h2 className="text-2xl font-bold">Show All+</h2>
          </div>
        </div>
      </div>
      {/* Hotel details Section */}
      <div className="w-[831px] ml-4 shadow-md">
        <div>
          <div className="flex items-center space-x-1 pt-4 pl-4">
            <h1 className="text-2xl font-semibold">{hotel.name}</h1>
            <div className="flex items-center mt-1.5 ">
              <p className="text-sm m ">({hotel.rating})</p>
              <img className="w-3 " alt="rating Icon" src={rating} />
            </div>
          </div>
          <div className="flex items-center pl-4 ">
            <img className="w-4" alt="location Icon" src={location} />
            <p className="text-sm text-gray-400">{hotel.location}</p>
          </div>
          <div className="mt-2 pl-4">
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full
    ${
      hotel.boardBasis === "All Inclusive"
        ? "bg-blue-500 text-white"
        : hotel.boardBasis === "Bed & Breakfast"
        ? "bg-green-500 text-white"
        : hotel.boardBasis === "Room Only"
        ? "bg-gray-500 text-white"
        : hotel.boardBasis === "Half Board"
        ? "bg-yellow-500 text-white"
        : hotel.boardBasis === "Full Board"
        ? "bg-red-500 text-white"
        : "bg-gray-200 text-gray-800"
    }`}
            >
              {hotel.boardBasis}
            </span>
          </div>
          <div className="mt-2 pl-4">
            <h1>
              Available Dates :{hotel.datesOfTravel[0]} to{" "}
              {hotel.datesOfTravel[1]}
            </h1>
          </div>
          <div className="mt-4 pl-4">
            <h2 className="text-lg font-semibold">Rooms Availability</h2>
            <ul>
              {hotel.rooms.map((room) => (
                <li key={room.roomType} className="mt-1">
                  {room.roomType}: {room.amount}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleNavigate}
            className=" ml-[320px] mb-4 bg-blue-600 rounded-md font-semibold shadow-sm border-stone-400 px-8 py-2 text-white hover:bg-blue-800"
          >
            Reserve Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
