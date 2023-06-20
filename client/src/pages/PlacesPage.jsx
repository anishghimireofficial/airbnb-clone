import React, { useState } from "react";
import { Link } from "react-router-dom";

import AccountNav from "../components/AccountNav";
import { useEffect } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="mt-4 ">
        {places.length > 0 &&
          places.map((place, i) => {
            return (
              <Link
                to={"/account/places/" + place._id}
                className="flex cursor-pointer gap-4 my-4 bg-gray-200 p-4 rounded-2xl"
                key={i}
              >
                <div className="flex w-32 h-32 bg-gray-400 grow shrink-0">
                  {/* {place.photo.length > 0 && (
                    <img
                      className="object-cover"
                      src={"http://localhost:3000/uploads/" + place.photo[0]}
                    />
                  )} */}
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;
