import React from "react";

const PageTitle = ({ children }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 -mt-5 inline-block border-blue-500 pb-2">
        {children}
      </h1>
    </div>
  );
};

export default PageTitle;
