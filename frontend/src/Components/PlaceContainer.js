import React from "react";

const PlaceContainer = ({ title, description, src }) => {
  return (
    <div className="place-container flex flex-col md:flex-row items-center justify-between w-full max-w-screen-md p-8 bg-gray-100 rounded-lg">
      <div className="place-details mb-4 md:mb-0 md:w-1/2 md:mr-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="sketchfab-embed-wrapper md:w-1/2">
        <iframe
          title={title}
          className="w-full h-64 rounded-lg"
          src={src}
        ></iframe>
      </div>
    </div>
  );
};

export default PlaceContainer;