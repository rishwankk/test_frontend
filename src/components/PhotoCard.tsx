import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Button from './Button';
import Comments from './Comments';

interface Photo {
  _id: string;
  url: string;
  description?: string;
  userId?: {
    name?: string;
    photo?: string;
  };
  likeCount: number;
  userHasLiked: boolean;  // Track if the user has liked this photo
}

const PhotoCard: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCommentBox, setShowCommentBox] = useState<{ [key: string]: boolean }>({});
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get<Photo[]>('http://localhost:3000/api/images');
        if (response.data && response.data.length > 0) {
          setPhotos(response.data);
        } else {
          setError('No photos available');
        }
      } catch (error) {
        console.error('Error fetching photo data:', error);
        setError('Failed to fetch photo data');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const toggleCommentBox = (photoId: string) => {
    setShowCommentBox((prev) => ({
      ...prev,
      [photoId]: !prev[photoId],
    }));
  };

  const handleLikeClick = async (photoId: string, userHasLiked: boolean) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
      setError('You must be logged in to like this photo');
      return;
    }

    if (userHasLiked) {
      setPopupMessage('You have already liked this photo'); // Display popup message if already liked
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/photos/${photoId}/like`,
        {}, // Empty body if no additional data is needed
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as a Bearer token
          },
        }
      );

      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId ? { ...photo, likeCount: response.data.likeCount, userHasLiked: true } : photo
        )
      );
    } catch (error) {
      console.error('Error updating like count:', error);
      setError('Failed to update like count');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#CF796C" loading={loading} />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!photos || photos.length === 0) {
    return <div>No photos available</div>;
  }

  return (
    <div className="flex flex-col items-center py-6 space-y-6">
      {photos.map((photo) => (
        <div
          key={photo._id}
          className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-[1180px] xl:w-3/4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={photo.userId?.photo || 'https://www.gravatar.com/avatar/default'}
                className="rounded-full w-10 h-10 object-cover"
                alt="profile"
              />
              <div>
                <p className="font-semibold text-lg">{photo.userId?.name || 'Unknown'}</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            <Button
              className="border-2 border-[#CF796C] text-[#CF796C] py-1 px-4"
              label={<span>Report</span>}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{photo.description || 'No description'}</h3>
            <img
              src={`http://localhost:3000${photo.url}`}
              className="w-full h-auto lg:max-h-[400px] rounded-lg object-cover"
              alt="Sample"
            />
          </div>
          <div className="flex space-x-4 justify-between mt-4">
            <Button
              className="px-5 w-[49.5%] h-10 border-4 border-[#CF796C] text-[#CF796C] rounded-full"
              label={<span>Like {photo.likeCount}</span>}
              onClick={() => handleLikeClick(photo._id, photo.userHasLiked)}  // Pass the userHasLiked status
              disabled={photo.userHasLiked}  // Disable button if already liked
            />
            <Button
              className="px-5 w-[49.5%] h-10 bg-[#CF796C] rounded-full text-white"
              label={<span>Comment</span>}
              onClick={() => toggleCommentBox(photo._id)}
            />
          </div>
          {showCommentBox[photo._id] && <Comments />}
        </div>
      ))}
      {popupMessage && (
        <div className="popup-message">
          <p>{popupMessage}</p>
          <Button
            className="bg-[#CF796C] text-white px-4 py-2 rounded-full"
            label="Close"
            onClick={() => setPopupMessage(null)}  // Close popup on click
          />
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
