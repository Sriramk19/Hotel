import { Link } from "react-router-dom";

const HotelErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg w-full">
        <h1 className="text-3xl font-semibold text-red-500">
          Oops! Hotel Not Found
        </h1>
        <p className="text-gray-500 mt-4">
          We couldn't find the hotel you're looking for. Maybe it was moved or
          deleted.
        </p>
        <p className="text-gray-500 mt-2">Sorry for the inconvenience!</p>

        <div className="mt-6">
          <Link
            to="/"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelErrorPage;
