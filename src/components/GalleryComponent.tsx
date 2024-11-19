
import image from "../assets/present.png"
// Sample data for the gallery (replace with your actual image URLs)
const galleryImages = [
  { id: 1, src: image, alt: 'Gallery Image 1' },
  { id: 2, src: image, alt: 'Gallery Image 2' },
  { id: 3, src: image, alt: 'Gallery Image 3' },
  { id: 4, src: image, alt: 'Gallery Image 4' },
  { id: 5, src: image, alt: 'Gallery Image 5' },
  { id: 6, src: image, alt: 'Gallery Image 6' },
];

const GalleryComponent = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <p className="text-gray-500">Lorem Ipsum is simply dummy text of the printing.</p>
        </div>
        <a href="/more" className="text-red-500 font-semibold flex items-center">
          More
          <span className="ml-1">→</span>
        </a>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryComponent;
