import {
  Text,
  View,
  Modal,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {EventRegister} from 'react-native-event-listeners';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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

class UploadDocumentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Indicator: false,
      value: props.storedValue,
      imageUpload: undefined,
      fileUpload: undefined,
      modalVisible: false,
      question: props.question_text_label,
      fileName: props.storedValue,
      pageName: props.reducerName,
      isValid: true,
      validation: props.validation,
    };
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

  componentWillUnmount() {
    EventRegister.removeEventListener(this.submitListener);
  }

  apiCallFormData = async () => {
    this.setState({Indicator: true});
    const fileToUpload = this.state.fileUpload;
    const imageToUpload = this.state.imageUpload;
    const data = new FormData();

    if (imageToUpload != undefined) {
      data.append('uploadedFile', imageToUpload);
      data.append('folder_name', 'fpcuploads');
    }
    if (fileToUpload != undefined) {
      var Documentx = {
        name: fileToUpload.name,
        uri: fileToUpload.uri,
        type: fileToUpload.type,
      };
      data.append('folder_name', 'fpcuploads');
      data.append('uploadedFile', Documentx);
    }

    console.log('uploadFormData-->', JSON.stringify(data));

    fetch('https://inputprod.agdi.in/api/fileuploadurl/', {
      // fetch('https://inputprod.agdi.in:8001/fileuploadurl/', {
      // fetch('https://inputdev.agdi.in:8000/fileuploadurl/', {
      method: 'POST',
      body: data,

      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('accessToken')),
      },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({Indicator: false});
        this.setState({isValid: true});
        console.log(json);
        this.setState({value: json.s3_file_path});
      })
      .catch(err => {
        console.log('errr', err);
        this.setState({Indicator: false});
      });
  };

  async Upload() {
    try {
      const documentx = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.docx,
          DocumentPicker.types.pdf,
          // DocumentPicker.types.images,
        ],
      });

      this.setState({fileUpload: documentx});
      this.setState({imageUpload: undefined});
      this.setState({fileName: documentx.name});
      this.setState({modalVisible: false});
      console.log('------------------->', documentx);
      this.apiCallFormData();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  }

  async OpenCamara() {
    const result = await launchCamera(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      //  else if (response.fileSize > 5242880) {
      //   Alert.alert(
      //     "Nilamhut Say's",
      //     'Oops! the photos are too big. Max photo size is 4MB per photo. Please reduce the resolution or file size and retry',
      //     [{text: 'OK', onPress: () => console.log('ok Pressed')}],
      //     {cancelable: false},
      //   );
      // }
    });

    console.log('------------------->', result);
    if (!result.didCancel) {
      this.setState({
        imageUpload: {
          name: result.assets[0].fileName,
          type: result.assets[0].type,
          uri: result.assets[0].uri,
        },
      });
      this.setState({fileName: result.assets[0].fileName});
      this.setState({modalVisible: false});
      this.setState({fileUpload: undefined});
      this.apiCallFormData();
    }
  }

  async OpenGallary() {
    let options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options, response => {
      console.log('Gallery Opened response', JSON.stringify(response, null, 2));
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      //  else if (response.fileSize > 5242880) {
      //   Alert.alert(
      //     "Nilamhut Say's",
      //     'Oops! the photos are too big. Max photo size is 4MB per photo. Please reduce the resolution or file size and retry',
      //     [{text: 'OK', onPress: () => console.log('ok Pressed')}],
      //     {cancelable: false},
      //   );
      // }
      else {
        this.setState({
          imageUpload: {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          },
        });
        this.setState({fileName: response.assets[0].fileName});
        this.setState({fileUpload: undefined});
        this.setState({modalVisible: false});
        // setTimeout(() => {
        this.apiCallFormData();
        // }, 3000);
      }
    });
  }

  render() {
    return (
      <View>
        <Modal
          // animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  // marginBottom:10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontSize: 15,
                  padding: 10,
                  color: 'black',
                  alignSelf: 'center',
                  textDecorationLine: 'underline',
                }}>
                Upload Document via
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingTop: 15,
                  padding: 15,
                }}>
                <Pressable
                  onPress={() => {
                    this.OpenCamara();
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="camera" color="black" size={35} />
                    <Text style={styles.modalText}>Open Camara</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    this.OpenGallary();
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="image" color="black" size={35} />

                    <Text style={styles.modalText}>Gallary Image</Text>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    this.Upload();
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="file" color="black" size={35} />
                    <Text style={styles.modalText}>File Manager </Text>
                  </View>
                </Pressable>
              </View>

              <Pressable
                style={styles.button}
                onPress={() => this.setState({modalVisible: false})}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={{flex: 1}}>
          {this.state.Indicator ? (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={{color: 'red', alignSelf: 'center'}}>
                Please Wait ...
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: (SCREEN_HEIGHT * 1.5) / 100,
                  margin: 5,
                  color: 'black',
                  fontWeight: '600',
                }}>
                {this.state.question}
                {this.props.isRequire && <Text style={{color: 'red'}}>*</Text>}
              </Text>
              <Pressable
                onPress={() => {
                  this.setState({modalVisible: true});
                }}>
                <Text
                  style={{
                    padding: 15,
                    color: 'black',
                    borderWidth: 1,
                    borderColor: this.state.isValid ? 'black' : 'red',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginBottom: 10,

                    // height: (Dimensions.get('screen').height * 6) / 100,
                  }}>
                  {this.state.fileName != null
                    ? this.state.fileName
                    : 'Click To Upload'}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
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

export default connect(null, mapDispatchToProps)(UploadDocumentComponent);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(52,52,52,0.6)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    borderBottomWidth: 2,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    // elevation: 2,
    backgroundColor: 'green',
    // alignItems: 'baseline',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  modalText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 90,
    fontSize: 12,
  },
});
