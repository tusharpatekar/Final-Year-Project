import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './spinner.css'; // Import spinner CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [error, setError] = useState(''); // To store error message
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error message
    setError('');

    // Validate email and password
    if (!email || !password) {
      setError('Both email and password are required.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return;
    }

    setIsLoading(true); // Show loading while logging in

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
    } finally {
      setIsLoading(false); // Hide loading after login attempt
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
    setIsLoading(true); // Show loading while Google login is being processed
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
        setIsLoading(false); // Hide loading once response is received
        if (data.status) {
          alert(data.message);
          navigate('/plantdisease');
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        setIsLoading(false); // Hide loading if an error occurs
        console.error('Google Login Error:', error);
        alert('An error occurred during Google login.');
      });
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
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div> // Display error message
          )}
          <button
            type="submit"
            className="w-full text-white py-2 rounded bg-green-500"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Google Sign-In Button */}
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

        {/* Loading Spinner for Google Login */}
        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="spinner"></div> {/* You can add your custom loading spinner */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
