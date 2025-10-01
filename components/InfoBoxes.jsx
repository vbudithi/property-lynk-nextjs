import React from "react";
import InfoBox from "./InfoBox";
import { FaKey, FaHome } from "react-icons/fa";

const InfoBoxes = () => {
  return (
    <section className="py-12">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {/* For Renters */}
          <InfoBox
            heading={
              <span className="flex items-center gap-2">
                <FaKey className="text-blue-500" />
                For Renters
              </span>
            }
            backgroundColor="bg-gradient-to-br from-gray-100 to-gray-200"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
          >
            <div className="text-gray-600 leading-relaxed">
              Find your dream rental property. Save your favorites, bookmark
              properties, and contact owners directly. Start your journey to the
              perfect home today!
            </div>
          </InfoBox>

          {/* For Property Owners */}
          <InfoBox
            heading={
              <span className="flex items-center gap-2">
                <FaHome className="text-blue-600" />
                For Property Owners
              </span>
            }
            backgroundColor="bg-gradient-to-br from-blue-50 to-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            <div className="text-gray-600 leading-relaxed">
              List your property and reach thousands of potential tenants.
              Whether it’s a short Airbnb stay or a long-term rental, you’re in
              control. Grow your reach with ease.
            </div>
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
