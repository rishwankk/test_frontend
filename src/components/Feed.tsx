import React from 'react';
import Header from './Header';
import logo from '../assets/logo2.png'; // Assuming logo is located here
import Upload from './Upload';
import PhotoCard from './PhotoCard';

const Feed = () => {
  // Example links, which will not be shown in the Feed page.

  // Example authentication status and logout handler
  const isAuthenticated = true; // Change to true if the user is logged in
  const onLogout = () => {
    console.log("Logging out...");
  };

  // Example of a real image (URL)
  const userImage = "https://randomuser.me/api/portraits/women/2.jpg"; // Replace with real user image URL

  return (
    <div className=" bg-gray-100 ">

      <Header
        bgcolor="bg-white p-4 max-w-[1440px] mx-auto"
        logo={logo} 
        isAuthenticated={isAuthenticated} 
        onLogout={onLogout} 
        userImage={userImage} // Pass the user's profile image URL
        userName="Asha Sunny"

      />
      <div className="flex justify-center items-center mt-5"> 
        {/* flex is for horizontal centering */}
        {/* items-center ensures vertical centering */}
        <Upload />
      </div>
      <PhotoCard />
   
    
    
    </div>
  );
};

export default Feed;
