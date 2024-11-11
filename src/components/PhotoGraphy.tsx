import React from 'react';
import photography from '../assets/photography.png';

const Photography = () => {
  return (
    <div className="w-full h-[450px] mt-10 flex xs:h-[300px]">
      {/* Left Section */}
      <div className="w-3/5 bg-[#C08C5D] p-6 flex flex-col justify-center text-white ">
   
        <h1 className="text-9xl font-bold opacity-20 ml-8 -mt-2   xs:text-7xl ">01</h1>
        <h2 className="text-2xl font-bold mt- xs:text-sm xs:text-center">Lorem Ipsum is simply dummy text of the printing</h2>
        <p className="text-sm mt-4 xs:text-[8px]  xs:text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>


      </div>

      {/* Right Section */}
      <div className="w-1/2 relative flex items-center justify-center">
        <img src={photography} alt="Photography" className="w-full h-full object-cover " />
        <div className="absolute top-4 right-4 text-black font-bold">Explore the Program</div>
      </div>
    </div>
  );
};

export default Photography;
