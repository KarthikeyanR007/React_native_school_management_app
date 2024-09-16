/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import FIRESTORE from '../../utils/firebaseConstants/';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

export default function Home({navigation}) {
  const [users, setUsers] = useState([]);
  const [userclass, setUserclass] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const user = useSelector(state => state.user.user);
  const userMail = user.username;

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

      // Fetch the user document based on email
      const userQuerySnapshot = await firestore()
        .collection('userInfo')
        .where('username', '==', userMail)
        .get();

      if (userQuerySnapshot.empty) {
        Alert.alert('Upload Failed', 'No matching user found.');
        return;
      }

      // Update the document for each matching user
      userQuerySnapshot.forEach(async doc => {
        await firestore().collection('userInfo')
          .doc(doc.id)
          .update({
            imageUrl: url,
          });
      });

      Alert.alert('Upload Successful', `File ${fileName} uploaded and URL saved!`);
    } catch (error) {
      console.error(error);
      Alert.alert('Upload Failed', error.message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };
  const handleLearning = () => {
    if (users.length > 0) {
      const classname = users[0].class;
      setUserclass(classname);
      if(userclass){
         console.log('user',userclass);
         navigation.navigate('Learning',{ classId : userclass });
      }
    } else {
      console.log('No users available.');
    }
  };


  const handleNews = () => {
    if (users.length > 0) {
       console.log('user',userclass);
       navigation.navigate('News');
    } else {
      console.log('No users available.');
    }
  };


  const handleTimetable = () => {
    if (users.length > 0) {
      const classname = users[0].class;
      setUserclass(classname);
      if(userclass){
         console.log('user',userclass);
         navigation.navigate('TimeTable',{ classId : userclass });
      }
    } else {
      console.log('No users available.');
    }
  };


  const handleMark = () => {
    if (users.length > 0) {
      const classname = users[0].class;
      const reg_no = users[0].Reg_no;
      const userImage = users[0].imageUrl;
      const Ad_num = users[0].Ad_num;
      setUserclass(classname);
      if(userclass){
         console.log('Reg',reg_no);
         console.log('user',userclass);
         navigation.navigate('GradeList',{ Reg_no : reg_no , classId : userclass , img : userImage , Adnum : Ad_num});
      }
    } else {
      console.log('No users available.');
    }
  };

  const handleAnnounce = () =>{
      navigation.navigate('AnnounceStudent');
  };

  const handleAssignment = () =>{
        if (users.length > 0) {
          const classname = users[0].class;
          const reg_no = users[0].Reg_no;
          setUserclass(classname);
          if(userclass){
            console.log('Reg',reg_no);
            console.log('user',userclass);
            navigation.navigate('AssignmentStud',{ classId : userclass });
          }
        } else {
          console.log('No users available.');
        }
      };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await firestore()
          .collection(FIRESTORE.collections.userInfo)
          .where('username', '==', userMail)
          .get();

        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        let usersList = [];
        snapshot.forEach(doc => {
          usersList.push({id: doc.id, ...doc.data()});
        });

        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userMail]);

  useEffect(() => {
    if (userclass) {
      console.log('Userclass State:', userclass);
    }
  }, [userclass]);

  return (
    <SafeAreaView>
      <View style={styles.MainContainer}>
        {users.map(user => (
          <View key={user.id}>
            <View style={styles.userDatailContainer}>
             <TouchableOpacity style={styles.userImage} onPress={uploadFile}>
                {uploading ? (
                  <Text style={{ textAlign: 'center', marginTop: 20 }}>{progress}%</Text>
                ) : (
                  user.imageUrl ? (
                    <Image
                      style={styles.userImage1}
                      source={{ uri: user.imageUrl }}
                    />
                  ) : (
                    <Text style={{ textAlign: 'center' }}>No Image Available</Text>
                  )
                )}
              </TouchableOpacity>
              <Text style={styles.userText}>User ID: {user.Reg_no}</Text>
            </View>
            <View style={styles.classDeatils}>
              <View style={styles.class}>
                <Text style={styles.classText}>Class</Text>
                <Text style={{fontSize:20,fontWeight:'600',color:'#b3b6b7'}}>{user.class}</Text>
              </View>
              <View style={styles.class}>
                <Text style={styles.classText}>Admission No</Text>
                <Text style={{fontSize:20,fontWeight:'600',color:'#b3b6b7'}}>{user.Ad_num}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.container1}>
          <Text style={styles.academics}>Academics</Text>
          <View style={styles.container1Box}>
            <View style={styles.container1Row1}>
              <View style={styles.container1Box1}>
                <TouchableOpacity onPress={handleLearning}>
                  <Image source={require('./assets/diary.png')} style={{}} />
                  <Text style={{color: 'black'}}>Learning</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={styles.container1Box2}>
                <Image source={require('./assets/home-work.png')} style={{}} />
                <Text style={{color: 'black'}}>Homework</Text>
              </View> */}
              <View style={styles.container1Box3}>
                 <TouchableOpacity onPress={handleTimetable}>
                    <Image source={require('./assets/study-time.png')} style={{}} />
                    <Text style={{color: 'black'}}>Time Table</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container1Box4}>
                <TouchableOpacity onPress={handleAssignment}>
                    <Image source={require('./assets/list.png')} style={{}} />
                    <Text style={{color: 'black'}}>Assignment</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container1Row1}>
              <View style={styles.container1Box1}>
                <TouchableOpacity onPress={handleNews}>
                  <Image source={require('./assets/news.png')} style={{}} />
                  <Text style={{color: 'black',textAlign:'center'}}>NEWS</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container1Box2}>
                <TouchableOpacity onPress={handleMark}>
                  <Image source={require('./assets/ExamResult.png')} style={{}} />
                  <Text style={{color: 'black'}}>Mark</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container1Box3}>
                 <TouchableOpacity onPress={handleAnnounce}>
                   <Image source={require('./assets/megaphone.png')} style={{}} />
                   <Text style={{color: 'black'}}>Announce</Text>
                 </TouchableOpacity>
              </View>
              {/* <View style={styles.container1Box4}>
                <Image source={require('./assets/list.png')} style={{}} />
                <Text style={{color: 'black'}}>Assignment</Text>
              </View> */}
            </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    height: 64,
    width: 64,
    marginLeft: 20,
    borderRadius: 50,
    borderWidth: 2,
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#17202a',
    marginLeft: 10,
  },
  userImage1: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  classDeatils: {
    height: 80,
    width: 310,
    backgroundColor: '#273746',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  class: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  classText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container1: {
    width: '100%',
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: '#ebf5fb',
  },
  academics: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  container1Box: {
    marginTop: 10,
    height: '60%',
  },
  container1Row1: {
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container1Box1: {
    height: 100,
    width: 80,
    backgroundColor: '#ffff',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
  },
  container1Box2: {
    height: 100,
    width: 80,
    backgroundColor: '#ffff',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
  },
  container1Box3: {
    height: 100,
    width: 80,
    backgroundColor: '#ffff',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
  },
  container1Box4: {
    height: 100,
    width: 80,
    backgroundColor: '#ffff',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
  },
});
