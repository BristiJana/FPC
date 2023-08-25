import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet ,Modal, TouchableHighlight, ScrollView} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

// import Actual from './Actual';

const areaConversionFactors = {
  'Sq. Meter': 4046.86,
  Acre: 1,
  Guntha: 100,
  Hectare: 0.404686,
  'Kaccha Bigha': 1.875,
  'Pucca Bigha': 1.452605,
  'Sq. Yard': 4840,
};
const YourComponent = (props) => {
    
    const [coordinates, setCoordinates] = useState([]);
    const[cropname,setcropname]=useState('');
    const[area,setarea]=useState(1);
    const [selectedUnit, setSelectedUnit] = useState('Acre');
    const [modalVisible, setModalVisible] = useState(false);
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
        
        // <Actual data={formattedCoordinates} all={response.data}/>
        const areaFloat = parseFloat(response.data.area);
    
        setCoordinates(formattedCoordinates)
        setcropname(response.data.crop_type)
        console.log(cropname)
        setarea(areaFloat)
        
        setdate(response.data.Sowing_date)
        setlocation(response.data.District)
        console.log(coordinates)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ApiUrl,cropname,area,location,date]);

   
  
  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    setarea(area * areaConversionFactors[unit]);
    setModalVisible(false);
  };

  
 
  const givenDate = new Date(date);
  
 
  const currentDate = new Date();
  
 
  const differenceInMilliseconds = givenDate - currentDate;
  
  
  const differenceInDays = Math.abs(differenceInMilliseconds) / (1000 * 60 * 60 * 24);
  return (
    <View style={styles.container}>
     <View style={{width:'100%',height:250}}>
     {/* {coordinates.map((coord, index) => (
        <>
        <Text>{coord.latitude}</Text>  
           <Text>{ coord.longitude}</Text>  
            </>
        ))} */}
      <MapView style={styles.map} mapType='satellite'>
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
      </MapView></View><View>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.mptext}>Crop Name</Text> 
      <Text>{cropname}</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.mptext}>Variety</Text>
      <Text>None</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.mptext}>Area Conversation </Text>
      <View>
     


      
      <Text>{area.toFixed(2)} {selectedUnit}</Text>
      
      <TouchableHighlight
  style={styles.dropdownTrigger}
  onPress={() => setModalVisible(!modalVisible)}
>
  <Text style={styles.selectedUnit}>{selectedUnit}</Text>
</TouchableHighlight>

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <ScrollView style={styles.modalContent}>
      {Object.keys(areaConversionFactors).map((unit, index) => (
        <TouchableHighlight
          key={index}
          style={styles.dropdownOption}
          onPress={() => handleUnitChange(unit)}
        >
          <Text style={styles.dropdownOptionText}>{unit}</Text>
        </TouchableHighlight>
      ))}
    </ScrollView>
  </View>
</Modal>
      </View>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.mptext}>Crop Age      </Text>
      <Text>{differenceInDays.toFixed(0)}</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.mptext}>Sowing Date    </Text>
      <Text>{date}</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.mptext}>Location      </Text>
      <Text>{location}</Text>
      </View></View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mptext:{
    marginTop:10
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: 'gray',
   alignSelf:"center",
    backgroundColor:'white',
    
    width:100,

  },
  selectedUnit: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: 200,
  },
  dropdownOption: {
    paddingVertical: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
});

export default YourComponent;

