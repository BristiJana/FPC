import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

const YourComponent = (props) => {
    
    const [coordinates, setCoordinates] = useState([]);
    const[cropname,setcropname]=useState('');
    const[area,setarea]=useState('');
    
    const[date,setdate]=useState('');
    const[location,setlocation]=useState('');

    const ApiUrl='https://micro.satyukt.com/showPolygon?farmID='+props.farmid+'&key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek='
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ApiUrl);
        console.log(response.data.crop_type)
        const rawData = response.data.geo_json.geometry.coordinates;
        console.log(rawData)
        const formattedCoordinates = rawData[0].map(([longitude, latitude]) => ({
          latitude,
          longitude,
        }));
        console.log(formattedCoordinates)
        setCoordinates(formattedCoordinates)
        setcropname(response.crop_type)
        setarea(response.area)
        
        setdate(response.Sowing_date)
        setlocation(response.District)
        console.log(coordinates)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ApiUrl]);

  return (
    <View style={styles.container}>
     
     {/* {coordinates.map((coord, index) => (
        <>
        <Text>{coord.latitude}</Text>  
           <Text>{ coord.longitude}</Text>  
            </>
        ))} */}
      <MapView style={styles.map}>
        <Polyline coordinates={coordinates} strokeWidth={2} strokeColor="#00F" />
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: coord.latitude,
              longitude: coord.longitude,
            }}
            title={`Marker ${index + 1}`}
          />
        ))}
      </MapView>
      <Text>Crop Name {cropname}</Text>
      <Text>Variety    None</Text>
      <Text>Area Conversation {area}</Text>
      <Text>Crop Age 24 Days</Text>
      <Text>Sowing Date {date}</Text>
      <Text>Location {location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default YourComponent;

