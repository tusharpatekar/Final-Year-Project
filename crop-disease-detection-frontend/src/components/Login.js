import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// To decode the Google ID token

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate('/plantdisease'); // Redirect to the plant disease detection page
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in.');
    }
  };

  // Google Sign-In Initialization
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '763127770724-isjj3oae0bug2vk42ueo8090h4je9jpa.apps.googleusercontent.com',
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin'),
      {
        theme: 'outline',
        size: 'large',
      }
    );
  }, []);

  const handleGoogleLogin = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log('Google User:', userObject);

    // Send the token to your backend for verification
    fetch('http://127.0.0.1:5000/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          alert(data.message);
          navigate('/plantdisease');
        } else {
          alert(data.error);
        }
      })
      .catch((error) => console.error('Google Login Error:', error));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-lightGreen"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-lightGreen"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded bg-green-500"
          >
            Login
          </button>
        </form>
        <div id="google-signin" className="mt-4 flex justify-center"></div>
        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
