import React, { useState, ChangeEvent } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import Button from './Button';
import uploadImage from '../assets/upload.png';
import axios from 'axios';

interface PreviewImage {
  file: FileWithPath;
  preview: string;
  name: string;
  size: string;
}

const Upload: React.FC = () => {
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [description, setDescription] = useState<string>('');

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const previews: PreviewImage[] = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024).toFixed(2),
    }));
    setPreviewImages(previews);
  };

  const handleUpload = async () => {
    const formData = new FormData();

  // Append each file to the formData object
  previewImages.forEach((imageObj, index) => {
    formData.append('images', imageObj.file);
    formData.append(`description_${index}`, description); // Add the description
  });

  try {
    const token = localStorage.getItem('token');
   
    const response = await axios.post('https://test-backend-av0e.onrender.com/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  
  } catch (error) {
    console.error('Error uploading images:', error);
    
  }

  };

  const removeImage = (index: number) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { 'image/*': [] },
  });

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="relative shadow-2xl bg-white rounded-[20px] flex flex-col lg:flex-row justify-between items-center p-6 lg:p-8 xl:h-[250px] xl:w-[1150px] lg:w-[1180px] md:w-[720px] sm:w-[380px] xs:w-full">
      <div className="flex flex-col items-center w-full" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="relative flex flex-col items-center">
          <Button
            className="bg-[#C08C5D] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#b07c4d] xs:w-[130px] xs:h-[55px] md:w-[200px] xl:w-[650px] lg:w-[590px] lg:ml-[190px]"
            label="Upload Images"
          />

          <div className="text-center mt-4 text-gray-500 font-mono">
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p className="text-xs sm:text-[9px] xs:text-[6px]">
                Drag and drop images here, or click to select files
              </p>
            )}
          </div>
        </div>

        {previewImages.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center">
            {previewImages.map((imageObj, index) => (
              <div key={index} className="flex flex-col items-center relative m-2">
                <img src={imageObj.preview} alt="Preview" className="w-32 h-32 object-cover" />
                <div className="text-sm text-gray-600 mt-2">
                  <p><strong>Name:</strong> {imageObj.name}</p>
                  <p><strong>Size:</strong> {imageObj.size} KB</p>
                </div>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Add a description..."
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <span className="text-xs">X</span>
                </button>
              </div>
            ))}
            <Button
              onClick={handleUpload}
              className="bg-[#C08C5D] text-white px-4 py-2 rounded-full mt-4 text-lg font-semibold hover:bg-[#b07c4d]"
              label="Submit Upload"
            />
          </div>
        )}
      </div>

      <div className="  md:ml-[300px]">
        <img
          src={uploadImage}
          alt="Upload Illustration"
          className="object-cover lg:w-[80px] lg:h-[190px] lg:mt-2 lg:-ml-[90px] xl:h-[180px] xl:w-[200px] md:h-[100px] md:w-[100px] md:-mt-20 md:ml-[150px]"
        />
      </div>

      {/* Background Shapes for Styling */}
      <div className="absolute top-4 right-8 opacity-10">
        <div className="w-4 h-4 border-t-2 border-r-2 border-[#C08C5D] rounded-tr-full"></div>
        <div className="w-6 h-6 border-t-2 border-r-2 border-[#C08C5D] rounded-tr-full mt-2"></div>
      </div>

      <div className="absolute top-40 right-[950px] opacity-10">
        <div className="w-12 h-12 border-[#C08C5D] border-4 rounded-xl flex justify-center items-center">
          <div className="w-8 h-8 bg-[#C08C5D] border-[#C08C5D] border-4 rounded-xl opacity-70"></div>
        </div>
      </div>

      <div className="absolute top-23 right-[60px] opacity-10">
        <div className="w-[130px] h-[105px] border-[#C08C5D] border-8 rounded-xl flex justify-center items-center">
          <div className="w-16 h-16 bg-[#C08C5D] border-[#C08C5D] border-4 rounded-xl opacity-70"></div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
