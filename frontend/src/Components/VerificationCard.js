
import React from 'react';

const VerificationCard = ({ iconClass, title, content }) => (
    <div className="flex flex-col items-center bg-orange-100 border-4 border-orange-300 rounded-lg shadow m-4 hover:bg-orange-300 sm:w-64 md:w-72 lg:w-96 xl:w-112">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <div className="flex items-center mb-2">
          <div
            className="bg-gray-900 text-white rounded-full p-2 mr-2 flex items-center justify-center"
            style={{ width: "40px", height: "40px" }}
          >
            <i className={`fa ${iconClass}`} aria-hidden="true"></i>
          </div>
          <h5 className="text-lg font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        </div>
      </div>
      <p className="mb-3 font-normal text-gray-700">{content}</p>
    </div>
  );
 export default VerificationCard