import React, { useState ,useRef} from 'react';
import { View, Text, Button, FlatList, StyleSheet ,TouchableOpacity,Image,Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export const SLIDER_WIDTH = 280;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const dataArray = [
  { id: 1, Disease: 'Disease 1 Content' },
  { id: 2, Pest: 'Pest 1 Content' },
  { id: 3, Disease: 'Disease 2 Content' },
  { id: 4, Pest: 'Pest 2 Content' },
  // Add more objects with Disease and Pest keys
];

const Pestdis = () => {
  const route = useRoute();
  const dataReceived = route.params;
  const [selectedOption, setSelectedOption] = useState('option1');
  const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);

    const renderItem = ({item}) => {
      return (
        <View
          style={{
            borderWidth: 1,
            padding: 20,
            borderRadius: 20,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Image source={{uri: item}} style={{width: 200, height: 200}} />
         
        </View>
      );
    };
    
  const filteredData = dataReceived.filter(item => {
    if (selectedOption === 'option1') {
      return 'Disease' in item;
    } else if (selectedOption === 'option2') {
      return 'Pest' in item;
    }
    return false;
  });

  return (
    <View style={styles.container}>
      <View style={styles.options}>
      <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'option1' && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption('option1')}
        >
          <Text
            style={[
              styles.optionButtonText,
              selectedOption === 'option1' && styles.selectedButtonText,
            ]}
          >
            Disease
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'option2' && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption('option2')}
        >
          <Text
            style={[
              styles.optionButtonText,
              selectedOption === 'option2' && styles.selectedButtonText,
            ]}
          >
            Pest
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        
        renderItem={({ item }) => (
          <View style={styles.item}>
            {selectedOption === 'option1' ? (<>
             
            { item.Disease_img_url.length> 0 && (<>
           <Carousel
        ref={isCarousel}
        data={item.hasOwnProperty("Disease_img_url")?(item.Disease_img_url):([])}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
      />
      <Pagination
        dotsLength={item.hasOwnProperty("Disease_img_url")?(item.Disease_img_url.length):(0)}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#F4BB41',
        }}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: 'black',
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /></>)}
             <View>
              <View style={{borderBottomWidth:1,borderBottomColor:"grey",width:'100%',flex:1,paddingVertical: 10,}}>
             
             
             <Text style={{color:'red',fontWeight:'bold',fontSize:20}}> {item.Disease}</Text></View>
             <View style={{borderBottomWidth:1,borderBottomColor:"grey",width:'100%',flex:1,paddingVertical: 10,}}>
             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
             <Text style={{color:'blue',fontWeight:'bold',paddingRight:20}}>Date</Text>
             <Text style={{color:'black',fontWeight:'bold'}}> {item.Date}</Text></View></View>
             <View style={{borderBottomWidth:1,borderBottomColor:"grey",width:'100%',flex:1,paddingVertical: 10,}}>
             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
             <Text style={{color:'blue',fontWeight:'bold',paddingRight:20}}>Disease Name</Text>
             <Text style={{color:'red',fontWeight:'bold'}}> {item.Disease}</Text></View></View>
             <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Symptoms</Text>
             <Text style={{color:'black',width:300}}> {item.Symptoms}</Text>
             <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Affected part</Text>
             <Text style={{color:'black',width:300}}> {item.Affected_Part}</Text>
             <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Mode of Spread</Text>
             <Text style={{color:'black',width:300}}> {item.Mode_of_Spread}</Text>
             <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Stage of Infection</Text>
             <Text style={{color:'black',width:300}}> {item.Stage_of_Infection}</Text>
             <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Pathogen</Text>
             <Text style={{color:'black',width:300}}> {item.Pathogen}</Text>
             <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Solution</Text>
             <Text style={{color:'black',width:300}}> {item.Solution}</Text>
             
           </View></>
            ) : (
              <>
             
                {item.Pest_img_url.length > 0 && (<>
           <Carousel
        ref={isCarousel}
        data={item.hasOwnProperty("Pest_img_url")?item.Pest_img_url:[]}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
      />
      <Pagination
        dotsLength={item.hasOwnProperty("Pest_img_url")?item.Pest_img_url.length:0}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#F4BB41',
        }}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: 'black',
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /></>)}
              <View>
                <View style={{borderBottomWidth:1,borderBottomColor:"grey",width:'100%',flex:1,paddingVertical: 10,}}>
             
             
             <Text style={{color:'red',fontWeight:'bold',fontSize:20}}> {item.Pest}</Text></View>
              <View style={{borderBottomWidth:1,borderBottomColor:"grey",width:'100%',flex:1,paddingVertical: 10,}}>
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={{color:'blue',fontWeight:'bold',paddingRight:20}}>Date</Text>
              <Text style={{color:'black',fontWeight:'bold'}}> {item.Date}</Text></View></View>
              <View style={{borderBottomWidth:1,borderBottomColor:"grey",width:'100%',flex:1,paddingVertical: 10,}}>
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={{color:'blue',fontWeight:'bold',paddingRight:20}}>Pest Name</Text>
              <Text style={{color:'red',fontWeight:'bold'}}> {item.Pest}</Text></View></View>
              <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Symptoms</Text>
             <Text style={{color:'black',width:300}}> {item.Symptoms}</Text>
              <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Affected part</Text>
              <Text style={{color:'black',width:300}}> {item.Affected_Part}</Text>
              <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Mode of Spread</Text>
              <Text style={{color:'black',width:300}}> {item.Mode_of_Spread}</Text>
              <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Stage of Infection</Text>
              <Text style={{color:'black',width:300}}> {item.Stage_of_Infection}</Text>
              <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Pathogen</Text>
              <Text style={{color:'black',width:300}}> {item.Pathogen}</Text>
              <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Solution</Text>
              <Text style={{color:'black',width:300}}> {item.Solution}</Text>
              
            </View></>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  selectedOption: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  optionButtonText: {
    color: 'black',
    fontSize: 16,
  },
  selectedButtonText: {
    color: 'blue',
  },
  selectionIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  indicator: {
    width: 40,
    height: 2,
    backgroundColor: 'transparent',
  },
  indicatorOption1: {
    backgroundColor: 'blue',
  },
  indicatorOption2: {
    backgroundColor: 'blue',
  },
  
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 100,
    resizeMode: 'cover',
  },
  item: {
   
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3, // Elevation for shadow effect
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
});

export default Pestdis;
