/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';

export default function AdminHome({ navigation }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [user, setUser] = useState(null); // Changed to a single object instead of array

  const uploadFile = async () => {
    try {
      // Pick a file using Document Picker
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      // Set uploading to true
      setUploading(true);

      // Get the file URI and create a reference to Firebase Storage
      const fileUri =
        Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri;
      const fileName = res.name;
      const reference = storage().ref(fileName);

      // Upload the file
      const task = reference.putFile(fileUri);

      // Monitor the upload progress
      task.on('state_changed', snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(progress);
      });

      // Handle completion
      await task;

      // Get the download URL of the uploaded image
      const url = await reference.getDownloadURL();
      setImageUrl(url);

      // Save the URL in Firestore under /admin/admin1
      await firestore().collection('admin').doc('admin1').set({
        imageUrl: url,
      }, { merge: true });

      Alert.alert('Upload Successful', `File ${fileName} uploaded and URL saved!`);
    } catch (error) {
      console.error(error);
      Alert.alert('Upload Failed', error.message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const doc = await firestore().collection('admin').doc('admin1').get();

        if (!doc.exists) {
          console.log('No document found');
          return;
        }

        setUser(doc.data());
        //console.log(user);
      } catch (e) {
        console.log('Error', e);
      }
    };

    fetchUser();
  }, []);

  const handleStudentAdd = () => {
    navigation.navigate('Addstudent');
  };

  const handleStaffAdd = () => {
    navigation.navigate('AddStaff');
  };

  const handleAnnounce = () => {
    navigation.navigate('Announcement');
  };

  const handleTimeTableAdd = () => {
    navigation.navigate('AddTimeTable');
  };

  const handleStaffTimetable = () => {
    navigation.navigate('StaffTimeTable');
  };

  const handleImg = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0b27a' }}>
      <View style={styles.MainContainer}>
        <View style={styles.userDatailContainer}>
          <TouchableOpacity style={styles.userImage} onPress={uploadFile}>
            {uploading ? (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>{progress}%</Text>
            ) : (
              user?.imageUrl ? (
                <Image
                  style={styles.userImage1}
                  source={{ uri: user.imageUrl }}
                />
              ) : (
                <Text>No Image Available</Text>
              )
            )}
          </TouchableOpacity>
          <Text style={styles.userText}>Admin</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.container1Row1}>
            <View style={styles.container1Box1}>
              <TouchableOpacity onPress={handleStudentAdd} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/school.png')} style={{}} />
                <Text style={{ color: 'black' }}>Student Add</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container1Box2}>
              <TouchableOpacity onPress={handleStaffAdd} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/teamwork.png')} style={{}} />
                <Text style={{ color: 'black' }}>Staff Add</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container1Box3}>
              <TouchableOpacity onPress={handleTimeTableAdd} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/study-time.png')} style={{}} />
                <Text style={{ color: 'black' }}>Time Table</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container1Row2}>
            <View style={styles.container1Box1}>
              <TouchableOpacity onPress={handleAnnounce}>
                <Image source={require('../assets/megaphone.png')} style={{}} />
                <Text style={{ color: 'black' }}>Announce</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container2Box2}>
              <TouchableOpacity onPress={handleStaffTimetable}>
                <Image source={require('../assets/stafftimetable.png')} style={{}} />
                <Text style={{ color: 'black' }}>Staff Table</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.container2Box2}>
              <TouchableOpacity onPress={handleImg}>
                <Image source={require('../assets/stafftimetable.png')} style={{}} />
                <Text style={{ color: 'black' }}>Photo</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userDatailContainer: {
    marginTop: 30,
    height: 100,
    width: 310,
    backgroundColor: '#e67e22',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
  },
  userImage: {
    height: 64,
    width: 64,
    marginLeft: 20,
    borderRadius: 50,
    borderWidth: 2,
  },
  userImage1: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#17202a',
    marginLeft: 60,
  },
  container: {
    width: '90%',
    height: 500,
    marginTop: 20,
    borderRadius: 20,
  },
  container1Row1: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container1Row2: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 20,
  },
  container1Box1: {
    height: 100,
    width: 80,
    backgroundColor: '#e67e22',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
  },
  container1Box2: {
    height: 100,
    width: 80,
    backgroundColor: '#e67e22',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
  },
  container2Box2: {
    height: 100,
    width: 80,
    backgroundColor: '#e67e22',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
    marginLeft: 22,
  },
  container1Box3: {
    height: 100,
    width: 80,
    backgroundColor: '#e67e22',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
  },
});
