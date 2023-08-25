import React, { useState,useEffect,useRef ,useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,Animated, Easing,ActivityIndicator
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import TextTicker from 'react-native-text-ticker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'; // Import the Modal component from react-native-modal library

const Home = (props) => {
  // const [farms, setFarms] = useState([
  //   { id: '1', name: 'Demo 1',sm:'Mulberry',acre:'0.34',temp:'29-23',date:'26/06/2023',show:'67'},
  //   { id: '2', name: 'Demo 2',sm:'Alo Vera',acre:'0.12' ,temp:'29-23',date:'29/06/2023',show:'34'},
  //   { id: '3', name: 'Demo 3',sm:'Amaranthus',acre:'0.78',temp:'28-56',date:'05/07/2023',show:'45' },
  //   { id: '4', name: 'Demo 4',sm:'Alma',acre:'1.56',temp:'12-45',date:'11/07/2023',show:'37' },
  //   { id: '5', name: 'Demo 5' ,sm:'Apple',acre:'0.67',temp:'44-67',date:'12/07/2023',show:'88'},
  //   { id: '6', name: 'Demo 6',sm:'Arthar',acre:'0.11',temp:'27-45',date:'22/07/2023',show:'12' },
  //   { id: '7', name: 'Demo 7',sm:'Alsi',acre:'0.17',temp:'33-89',date:'30/07/2023',show:'11' },
  //   { id: '8', name: 'Demo 8',sm:'Arthar' ,acre:'0.89',temp:'17-89',date:'01/08/2023',show:'32'},
  //   // Add more farms as needed
  // ]);

  const [showPopup, setShowPopup] = useState(false);
  const [lisdata, setlisdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const translateX = useRef(new Animated.Value(-300)).current;

  const lisUrl = 'https://micro.satyukt.com/homepage?key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=';
  const handleAddFarmButtonPress = () => {
    setShowPopup(true);
  };

 
  const fetchListData = useCallback(async () => {
    try {
      const response = await axios.get(lisUrl);
      setlisdata(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListData();

    const startPosition = -300;
    const endPosition = 300;

    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: endPosition,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );

    animation.start();

    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchListData();
      animation.reset();
      animation.start();
    });

    return () => {
      unsubscribe();
      animation.stop();
    };
  }, [props.navigation, fetchListData, translateX]);

  return (
    <SafeAreaView style={styles.container}>
       {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (<>
      <View style={styles.flatheadingContainer}>
        <Icon name="plus" size={24} color="blue" style={styles.icon} />
        <Text style={styles.sheading}>Add New</Text>
        <View style={styles.border} />
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddFarmButtonPress}>
          <ImageBackground source={require('../../assets/crop.png')} style={styles.addButtonImage}>
            <Text style={styles.addText}>Farm</Text>
            
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.flatheadingContainer}>
        <Icon name="leaf" size={24} color="#006400" style={styles.icon} />
        <Text style={styles.heading}>My Farms</Text>
        <View style={styles.border} />
      </View>
      <FlatList
        data={lisdata}
        keyExtractor={(item) => item.FarmID}
        renderItem={({ item }) => (
         <TouchableOpacity onPress={()=>{props.navigation.navigate("Report", {
          FarmID: item.FarmID,
          Type:item.croptype})}}>
          <View style={styles.farmItem}>
            <View style={styles.farmitemcontainer}>
           
       <ImageBackground
        source={require('../../assets/crop.png')}
        style={styles.addButtonImageside}
        resizeMode="contain" // Adjust the image resize mode as per your requirement
       >
       <View style={styles.farmitemcontainer}><Icon name="cloud" style={styles.mpst1}size={16} color="black" /> 
       <Text style={styles.addimgText}>{item.temperature[1]}{item.temperature[2]}- {item.temperature[8]}{item.temperature[9]} `C</Text></View>
       <Text style={styles.addimgId}>{item.FarmID}</Text>
       </ImageBackground>
       <View style={styles.maincontainer}>
     <View style={styles.farmitemcontainer}>
      <View>
      <Text style={styles.farmtext}>{item.FarmName}</Text>
      <Text style={styles.farmsm}>{item.croptype}</Text>
      <View style={styles.farmitemcontainer}><Icon name="map" style={styles.mpst}size={14} color="green" /> 
      <Text style={styles.farmarc}>{item.Area.toFixed(2)} Acre</Text></View></View>

      <View style={styles.farmlast}>
      <View style={styles.farmitemcontainer1}><Icon name="lock" style={styles.mpst}size={20} color="black" /> 
      <Icon name="camera"style={styles.mpstt} size={20} color="black" />
      <Icon name="ellipsis-v" size={20} color="black" /></View>
      <Text style={styles.farmsm}>{item.sowingdate}</Text>
      
      <Text style={styles.farmarc}>Days of Sowing</Text></View>
      </View>
      <View style={styles.scrollBox}>
      <TextTicker
        style={styles.marqueeText}
        duration={5000} // Duration of the animation in milliseconds
        loop
        bounce
        scrollSpeed={1} // Adjust the scroll speed
        marqueeDelay={1000} // Delay before the animation starts
        useNativeDriver={true} // Use the native driver for better performance
      >
        {item.narrative}
      </TextTicker></View>
      
    </View>  
    
    </View>
          </View></TouchableOpacity>
        )}
      />

      <Modal isVisible={showPopup} backdropOpacity={0.5}>
        <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowPopup(false)}>
            <Icon name="times" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => props.navigation.navigate('DrawPage')}>
          <View style={styles.addButtonBackground}>
            <Image source={require('../../assets/map.jpg')} style={styles.addpopImage} />
            <Text style={styles.addpopText}>Draw</Text>
          </View>
        </TouchableOpacity>
          {/* Add your content inside the popup here */}
        </View>
      </Modal></>)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  maincontainer:
  {
    marginTop:12,
  },
  scrollBox: {
    width: 200,             
               
    overflow: 'hidden',
    
  },
  farmlast:
  {
marginTop:3,
marginLeft:32
  },
  mpst:
  {
marginRight:5
  },
  mpst1:
  {
marginRight:4,
marginTop:6,
marginLeft:6

  },
  mpstt:
  {
marginRight:20
  },
  farmtext:
  {
    fontWeight:"bold",
    color:"#000",
    fontSize:17
  },
  farmsm:
  {
paddingBottom:2,
paddingTop:2
  },
  addpopImage:
  {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  addpopText:
  {
    color:"black",
    fontWeight:"bold"
  },
  flatheadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
  },
  addText: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 6,
  },
  marqueeText: {
   
    
    color:'grey',
    padding: 10,
    paddingTop:0,
  },
  addimgId:{
    color:'white',
    fontWeight: 'bold',
    paddingTop:35,
    fontSize:11,
    paddingLeft:60
  },
  addimgText:
  {color: 'black',
  fontWeight: 'bold',
  textAlign: 'center',
  paddingTop: 8,},
  icon: {
    marginRight: 8,
  },
  farmarc:
  {
    color:"green",
    fontSize:10
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006400',
  },
  sheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  addButtonImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
  },
  addButtonImageside:
  {
    width: 100,
    height: 100,
    borderRadius:10,
    padding:0,
    marginRight:10,
    paddingTop:7,
    marginLeft:2,
  },
  addButton: {
    borderRadius: 10,
  },
  
  border: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderRadius: 10,
  },
  farmItem: {
  
    
    
    width:330,
    marginLeft:16,
    marginBottom:17,
   borderRadius:10,
   height:100,
  
  paddingTop:0,
  paddingLeft:10,
  elevation: 5,
shadowColor:'#000'

  },
  farmitemcontainer:
  {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  farmitemcontainer1:
  {
    flexDirection: 'row', 
    
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  popupHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  addButtonBackground: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    alignContent:"center",
    alignSelf:'center'
  },
});

export default Home;