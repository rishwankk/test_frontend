import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [photo, setPhoto] = React.useState(null);

  // Handle file upload
  const handlePhotoChange = (e:any) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Create form data to handle file uploads
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Handle success (e.g., show a success message, redirect, etc.)
        console.log('User created:', response.data);
        Navigate('/login')
      } else {
        // Handle error (e.g., show an error message)
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C08C5F]"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C08C5F]"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          {/* Profile Photo Upload */}
          <input
            type="file"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C08C5F]"
            onChange={handlePhotoChange}
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C08C5F]"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button
            className="w-full bg-[#C08C5D] text-white py-2 rounded-md hover:bg-[#C08C5F] transition duration-300"
            label={
              <span className="flex items-center justify-center space-x-2">
                <span className="text-sm">Sign Up</span>
              </span>
            }
            onClick={handleSubmit} // Use type="submit" instead of onClick to handle form submission properly
          />
        </form>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-black">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
