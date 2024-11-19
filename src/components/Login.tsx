import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const handleSubmit =async (e:any) => {
        e.preventDefault();
       
        console.log('Email:', email);
        console.log('Password:', password);
        try {

            const response =  await axios.post('https://test-backend-av0e.onrender.com/api/login', { email, password });
            console.log('User logged in successfully');
           if(response.status === 200){
            console.log('User logged in successfully');
            const token = response.data.token; 
            localStorage.setItem('token', token);
            navigate('/feed');

           

           }
           
        } catch (error) {
        console.error('Error logging in:', error);

        
    }
}
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C08C5F]"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C08C5F]"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button className="w-full bg-[#C08C5F] text-white py-2 rounded-md hover:bg-[#C08C5F] transition duration-300"
          type="submit"
          onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <div className="text-center text-sm text-gray-500">
          Don't have an account? <Link to='/signup' className="text-black">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};


export default Login;
