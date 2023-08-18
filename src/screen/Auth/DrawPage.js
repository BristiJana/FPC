import React, { useState,useEffect, useRef } from 'react';
import { View, FlatList,StyleSheet, TouchableOpacity, Text, TextInput, PermissionsAndroid, Modal, Image,Switch  ,ScrollView} from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';



import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDropdown from '../Other/CustomDropdown';
import DateOfBirthComponent from '../Other/DateOfBirthComponent';
import SelectDate from '../Other/SelectDate';
const DrawPage = ({navigation}) => {
  
  // const answer_params = [
  //   { key: 'akarka', label: 'Akarka' },
  //   { key: 'alsi', label: 'Alsi' },
  //   { key: 'alo vera', label: 'Alo vera' },
  //   { key: 'amaranthus', label: 'Amaranthus' },
  //   { key: 'alma', label: 'Alma' },
  //   { key: 'apple', label: 'Apple' },
  //   { key: 'arecanut', label: 'Arecanut' },
  //   { key: 'arthar', label: 'Arthar' },
  //   // Add more options here if needed
  // ];

  const MAPBOX_API_KEY = 'pk.eyJ1IjoiYnJpc3RpIiwiYSI6ImNsazJpNWo4dDBodmQzbHBqaGI0YjI1YW0ifQ.XLJuG4EVetRM0pM1F1sPnA';
const AUTOCOMPLETE_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
const DEFAULT_LOCATION = { latitude: 37.7749, longitude: -122.4194 };
  const [answerparams, setanswerparams] = useState([]);
  const cropUrl = 'https://micro.satyukt.com/Crops';
  const [coordinates, setCoordinates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [searchedCoordinates, setSearchedCoordinates] = useState(DEFAULT_LOCATION);
  const [open, setOpen] = useState(false);
  const [mapType, setMapType] = useState('standard');
  const mapRef = useRef(null);
  const [modalVisible1, setModalVisible1] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [userName, setUserName] = useState(''); 
  const [notYourFarm, setNotYourFarm] = useState(false); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showArea, setShowArea] = useState(false);
  const [crpval, setcrpValue] = useState('');
const [dtval,setdtVal]=useState('');
  const handlecrpval = (newValue) => {
    setcrpValue(newValue); // Update the value in ComponentA's state
  };

  const handledtval=(newValue)=>{
setdtVal(newValue);
  }

  const [popupData, setPopupData] = useState({
    name: '',
    description: '',
    phoneNumber: '',
    notYourFarm: false,
  });
  const [showPopup1, setShowPopup1] = useState(false);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [predictions, setPredictions] = useState([]);
  const fincord = coordinates.map((coord) => [parseFloat(coord.longitude.toFixed(14)),
    parseFloat(coord.latitude.toFixed(15))]);
    const firstCoordinate = fincord[0];


fincord.push(firstCoordinate);
  const fincordJson = JSON.stringify(fincord);
  const encodedFincord = encodeURIComponent(fincordJson);
  const [isFlatListVisible, setIsFlatListVisible] = useState(true);

  const handleItemPress = (item) => {
    setSearchQuery(item.place_name);
    setIsFlatListVisible(!isFlatListVisible); // Hide the FlatList when an item is clicked
  };

  const handleNext = async () => {
    setShowPopup1(true);
    const finUrl='https://micro.satyukt.com/postjson2?key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=&name='+userName+'&coordinates='+fincordJson+'&croptype='+crpval+'&phone_num='+phoneNumber+'&category=farm'
    console.log(finUrl)
    
    try {
      const response = await axios.get(finUrl);
      
      alert("Added Succesfully")
      navigation.navigate('Home');
    } catch (error) {
      alert('Error fetching data:', error);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
    setDropdownVisible(false);
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentCoordinate = { latitude, longitude };
        setSearchedCoordinates(currentCoordinate);
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => {
        console.log('Error retrieving current location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const BlurredOverlay = () => {
    return (
      <View style={styles.overlay}>
        {/* You can adjust the opacity to control the blur effect */}
        <View style={styles.blurView} />
      </View>
    );
  };
  const handlePolygonPress = (event) => {
    const { nativeEvent } = event;
    const { coordinate } = nativeEvent;

    setCoordinates([...coordinates, coordinate]);
  };

  const handlePolygonChange = (polygonCoordinates) => {
    setCoordinates(polygonCoordinates);
  };

  const handleShowCoordinates = async () => {
    try {
      const response = await axios.get(
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' + searchQuery + '.json',
        {
          params: {
            access_token: 'pk.eyJ1IjoiYnJpc3RpIiwiYSI6ImNsazJpNWo4dDBodmQzbHBqaGI0YjI1YW0ifQ.XLJuG4EVetRM0pM1F1sPnA', // Replace with your Mapbox access token
          },
        }
      );

      const results = response.data.features;
      if (results.length > 0) {
        const [lng, lat] = results[0].center;
        const newCoordinate = { latitude: lat, longitude: lng };
        setSearchedCoordinates(newCoordinate);
        setMapRegion(newCoordinate);
      }
    } catch (error) {
      console.error('Error retrieving coordinates:', error);
    }
  };

  const handleReload = () => {
    setCoordinates([]);
    setSearchedCoordinates(null);
    getCurrentLocation();
  };

  const handleUndo = () => {
    setCoordinates(coordinates.slice(0, -1));
  };

  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  const handleSearchQueryChange = async (query) => {
    setSearchQuery(query);
    setIsFlatListVisible(query.length > 0)
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `${AUTOCOMPLETE_ENDPOINT}${query}.json`,
          {
            params: {
              access_token: MAPBOX_API_KEY,
              proximity: `${searchedCoordinates.longitude},${searchedCoordinates.latitude}`,
              types: 'place',
            },
          }
        );
        
        setPredictions(response.data.features);
      } catch (error) {
        alert('Error retrieving autocomplete predictions:', error);
        console.error('Error retrieving autocomplete predictions:', error);
      }
    } else {
      setPredictions([]);
    }
  };

  const handleChange1 = (value) => {
    setLat(value);
  };

  const handleChange2 = (value) => {
    setLong(value);
  };

  const setMapRegion = (coordinate) => {
    mapRef.current.animateToRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleSearchCoordinates = () => {
    setOpen(!open);

    if (lat && long) {
      const coordinate = {
        latitude: parseFloat(lat.trim()),
        longitude: parseFloat(long.trim()),
      };
      setSearchedCoordinates(coordinate);
      mapRef.current.animateToRegion({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  
  const handlePopupSubmit = () => {
    // Add the phone number and notYourFarm data to popupData
    setPopupData({
      ...popupData,
      phoneNumber: phoneNumber,
      notYourFarm: notYourFarm,
    });

    

    setListOfFarms((prevFarms) => [...prevFarms, popupData]);

    setPopupData({
      name: '',
      description: '',
      phoneNumber: '',
      notYourFarm: false,
    });

    setShowPopup(false);
  };
  const handleUserNameSubmit = () => {
    if (userName.trim() !== '') {
      setModalVisible1(false);
    }
  };
  useEffect(() => {
    if (coordinates.length > 2) {
      setShowArea(true);
      fetchcropData();
    } else {
      setShowArea(false);
      setanswerparams([]);
    }
  }, [coordinates]);

  const fetchcropData = async () => {
    try {
      const response = await axios.get(cropUrl);
     
      setanswerparams(prevData => [...prevData, ...response.data]);
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  const calculateArea = () => {
    if (coordinates.length < 3) {
      return 0;
    }
  
    let area = 0;
    const numPoints = coordinates.length;
  
    for (let i = 0; i < numPoints; i++) {
      const j = (i + 1) % numPoints;
      const { latitude: lat1, longitude: lon1 } = coordinates[i];
      const { latitude: lat2, longitude: lon2 } = coordinates[j];
      area += (lon1 * lat2 - lon2 * lat1);
    }
  
    area = Math.abs(area / 2) * 111319.9 * 111319.9; // Approximate area in square meters
    const areaInHectares = area / 10000; // Convert area from square meters to hectares
    return areaInHectares.toFixed(2);
  };
  return (
    
    <View style={styles.container}>
       {modalVisible1 ? ( 
        
          <View style={styles.userNamePopup}>
          <Text style={styles.popupTitle}>Details</Text>
          <TextInput
            style={styles.popupInput}
            placeholder="Name"
            placeholderTextColor={'grey'}
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
          <View style={styles.formContainer}>
          <View style={styles.formRow}>
          <Text style={styles.formLabel}>Not Your Farm:</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notYourFarm ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => setNotYourFarm(value)}
            value={notYourFarm}
          />
        </View>
        {notYourFarm && (
          <TextInput
            style={styles.formInput}
            placeholder="Phone Number"
            placeholderTextColor={'grey'}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        )}
      
          </View>
          <TouchableOpacity style={styles.popupButton} onPress={handleUserNameSubmit}>
            <Text style={styles.popupButtonText}>Next</Text>
          </TouchableOpacity>
          
        </View>
       
      ) : (
        <>
          <MapView style={styles.map} onPress={handlePolygonPress} ref={mapRef} mapType={mapType}>
        {coordinates.length > 2 && (
          <Polygon
            coordinates={coordinates}
            strokeColor="#F00"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={2}
          />
        )}
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            coordinate={coord}
            title={`Point ${index + 1}`}
            pinColor="#F00"
          />
        ))}
        {searchedCoordinates && (
          <Marker
            coordinate={searchedCoordinates}
            title="Searched Location"
            pinColor="#00F"
          />
        )}
      </MapView>
      <View style={styles.floatcontainer}>
        <TouchableOpacity
          style={styles.floatbutton}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Image
            source={require('../../assets/plus.jpg')}
            style={{ width: 24, height: 24, borderRadius: 50 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        {modalVisible ? (
          <View>
             <View style={styles.modalContent}>
           <TouchableOpacity style={styles.button} onPress={handleReload}>
          <Text style={styles.buttonText}>Erase</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={requestLocationPermission}>
          <Text style={styles.buttonText}>Current Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSearchCoordinates}>
          <Text style={styles.buttonText}>Search Coordinate</Text>
        </TouchableOpacity>
       
{open ? (
  <>
    
    <TextInput
      style={styles.searchInput}
      placeholder="Latitude"
      placeholderTextColor={"grey"}
      value={lat}
      onChangeText={handleChange1}
    />
   
    <TextInput
      style={styles.searchInput}
      placeholder="Longitude"
      placeholderTextColor={"grey"}
      value={long}
      onChangeText={handleChange2}
    />
  </>
) : (
  <></>
)}


        <TouchableOpacity style={styles.button} onPress={toggleMapType}>
          <Text style={styles.buttonText}>
            {mapType === 'standard' ? 'Satellite View' : 'Standard View'}
          </Text>
        </TouchableOpacity>
        {coordinates.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={handleUndo}>
            <Text style={styles.buttonText}>Undo</Text>
          </TouchableOpacity>
        )}
           </View>
       
          </View>
        ) : (
          <></>
        )}
      </View>
     
       {/* {coordinates.length > 0 && (
        <View style={styles.coordinatesContainer}>
          
          {fincord.map((coords, index) => (
      // Render the coordinates or perform any desired action
      <Text key={index}>{coords[0]}, {coords[1]}</Text>
    ))}
        </View>
      
      )} 
     */}
      <View style={styles.searchContainer}>
  <View style={styles.searchInputContainer}>
        <TouchableOpacity onPress={handleShowCoordinates}>
          <Image
            source={require('../../assets/search-icon-png-1.png')}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={handleSearchQueryChange}
          placeholderTextColor="#888"
        />
       </View>
       {isFlatListVisible && (
        <FlatList
          data={predictions}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => handleItemPress(item)}>
              <Text style={{color:"grey"}}>{item.place_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}

        
        
      </View>
   
      {showPopup && (
        <Modal animationType="slide" transparent visible={showPopup}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupTitle}>Add Farm Data</Text>
            <TextInput
              style={styles.popupInput}
              placeholder="Farm Name"
              value={popupData.name}
              onChangeText={(text) => setPopupData((prevData) => ({ ...prevData, name: text }))}
            />
            <TextInput
              style={styles.popupInput}
              placeholder="Farm Description"
              value={popupData.description}
              onChangeText={(text) =>
                setPopupData((prevData) => ({ ...prevData, description: text }))
              }
            />
            
            <TouchableOpacity style={styles.popupButton} onPress={handlePopupSubmit}>
              <Text style={styles.popupButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.popupButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
         {showArea && (<>
        <View style={styles.areaContainer}>
          <Text style={styles.areaText}>Enclosed: {calculateArea()} ha</Text>
          <TouchableOpacity style={styles.popupButton} onPress={() => setShowPopup1(true)}>
        <Text style={styles.popupButtonText}>Next</Text>
      </TouchableOpacity>
        </View>
        {showPopup1 && (
          
          <Modal animationType="slide" transparent visible={showPopup1}>
           {/* Add the BlurredOverlay component here */}
           <BlurredOverlay/>
          <View style={styles.popupContainer}>
            <Text style={styles.popupTitle}>Farm Details</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowPopup1(false)}>
            <Icon name="times" size={24} color="red" />
          </TouchableOpacity>
            <View style={styles.horizontalLine} />
           
      
            {/* Add your dropdown date input and other elements here */}
            <CustomDropdown options={answerparams}  onValueChange={handlecrpval} />
            <SelectDate selectedDate={dtval} onDateChange={handledtval}/>
          
            <TouchableOpacity style={styles.button} onPress={handleNext} >
            
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
           
          </View>
        </Modal>
          
      )}
        </>
      )}
     
        </>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  // ... Your existing styles ...
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color:'grey'
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  userNamePopup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  // ... Your existing styles ...
  formContainer: {
    margin: 20,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    width:252
  },
  areaContainer: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
    elevation: 5,
  },
  areaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"black"
  },
  formRow: {
    flexDirection: 'row', // To align items in the same row
    alignItems: 'center', // To vertically center the items
    marginBottom: 10,
  },
  formLabel: {
    fontSize: 16,
    marginRight: 10,
    color:'grey' // Add spacing between text and switch
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color:'grey'
  },
  popupHead:{
    fontSize:22,
    fontWeight:"bold"
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  popupInput: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    width: '80%',
    color:'grey'
  },
  popupButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    alignSelf:"center"
  },
  popupButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  popupContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    margin: 20,
    elevation: 5,
  },
 
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    margin: 20,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 13,
    right: 10,
    padding: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 50,
    marginBottom:10,
    
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign:"center"
  },
  coordinatesContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
  },
  coordinateText: {
    marginBottom: 5,
  },
  
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  icon: {
    marginRight: 10,
  },
  floatcontainer:
  {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  floatbutton:{
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  searchInput: {
    flex: 1,
    
    fontSize: 16,
    color: '#000',
    backgroundColor:"white",
    marginTop:10,
    marginBottom:10,
    color:"grey"

  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#F00',
    padding: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#888',
    marginVertical: 10,
  },
});

export default DrawPage;




