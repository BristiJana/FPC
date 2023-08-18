import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import * as constant from '../../constant/Constant';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {EventRegister} from 'react-native-event-listeners';
import {personalDetailInputChange} from '../../redux/ExportAction';
import {sin} from 'react-native-reanimated';

class SelectCountrytoVillage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: {
        country: undefined,
        state: undefined,
        district: undefined,
        taluka: undefined,
        village: undefined,
      },

      isCountryValid: true,
      isStateValid: true,
      isDistrictValid: true,
      isTalukaValid: true,
      isVillageValid: true,

      selectCountryItems: [],
      selectStateItems: [],
      selectDistrictItems: [],
      selectTalukaItems: [],
      selectVillageItems: [],

      valueC: this.props.country_ref_id,
      valueS: this.props.state_ref_id,
      valueD: this.props.district_ref_id,
      valueT: this.props.taluka_ref_id,
      valueV: this.props.village_ref_id,
    };
  }

  componentDidMount() {
    this.submitListener = EventRegister.addEventListener(
      constant.PERSONAL_DETAILS_CONSTANT,
      () => {
        // console.log('------------------->>>.>>>MMMMm');
        // console.log('stateValue-->', this.state.isCountryValid);
        console.log(
          'stateValue-->',
          JSON.stringify(this.state.isCountryValid, null, 2),
        );
        Object.keys(this.state.locationData).forEach(item => {
          if (this.props.validation(this.state.locationData[item])) {
          } else {
            this.swiitchCase(item);
          }
        });
      },
    );

    this.getCountry();
    setTimeout(() => {
      this.state.selectCountryItems.map(item => {
        if (item.key == this.state.valueC) {
          this.setState({valueC: item});
          if (
            this.props.state_ref_id != undefined ||
            this.props.state_ref_id != '' ||
            this.props.state_ref_id != null
          )
            this.getState(this.props.country_ref_id);
          setTimeout(() => {
            this.state.selectStateItems.map(item => {
              if (item.key == this.state.valueS) {
                this.setState({valueS: item});
                if (
                  this.props.district_ref_id != undefined ||
                  this.props.district_ref_id != '' ||
                  this.props.district_ref_id != null
                ) {
                  this.getDistrict(this.props.state_ref_id);
                  setTimeout(() => {
                    this.state.selectDistrictItems.map(item => {
                      if (item.key == this.state.valueD) {
                        this.setState({valueD: item});
                        if (
                          this.props.taluka_ref_id != undefined ||
                          this.props.taluka_ref_id != '' ||
                          this.props.taluka_ref_id != null
                        ) {
                          this.getTaluka(this.props.district_ref_id);
                          setTimeout(() => {
                            this.state.selectTalukaItems.map(item => {
                              if (item.key == this.state.valueT) {
                                this.setState({valueT: item});
                                if (
                                  this.props.village_ref_id != undefined ||
                                  this.props.village_ref_id != '' ||
                                  this.props.village_ref_id != null
                                ) {
                                  this.getTaluka(this.props.taluka_ref_id);
                                  setTimeout(() => {
                                    this.state.selectVillageItems.map(item => {
                                      if (item.key == this.state.valueV) {
                                        this.setState({valueV: item});
                                      }
                                    });
                                  }, 1000);
                                }
                              }
                            });
                          }, 1000);
                        }
                      }
                    });
                  }, 1000);
                }
              }
            });
          }, 1000);
        }
      });
    }, 1 * 1000);
  }

  swiitchCase(value) {
    switch (value) {
      case 'country':
        {
          // console.log('Country Undefined');
          this.setState({isCountryValid: false});
        }
        break;
      case 'state':
        {
          // console.log('State Undefined');
          this.setState({isStateValid: false});
        }
        break;
      case 'district':
        {
          // console.log('District Undefined');
          this.setState({isDistrictValid: false});
        }
        break;
      case 'taluka':
        {
          // console.log('Taluka Undefined');
          this.setState({isTalukaValid: false});
        }
        break;
      case 'village':
        {
          // console.log('Village Undefined');
          this.setState({isVillageValid: false});
        }
        break;
    }
  }

  checkValid() {}

  componentWillUnmount() {
    EventRegister.removeEventListener(this.submitListener);
  }

  async getCountry() {
    api.selectCountry().then(response => {
      console
        .log
        //   'resposnse Country---->' + JSON.stringify(response.data, null, 2),
        ();
      let Array = [];

      response.data.map(item => {
        Array.push({
          key: item.id,
          value: item.country_name,
        });
      });
      this.setState({selectCountryItems: Array});

      return Array;
    });
  }

  async getState(id) {
    api
      .getState(id)
      .then(response => {
        let Array = [];
        response.data.map(item => {
          Array.push({
            key: item.id,
            value: item.state_name,
          });
        });
        this.setState({selectStateItems: Array});

        return Array;
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  getDistrict(id) {
    api.getDistrict(id).then(response => {
      let Array = [];

      response.data.map(item => {
        Array.push({
          key: item.id,
          value: item.district_name,
        });
      });
      this.setState({selectDistrictItems: Array});
    });
  }
  getTaluka(id) {
    api.getTaluka(id).then(response => {
      let Array = [];

      response.data.map(item => {
        Array.push({
          key: item.id,
          value: item.sub_district_name,
        });
      });
      this.setState({selectTalukaItems: Array});
    });
  }

  getVillage(id) {
    api.getVillageData(id).then(response => {
      //   console.log('res', JSON.stringify(response.data, null, 2));
      let Array = [];
      response.data.map(item => {
        Array.push({
          key: item.id,
          value: item.village_name,
        });
      });

      this.setState({selectVillageItems: Array});
    });
  }

  render() {
    return (
      <View>
        <View>
          <Text style={style.heading}>
            Country <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View key={1}>
            <SelectList
              search={true}
              setSelected={val => {
                this.props.personalDetials({
                  country_ref_id: val,
                });
                this.setState({
                  locationData: {
                    ...this.state.locationData,
                    country: val,
                  },
                  isCountryValid: true,
                });
                this.getState(val);
              }}
              data={this.state.selectCountryItems}
              dropdownStyles={{backgroundColor: '#fff'}}
              boxStyles={{
                backgroundColor: '#',
                borderColor: this.state.isCountryValid ? 'black' : 'red',
                height: 50,
              }}
              dropdownTextStyles={{color: '#000'}}
              placeholder="Select"
              save="key"
              inputStyles={{color: 'gray', fontWeight: '600'}}
              defaultOption={this.state.valueC}
            />
          </View>
        </View>

        <View>
          <Text style={style.heading}>
            State <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View key={1}>
            <SelectList
              search={true}
              setSelected={val => {
                this.props.personalDetials({
                  state_ref_id: val,
                });
                // this.setState({state: val});
                this.setState({
                  locationData: {
                    ...this.state.locationData,
                    state: val,
                  },
                  isStateValid: true,
                });
                this.getDistrict(val);
              }}
              data={this.state.selectStateItems}
              dropdownStyles={{backgroundColor: '#fff'}}
              boxStyles={{
                backgroundColor: '#',
                borderColor: this.state.isStateValid ? 'black' : 'red',
                height: 50,
              }}
              dropdownTextStyles={{color: '#000'}}
              placeholder="Select"
              save="key"
              inputStyles={{color: 'gray', fontWeight: '600'}}
              defaultOption={this.state.valueS}
            />
          </View>
        </View>

        <View>
          <Text style={style.heading}>
            District <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View key={1}>
            <SelectList
              search={true}
              setSelected={val => {
                this.props.personalDetials({
                  district_ref_id: val,
                });

                // this.setState({district: val});
                this.setState({
                  locationData: {
                    ...this.state.locationData,
                    district: val,
                  },
                  isDistrictValid: true,
                });
                this.getTaluka(val);
              }}
              data={this.state.selectDistrictItems}
              dropdownStyles={{backgroundColor: '#fff'}}
              boxStyles={{
                backgroundColor: '#',
                borderColor: this.state.isDistrictValid ? 'black' : 'red',
                height: 50,
              }}
              dropdownTextStyles={{color: '#000'}}
              placeholder="Select"
              save="key"
              inputStyles={{color: 'gray', fontWeight: '600'}}
              defaultOption={this.state.valueD}
              
            />
          </View>
        </View>

        <View>
          <Text style={style.heading}>
            Taluka <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View key={1}>
            <SelectList
              search={true}
              setSelected={val => {
                this.props.personalDetials({
                  taluka_ref_id: val,
                });

                // this.setState({Taluka: val});
                this.setState({
                  locationData: {
                    ...this.state.locationData,
                    taluka: val,
                  },
                  isTalukaValid: true,
                });
                this.getVillage(val);
              }}
              data={this.state.selectTalukaItems}
              dropdownStyles={{backgroundColor: '#fff'}}
              boxStyles={{
                backgroundColor: '#',
                borderColor: this.state.isTalukaValid ? 'black' : 'red',
                height: 50,
              }}
              dropdownTextStyles={{color: '#000'}}
              placeholder="Select"
              save="key"
              inputStyles={{color: 'gray', fontWeight: '600'}}
              defaultOption={this.state.valueT}
              
            />
          </View>
        </View>

        <View>
          <Text style={style.heading}>
            Village <Text style={{color: 'red'}}>*</Text>
          </Text>
          <View key={1}>
            <SelectList
              search={true}
              setSelected={val => {
                this.props.personalDetials({
                  village_ref_id: val,
                });
                // this.setState({Village: val});
                this.setState({
                  locationData: {
                    ...this.state.locationData,
                    village: val,
                  },
                  isVillageValid: true,
                });
              }}
              data={this.state.selectVillageItems}
              dropdownStyles={{backgroundColor: '#fff'}}
              boxStyles={{
                backgroundColor: '#',
                borderColor: this.state.isVillageValid ? 'black' : 'red',
                height: 50,
              }}
              dropdownTextStyles={{color: '#000'}}
              placeholder="Select"
              save="key"
              inputStyles={{color: 'gray', fontWeight: '600'}}
              defaultOption={this.state.valueV}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log(
    'xxxxxxxxxxx',
    state.formReducer.personalDetailsState.country_ref_id,
  );
  return {
    country_ref_id: state.formReducer.personalDetailsState.country_ref_id,
    state_ref_id: state.formReducer.personalDetailsState.state_ref_id,
    district_ref_id: state.formReducer.personalDetailsState.district_ref_id,
    taluka_ref_id: state.formReducer.personalDetailsState.taluka_ref_id,
    village_ref_id: state.formReducer.personalDetailsState.village_ref_id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    personalDetials: value => {
      dispatch(personalDetailInputChange(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectCountrytoVillage);
const style = StyleSheet.create({
  heading: {
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: (constant.SCREEN_HEIGHT * 1.5) / 100,
    // margin: 5,
    color: 'black',
    fontWeight: '600',
  },
});
