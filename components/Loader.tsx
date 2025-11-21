import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="h-2 w-24 bg-gray-200 rounded"></div>
        <div className="h-2 w-32 bg-gray-200 rounded"></div>
        <span className="font-serif text-gray-400 italic mt-4">Listening for echoes...</span>
      </div>
    </div>
  );
};
