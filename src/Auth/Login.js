/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as yup from 'yup';
import React from 'react';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signIn } from './firebaseService/authServices';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

export default function Login() {
  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight / 2;

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .email('Must be email')
      .min(3, 'Username must be at least 3 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSignUp = async (values, { resetForm }) => {
    try {
      const log = await signIn(values.username, values.password);

      resetForm();
      dispatch(setUser(values));
     if(log){
        if (values.username === 'admin@gmail.com') {
          navigation.navigate('AdminHome'); // Navigate to AdminHome
        } else {
          const input = values.username;
          const parts = input.split('@');
          const mail = parts[1];
          if(mail === 'nimatooz.com'){
            console.log('success');
            navigation.navigate('StaffHome');
          }else{
            navigation.navigate('DrawerNav');
          }
        }
      console.log('User signed in and navigated successfully!');
     }
    } catch (error) {
      console.log('Error creating user:', error);
      alert(error.message);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.keyboardAwareContainer}
          keyboardShouldPersistTaps="handled">
          <View style={[styles.imageContainer, { height: imageHeight }]}>
            <Image
              source={require('../components/assets/logo.png')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Welcome to NimatooZ</Text>
          </View>
          <Text style={styles.textstyle}>Sign In to NimatooZ</Text>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => handleSignUp(values, { resetForm })}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  cursorColor="black"
                  placeholderTextColor="#909497"
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  cursorColor="black"
                  placeholderTextColor="#909497"
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  errorText:{
    color:'red',
    marginLeft:17,
  },
  imageContainer: {
    backgroundColor: '#f2c98a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  imageText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#986923',
    marginBottom: 40,
  },
  textstyle: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 50,
  },
  keyboardAwareContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#e8eef0',
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: '30%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
