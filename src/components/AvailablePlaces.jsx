import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

const fetchSortedPlaces = async () => {
  const places = await fetchAvailablePlaces();
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces)
    });
  });
};

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    fetchedData: availablePlaces,
    error,
    setFetchData: setAvailablePlaces,
  } = useFetch(fetchAvailablePlaces, []);

  // useEffect(() => {
  //   setIsFetching(true);
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((resData) => {
  //       setAvailablePlaces(resData.places);
  //       setIsFetching(false)
  //     });
  // }, []);

  // Alternatively, we can use async/await but it is not allowed inside the useEffect,
  // therefore we have to create a function and call it at the end, outside the function,
  // but inside the useEffect.

  // We use try and catch so that the application won't crash.
  // We then create a http.js file and move the code inside there as helper function.
  // We import the fetchAvailablePlaces() and use it below to have cleaner code.
  // IMPORTANT: Make sure to use await and store the result inside a variable

  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     setIsFetching(true);
  //     try {
  //       const places = await fetchAvailablePlaces();
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         const sortedPlaces = sortPlacesByDistance(
  //           places,
  //           position.coords.latitude,
  //           position.coords.longitude
  //         );
  //         setAvailablePlaces(sortedPlaces);
  //         setIsFetching(false);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       setError({
  //         message:
  //           error.message || "Could not fetch places, please try again later!",
  //       });
  //       setIsFetching(false);
  //     }
  //   };

  //   fetchPlaces();
  // }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
