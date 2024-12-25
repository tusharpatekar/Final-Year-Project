import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { translateText } from './translationService'; // Import the translation service

const PlantDisease = ({ setResult, language }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/plantdisease', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong!');
      }

      const data = await response.json();

      // Translate the result text based on the selected language
      const translatedResult = await translateText(data.result, "fr");
      setResult(translatedResult); // Update result with translated text
      navigate('/result'); // Navigate to result page
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Set error message for display
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Plant Disease Detection</h2>
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
            </div>
          ) : (
            <button
              type="submit"
              className="w-full text-white py-2 rounded bg-green-500"
            >
              Upload
            </button>
          )}
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PlantDisease;
