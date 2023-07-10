import React from "react";

export default function NotFound() {
  return (
    <div>
      <div className="w-max my-4 flex">
        <img
          src="https://res.cloudinary.com/dgsqarold/image/upload/v1688817720/Goibibo/42735_fhxgwb.png"
          alt="sad"
          className="w-8 h-8 mx-4 my-2 opacity-50"
        />
        <div>
          <p className="text-gray-700">
            Sorry! we couldn't find flights on this route!{" "}
          </p>
          <p className="text-xs text-gray-500"> Try with new search params </p>
        </div>
      </div>
    </div>
  );
}
