
import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.png";
import Button from './Button';

const Header = () => {
  return (
    <div className="h-[158px] bg-black flex items-center max-w-[1512px] mx-auto px-6 lg:px-10">
      {/* Logo Section */}
      <div className="flex-1">
        <img
          src={Logo}
          className="max-w-[66.94px] max-h-[96px] object-cover"
          alt="Logo"
        />
      </div>
      
      {/* Links and Button Section */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        <Link to="/" className="text-white hover:text-[#CF796C]">
          Home
        </Link>
        <Link to="/gallery" className="text-white hover:text-[#CF796C]">
          Gallery
        </Link>
        <Button className='bg-[#CF796C] text-white px-6 py-2 rounded-md ' label="contact" />
        
      </div>
    </div>
  );
};

export default Header;
