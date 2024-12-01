import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlantDisease = ({ setResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image!');
      return;
    }

    setLoading(true); // Start loading indicator

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/plantdisease', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Await the response body as JSON and extract the error message
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong!');
      }

      const data = await response.json();
      setResult(data.result);
      navigate('/result'); // Navigate to the result page
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Plant Disease Detection
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {loading ? (
            <div className="text-center text-green-500">
              <p>Uploading... Please wait.</p>
              {/* Optional: You could add a loading spinner here */}
            </div>
          ) : (
            <button
              type="submit"
              className="w-full  text-white py-2 rounded bg-green-500"
            >
              Upload
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PlantDisease;
