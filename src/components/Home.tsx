
import FilmstripScroller from './ImageSlider';
import About from './About';
import Header from './Header';
import logo from '../assets/Logo.png';
import GalleryComponent from './GalleryComponent';
import Events from './Events';

const Home = () => {
  // Define the navigation links
  const links = [
    { text: "Home", to: "/" },
    { text: "Gallery", to: "/about" },
  ];

  // Mock authentication status and logout function
  const isAuthenticated = true; // This could be fetched from context or state
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div>
      <Header 
      bgcolor="bg-black p-4"
        logo={logo} 
        links={links} 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
       
      />
      <FilmstripScroller />
      <About />
      {/* <PhotoGraphy /> */}
      <GalleryComponent />
      <Events />
    </div>
  );
};

export default Home;
