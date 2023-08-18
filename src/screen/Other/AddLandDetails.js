import React, {Component} from 'react';
import {ScrollView} from 'react-native-virtualized-view';
import {Text, View, TouchableOpacity} from 'react-native';
import LandDetailsComponent from '../Other/LandDetailsComponent';
import {clearKycDetails} from '../../redux/ExportAction';
import {connect} from 'react-redux';

class AddLandDetials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentObjects: [],
      totalLandDetails: 0,
      totalValidCards: 0,
    };
    this.totalValidCardFunction = this.totalValidCardFunction.bind(this);
    this.emptyValidCardFunction = this.emptyValidCardFunction.bind(this);
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // console.log('CultivationPropsssss------------->', this.props.storedLandDetailValues);
      var array = [];
      this.props.storedLandDetailValues
        .map((item, index) => {
          // this.setState({totalValidCards:index});
          array.push(
            <LandDetailsComponent
              storeValuesRedux={item}
              totalValidCardFunction={this.totalValidCardFunction}
              emptyValidCardFunction={this.emptyValidCardFunction}
              moveOnWithoutValidation={this.moveOnWithoutValidation}
              key={index + 1}
              index={index + 1}
            />,
          );

          this.setState({
            componentObjects: array,
            totalLandDetails: index + 1,
          });
        })
        .reverse();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  totalValidCardFunction() {
    this.setState({totalValidCards: this.state.totalValidCards++});
    console.log(
      'Total Valid Land Detials Cards-->' + this.state.totalValidCards,
    );

    if (this.state.totalLandDetails == this.state.totalValidCards) {
      console.log('All Documnts Valid Land Detail');
      this.props.navigation.navigate('SubmitForm');
    }

    console.log('Total Cards-->', this.state.totalLandDetails);
  }

  emptyValidCardFunction() {
    // this.setState({totalValidCards: 0});
  }
  // componentDidMount(){
  //   for(let i = 0 ; i <= this.state.totalLandDetails; i++){}
  // }

  addComponent() {
    var array = [...this.state.componentObjects];
    array.push(
      <LandDetailsComponent
        storeValuesRedux={''}
        totalValidCardFunction={this.totalValidCardFunction}
        emptyValidCardFunction={this.emptyValidCardFunction}
        key={this.state.componentObjects.length + 1}
        index={this.state.componentObjects.length + 1}
      />,
    );

    this.setState({
      componentObjects: array,
      // componentObjects: this.state.componentObjects.concat(
      //   <LandDetailsComponent
      //     key={this.state.componentObjects.length + 1}
      //     index={this.state.componentObjects.length + 1}
      //   />,
      // ),
      totalLandDetails: this.state.componentObjects.length + 1,
    });
  }

  removeComponent() {
    var array = [...this.state.componentObjects];
    array.splice(array.length - 1, 1);
    this.setState({totalValidCards: --this.state.totalValidCards});
    this.setState({
      componentObjects: array,
      totalLandDetails: array.length,
    });
  }

  print() {
    console.log(
      'this.state.componentObjects-->' +
        JSON.stringify(this.state.componentObjects, null, 2),
    );
  }

  render() {
    return (
      <View style={{marginBottom: 50}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('Add Pressed');
              this.addComponent();
            }}
            style={{
              flex: 1,
              padding: 10,
              elevation: 1,
              borderRadius: 20,
              alignItems: 'center',
              borderColor: 'black',
            }}>
            <Text style={{color: 'black'}}>Add</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black'}}>{this.state.totalLandDetails}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.removeComponent();
            }}
            style={{
              flex: 1,
              padding: 10,
              elevation: 1,
              borderRadius: 20,
              alignItems: 'center',
              borderColor: 'black',
            }}>
            <Text style={{color: 'black'}}>Remove</Text>
          </TouchableOpacity>
        </View>

        {this.state.componentObjects.length > 0 ? (
          <ScrollView>
            {this.state.componentObjects
              .map(item => {
                return item;
              })
              .reverse()}
          </ScrollView>
        ) : (
          <View style={{padding: 20}}>
            <Text style={{color: 'black'}}>Press Add to add Land Detials</Text>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    storedLandDetailValues: state.formReducer.landDetailsState,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearRedux: () => {
      // dispatch(clearKycDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLandDetials);
