import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []);

  // Alternatively, we can use async/await but it is not allowed inside the useEffect,
  // therefore we have to create a function and call it at the end, outside the function,
  // but inside the useEffect.
  
  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     const response = await fetch("http://localhost:3000/places");
  //     const resData = await response.json();
  //     setAvailablePlaces(resData.places);
  //   };

  //   fetchPlaces();
  // }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
