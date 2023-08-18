import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const CustomDropdown = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    props.onValueChange(option);
    setIsDropdownOpen(false);
    // Do any further processing or actions with the selected option
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Crop Name</Text>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>
            {selectedOption || 'Select a Crop'}
          </Text>
        </View>
      </TouchableOpacity>
      {isDropdownOpen && (
        <ScrollView style={styles.dropdownList}>
          {props.options.map((option) => (
            <TouchableOpacity
              
              onPress={() => handleOptionSelect(option)}
              style={styles.dropdownOption}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    borderRadius:10,
    marginBottom:20,
    marginTop:20,
  },
  heading:{
    color:"black",
    fontWeight:"bold",
    paddingLeft:5,
    paddingBottom:8
  },
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius:10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownList: {
    maxHeight: 150,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:10,
    width:265,
    marginTop:10,
    marginLeft:10
    
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomDropdown;
