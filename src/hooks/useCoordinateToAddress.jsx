import {useEffect, useState} from 'react';
import MapView, {Address} from 'react-native-maps';

const useCoordinateToAddress = (mapRef, location, forceFetch) => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      if (location.latitude && location.longitude && mapRef.current) {
        try {
          const resAddress = await mapRef.current.addressForCoordinate({
            latitude: location.latitude,
            longitude: location.longitude,
          });
          setAddress(resAddress);
        } catch (error) {
          if (!forceFetch) {
            setAddress(null);
          }
      
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef, location]);

  return address;
};

export default useCoordinateToAddress;
