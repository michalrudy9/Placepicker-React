import Places from "./Places";
import Error from "./Error";
import { sortPlacesByDistance } from "../loc";
import { fetchAvailablePlaces } from "../http";
import { useFetch } from "../hooks/useFetch";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolver) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolver(sortedPlaces);
    });
  });
}

function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    fetchedData: availablePlaces,
    error,
  } = useFetch(fetchSortedPlaces, []);

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
