import React from "react";

const SearchSection = ({ children }) => {
  return (
    <section className="-mt-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default SearchSection;
