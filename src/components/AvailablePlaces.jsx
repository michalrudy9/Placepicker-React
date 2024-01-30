import Places from "./Places";
import Error from "./Error";
import { sortPlacesByDistance } from "../loc";
import { fetchAvailablePlaces } from "../http";
import { useFetch } from "../hooks/useFetch";

// navigator.geolocation.getCurrentPosition((position) => {
//   const sortedPlaces = sortPlacesByDistance(
//     places,
//     position.coords.latitude,
//     position.coords.longitude
//   );
//   setAvaliablePlaces(sortedPlaces);
//   setIsFetching(false);
// });

function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    fetchedData: availablePlaces,
    error,
    setFetchedData: setAvaliablePlaces,
  } = useFetch(fetchAvailablePlaces, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      loadingText="Fetching place data ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
    />
  );
}

export default AvailablePlaces;
