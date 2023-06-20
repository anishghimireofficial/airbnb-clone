import React, { useEffect, useState } from "react";
import Perks from "../components/perks";
import PhotoUploader from "../components/PhotoUploader";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [cheakIn, setCheakIn] = useState("");
  const [cheakOut, setCheakOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photo);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheakIn(data.cheakIn);
      setCheakOut(data.cheakOut);
      setMaxGuest(data.maxGuest);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(event) {
    event.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      cheakIn,
      cheakOut,
      maxGuest,
      price,
    };

    if (id) {
      //update
      await axios.put("/places/" + id, {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      //Add new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <div className="">
          <AccountNav />
          <form onSubmit={savePlace} className="">
            {/* Title */}
            {preInput(
              "Title",
              "Title for your place should be short and catchy as in advertisement"
            )}
            <input
              type="text"
              placeholder="Title,for example: my Lovely home"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            {/* Address */}
            {preInput("Address", "Address to this place")}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
            {/* Photos */}
            {preInput("Photos", "Photos of your place")}
            <PhotoUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />

            {/*Description  */}
            {preInput("Description", "Description of your place")}
            <textarea
              className=""
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            {/* Perks */}
            {preInput("Perks", " Select all the perks of your place")}
            <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-col-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {/* Extra Info */}
            {preInput("Extra Info", "house ,rules ,etc")}

            <textarea
              value={extraInfo}
              onChange={(event) => {
                setExtraInfo(event.target.value);
              }}
            />
            {/* Cheak in & Out times */}
            {preInput(
              "Cheak In&Out times ,max guests",
              "Add cheak in and out times ,remember to have some time window for cleaning the room between the guests"
            )}

            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
              <div className="">
                <h3 className="mt-2 mb-1">Cheak in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  value={cheakIn}
                  onChange={(event) => {
                    setCheakIn(event.target.value);
                  }}
                />
              </div>
              <div className="">
                <h3 className="mt-2 mb-1">Cheak out time</h3>
                <input
                  type="text"
                  placeholder="11:00"
                  value={cheakOut}
                  onChange={(event) => {
                    setCheakOut(event.target.value);
                  }}
                />
              </div>
              <div className="">
                <h3 className="mt-2 mb-1">Max number of guest</h3>
                <input
                  type="number"
                  value={maxGuest}
                  onChange={(event) => {
                    setMaxGuest(event.target.value);
                  }}
                />
              </div>
              <div className="">
                <h3 className="mt-2 mb-1">price per night : $</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </div>
            </div>

            <button className="primary my-4">Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PlacesFormPage;
