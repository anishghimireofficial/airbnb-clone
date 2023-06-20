import React, { useContext, useEffect, useState } from "react";
import differanceInCalendarDays from "date-fns/differenceInCalendarDays";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../userContext";

const BookingWidget = ({ place }) => {
  const [cheakIn, setCheakIn] = useState("");
  const [cheakOut, setCheakOut] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(userContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (cheakIn && cheakOut) {
    numberOfNights = differanceInCalendarDays(
      new Date(cheakOut),
      new Date(cheakIn)
    );
  }

  const bookThisPlace = async () => {
    const response = await axios.post("/bookings", {
      cheakIn,
      cheakOut,
      numberOfGuest,
      name,
      mobile,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: $ {place.price} / per night
        </div>

        <div className="border rounded-2xl mt-4 text-sm">
          <div className="flex ">
            <div className="py-3 px-4  ">
              <label htmlFor="">Check-In:</label>
              <input
                type="date"
                value={cheakIn}
                onChange={(ev) => setCheakIn(ev.target.value)}
              />
            </div>

            <div className=" py-3 px-4 border-l ">
              <label htmlFor="">Check-out:</label>
              <input
                type="date"
                value={cheakOut}
                onChange={(ev) => setCheakOut(ev.target.value)}
              />
            </div>
          </div>

          <div className=" py-3 px-4 border-t ">
            <label htmlFor="">Number of Guest:</label>
            <input
              type="number"
              value={numberOfGuest}
              onChange={(ev) => setNumberOfGuest(ev.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className=" py-3 px-4 border-t ">
              <label htmlFor="">Your Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label htmlFor="">Phone Number:</label>
              <input
                type="tel"
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
              />
            </div>
          )}
        </div>

        <button onClick={bookThisPlace} className="primary mt-4">
          Book the place
          {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
