import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { AiOutlineLogin, AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

type HeaderProps = {
  logo: string;
  links?: { to: string; text: string }[]; // Links for navigation
  isAuthenticated?: boolean;
  onLogout: () => void; // Logout handler
  bgcolor?: string; // Background color for the header
  userImage?:string,
  userName?:string
};

const Header: React.FC<HeaderProps> = ({
  logo,
  links = [],
  isAuthenticated,
  onLogout,
  bgcolor,
}) => {
  const location = useLocation();
  
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state for async operation
  const [error, setError] = useState<string | null>(null); // Error state for failed API requests
  const token = localStorage.getItem('token');

  // Fetch username and user image from API when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setLoading(false);
        setError("No token found.");
        return;
      }

      try {
        const response = await axios.get("https://test-backend-av0e.onrender.com/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        console.log(data);
        
        setUserImage(data.userImage || null); // Set user image if available
        setUserName(data.userName || ""); // Set username if available
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch user data.");
        console.error("Error fetching user data:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserData(); // Only fetch data if the user is authenticated
    } else {
      setLoading(false); // If not authenticated, just stop loading
    }
  }, [isAuthenticated, token]);

  const isFeedPage = location.pathname === "/feed";
  const isHomePage = location.pathname === "/";

  return (
    <div className={`${bgcolor} px-2 sm:px-4 lg:px-16 py-2`}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className="h-8 xs:h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16"
        />

        {/* Navigation Links - Hide on small screens */}
        <div className="hidden lg:block">
          {!isFeedPage && (
            <ul
              className={`flex sm:space-x-6 md:space-x-8 lg:ml-[700px] text-white ${
                isHomePage ? "" : "xl:ml-18  "
              }`}
            >
              {links.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="hover:text-[#CF796C] ">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* User/Action Buttons */}
        <div className="flex items-center space-x-2 xs:space-x-5">
          {/* Search Input (Feed Page Only) */}
          {isFeedPage && (
            <div className="relative w-[90px] xs:w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px]">
              <input
                type="text"
                placeholder="Search..."
                className="w-full lg:w-2/3 lg:ml-16 lg:h-8 px-2 py-1 pl-8 rounded-full text-black bg-gray-300 opacity-80 text-xs sm:text-sm xs:ml-2"
              />
              <AiOutlineSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 lg:left-[72px]" />
            </div>
          )}

          {/* User Info */}
          {!isHomePage && isAuthenticated && !loading ? (
            <div className="flex items-center space-x-1 bg-[#CF796C] rounded-full px-3 py-1 xs:py-0.5 xs:px-2 sm:px-3 md:px-4 lg:h-10 xs:h-8 opacity-65">
              {/* User Image */}
              {userImage ? (
                <img
                  src={`https://test-backend-av0e.onrender.com/images/${userImage}`  }
                  alt="User"
                  className="rounded-full w-6 h-6 xs:w-7 xs:h-8 sm:w-8 sm:h-8 sm:-ml-3 md:w-8 md:h-8 object-cover border-2 border-white lg:-ml-4 lg:h-10 lg:w-10 xs:-ml-2 md:-ml-4"
                />
              ) : (
                <FaUserCircle className="text-white text-lg xs:text-xl sm:text-2xl md:text-3xl" />
              )}

              {/* Username */}
              {userName && (
                <span className="text-white font-medium text-xs xs:text-[10px] sm:text-[10px] md:text-sm lg:text-sm">
                  {userName}
                </span>
              )}
            </div>
          ) : (
            !loading &&!isHomePage && <p className="text-white">{error || "User not logged in"}</p>
          )}

          {/* Logout / Login Button */}
          <Button
            onClick={isAuthenticated ? onLogout : () => console.log("Login clicked")}
            className="bg-[#CF796C] text-white rounded-full hover:bg-[#CF796C] hover:text-black flex items-center justify-center font-medium h-7 xs:h-8 sm:h-9  md:h-10 px-2 xs:px-4 sm:px-5 md:px-6 lg:px-8 lg:w-28 opacity-65"
            label={
              <div className="flex items-center space-x-1">
                {isAuthenticated ? (
                  <>
                    <AiOutlineLogout className="text-xs sm:text-sm md:text-base" />
                    <span className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg">Logout</span>
                  </>
                ) : (
                  <>
                    <AiOutlineLogin className="text-xs sm:text-sm md:text-base" />
                    <span className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg">Login</span>
                  </>
                )}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
