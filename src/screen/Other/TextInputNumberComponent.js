import {Text, View, StyleSheet, TextInput} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {EventRegister} from 'react-native-event-listeners';
import {
  bankDetailInputChange,
  personalDetailInputChange,
} from '../../redux/ExportAction';
import {
  BANK_DETAILS_CONSTANT,
  KYC_DETAILS_CONSTANT,
  LAND_DETAILS_CONSTANT,
  PERSONAL_DETAILS_CONSTANT,
  SCREEN_HEIGHT,
} from '../../constant/Constant';

class TextInputNumberComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question_text_label,
      value: props.storedValue,
      pageName: props.reducerName,
      isValid: true,
      validation: props.validation,
    };
  }

  componentDidMount() {
    if (this.state.pageName == PERSONAL_DETAILS_CONSTANT) {
      this.submitListener = EventRegister.addEventListener(
        PERSONAL_DETAILS_CONSTANT,
        () => {
          this.validationAndProcessing(PERSONAL_DETAILS_CONSTANT);
        },
      );
    } else if (this.state.pageName == BANK_DETAILS_CONSTANT) {
      this.submitListener = EventRegister.addEventListener(
        BANK_DETAILS_CONSTANT,
        () => {
          this.validationAndProcessing(BANK_DETAILS_CONSTANT);
        },
      );
    } else if (this.state.pageName == LAND_DETAILS_CONSTANT) {
      this.submitListener = EventRegister.addEventListener(
        LAND_DETAILS_CONSTANT,
        () => {
          this.validationAndProcessing(LAND_DETAILS_CONSTANT);
        },
      );
    } else if (this.state.pageName == KYC_DETAILS_CONSTANT) {
      this.submitListener = EventRegister.addEventListener(
        KYC_DETAILS_CONSTANT,
        () => {
          this.validationAndProcessing(KYC_DETAILS_CONSTANT);
        },
      );
    }
  }

  validationAndProcessing(pageName) {
    if (this.props.validation(this.state.value)) {
      this.setState({isValid: true});
      if (this.state.value != undefined) {
        let object = {
          [this.props.reducerKey]: this.state.value,
        };
        if (pageName == PERSONAL_DETAILS_CONSTANT) {
          this.props.personalDetials(object);
        } else if (pageName == BANK_DETAILS_CONSTANT) {
          this.props.bankDetailsChange(object);
        } else if (pageName == LAND_DETAILS_CONSTANT) {
          this.props.passedObjectToParent(object);
        } else if (pageName == KYC_DETAILS_CONSTANT) {
          this.props.passedObjectToParentKYCDetail(object);
        }
      }
    } else {
      this.setState({isValid: false});
    }
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.submitListener);
  }

  render() {
    return (
      <View style={this.props.style != undefined ? this.props.style : null}>
        <Text style={style.heading}>
          {this.state.question}{' '}
          {this.props.isRequire && <Text style={{color: 'red'}}>*</Text>}
        </Text>

        <TextInput
          style={[
            style.textInputStyle,
            {
              borderColor: this.state.isValid ? 'black' : 'red',
            },
          ]}
          value={this.state.value}
          keyboardType="numeric"
          onChangeText={input => {
            this.setState({isValid: true});
            this.setState({value: input});
          }}
          placeholderTextColor={'grey'}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    personalDetials: value => {
      dispatch(personalDetailInputChange(value));
    },
    bankDetailsChange: value => {
      dispatch(bankDetailInputChange(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(TextInputNumberComponent);

const style = StyleSheet.create({
  textInputStyle: {
    // marginHorizontal: 5,
    // marginVertical: 5,
    marginBottom: 10,
    padding: 10,
    color: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  heading: {
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: (SCREEN_HEIGHT * 1.5) / 100,
    // margin: 5,
    color: 'black',
    fontWeight: '600',
  },
});
