import React from "react";


export default function PublicationCard({ pub }) {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-5 flex flex-col justify-between mb-4">
      <div>
        <div className="text-xl font-bold mb-2 text-gray-800">
          {pub.title}
        </div>
        <div className="text-base text-gray-600">
          <span>Publisher: {pub.publisher}</span>
        </div>
      </div>
      <div className="mt-4">
        <a 
          href={pub.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block transition-colors"
        >
          View Publication
        </a>
      </div>
    </div>
  );
}