import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  //Fetching all Places from the ApI
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className=" mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, i) => (
          <Link to={"/place/" + place._id} key={i} className="">
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photo.length > 0 && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:3000/uploads/" + place.photo[0]}
                />
              )}
            </div>

            <h2 className="font-bold  ">{place.address}</h2>
            <h3 className="text-sm  text-gray-500 leading-4">{place.title}</h3>

            <div className="mt-1">
              <span className="font-bold">${place.price} </span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
