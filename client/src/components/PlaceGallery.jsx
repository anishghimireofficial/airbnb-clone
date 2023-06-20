import React, { useState } from "react";

const PlaceGallery = ({ place }) => {
  const [showAllPhoto, setShowAllPhoto] = useState(false);

  if (showAllPhoto) {
    return (
      <div className="absolute inset-0 bg-black text-white  min h-screen">
        <div className=" bg-black p-8 grid  gap-4">
          <h2 className=" mx-auto text-3xl ml-36">Photos of {place.title}</h2>
          <button
            onClick={() => setShowAllPhoto(false)}
            className="flex gap-1 py-1 px-2 fixed text-black bg-gray-200 rounded-2xl p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {place?.photo?.length > 0 &&
            place.photo.map((pic, i) => (
              <div className=" " key={i}>
                <img
                  className="w-4/6 mx-auto"
                  src={"http://localhost:3000/uploads/" + pic}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid gap-2  grid-cols-[2fr_1fr] sm:grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div className="">
          {place.photo?.[0] && (
            <img
              onClick={() => setShowAllPhoto(true)}
              className="aspect-square object-cover cursor-pointer"
              src={"http://localhost:3000/uploads/" + place.photo[0]}
            />
          )}
        </div>
        <div className="grid ">
          {place.photo?.[1] && (
            <img
              onClick={() => setShowAllPhoto(true)}
              className="aspect-square object-cover cursor-pointer"
              src={"http://localhost:3000/uploads/" + place.photo[1]}
            />
          )}
          <div className=" overflow-hidden">
            {place.photo?.[2] && (
              <img
                onClick={() => setShowAllPhoto(true)}
                className="aspect-square object-cover relative top-2 cursor-pointer"
                src={"http://localhost:3000/uploads/" + place.photo[2]}
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhoto(true)}
        className="absolute flex gap-1 bottom-2 right-2 py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
};

export default PlaceGallery;
