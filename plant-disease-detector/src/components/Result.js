import React from 'react';

const Result = ({ result }) => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Detection Result</h2>
        <p className="text-lg text-green-700">
          <strong>{result}</strong>
        </p>
        <button
          onClick={() => (window.location.href = '/plantdisease')}
          className="mt-6 w-full  text-white py-2 rounded bg-green-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Result;
