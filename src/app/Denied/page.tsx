import React from "react";

const Denied = () => {
  return (
    <div className="h-screen flex justify-center items-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl text-red-600 font-bold mb-8">Access Denied</h1>
        <p className="text-xl text-gray-300 mb-8">You do not have permission to view this page.</p>
        <a href="/" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Denied;
