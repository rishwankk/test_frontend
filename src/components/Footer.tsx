
import logo from '../assets/logo2.png'; // Adjust the path based on your project structure

const Footer = () => {
  return (
    <footer className="bg-[#d9a066] py-10 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 space-y-6 md:space-y-0">
        {/* Logo Section */}
        <div className="flex-shrink-0 bg-white p-2 rounded-md mb-4 md:mb-0 -mt-20 ">
          <img src={logo} alt="Catchcharts Logo" className="w-28 h-36 mx-auto md:mx-0 object-cover" />
        </div>

        {/* Text and Email Subscription Section */}
        <div className="flex-grow text-center md:text-left ml-20">
          <h2 className="text-2xl font-semibold mb-2">Let’s Connect!</h2>
          <p className="text-sm mb-4">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center space-y-3 md:space-y-0 md:space-x-2">
            <input
              type="email"
              placeholder="Type your Email..."
              className="p-3 rounded-lg text-gray-800 focus:outline-none w-full max-w-xs md:rounded-l-lg md:rounded-r-none"
            />
            <button className="bg-white text-[#d9a066] px-4 py-2 rounded-lg md:rounded-l-none md:rounded-r-lg font-semibold w-full max-w-xs md:w-auto">
              Send
            </button>
          </div>
        </div>

        {/* Scroll-to-Top Button */}
        <div className="flex-shrink-0 hidden md:flex items-center justify-center w-10 h-10 bg-white text-[#d9a066] rounded-full shadow-md cursor-pointer">
          ↑
        </div>
      </div>

      {/* Bottom Links */}
      <div className="bg-white border-t border-gray-200 mt-6 pt-4 pb-4 text-center text-sm text-gray-500">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <p className="mb-2 md:mb-0">Catchcharts © 2023 &nbsp; | &nbsp; Powered by <a href="https://imit.com" className="text-gray-500 hover:text-[#d9a066]">IMIT</a></p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#d9a066]">Terms</a>
            <a href="#" className="hover:text-[#d9a066]">Privacy</a>
            <a href="#" className="hover:text-[#d9a066]">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
