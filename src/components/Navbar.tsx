import { Link } from "react-router-dom"; // Importing Link component for navigation between pages
import logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <div>
      {/* Navbar container */}
      <nav className="ixed top-0 left-0 right-0 bg-black z-50 shadow-lg ">
        <div className="flex items-center justify-between">
          <div className="pl-6">
            <Link to="/">
              {/* Logo Image */}
              <img src={logo} width={64} alt="logo" />
            </Link>
          </div>
          <div>
            <ul className="flex gap-8 pr-16">
              <li>
                {/* Hotel link */}
                <Link
                  to="/"
                  className="text-sm text-white hover:text-green-700"
                >
                  Hotel
                </Link>
              </li>
              <li>
                {/* Details link */}
                <Link
                  to="/"
                  className="text-sm text-white hover:text-green-700"
                >
                  Details
                </Link>
              </li>
              <li>
                {/* Contact link */}
                <Link
                  to="/"
                  className="text-sm text-white hover:text-green-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
