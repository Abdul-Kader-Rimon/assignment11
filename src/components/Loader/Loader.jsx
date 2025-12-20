import React from 'react';

const Loader = () => {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="relative w-16 h-16">
          
          <span className="absolute inset-0 block rounded-full bg-red-600 opacity-50 animate-ping"></span>
           
          <span className="absolute inset-0 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-red-700 animate-bounce"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z" />
            </svg>
          </span>
        </div>
      </div>
    );
};

export default Loader;