/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Button,
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  Image,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

const UploadAndDisplayImage = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadFile = async () => {
    try {
      // Pick a file using Document Picker
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images], // You can specify different types based on your needs
      });

      // Set uploading to true
      setUploading(true);

      // Get the file URI and create a reference to Firebase Storage
      const fileUri =
        Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri;
      const fileName = res.name; // Use file name from the document picker
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

      Alert.alert('Upload Successful', `File ${fileName} uploaded!`);
    } catch (error) {
      console.error(error);
      Alert.alert('Upload Failed', error.message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <View>
      <Button title="Upload File" onPress={uploadFile} />
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      {uploading && <Text>Progress: {progress}%</Text>}
      {imageUrl ? (
        <>
          <Image
            source={{uri: imageUrl}}
            style={{width: 200, height: 200, marginTop: 20}}
          />
          <Text style={{color:'black',fontSize:25,fontWeight:'bold'}}>{imageUrl}</Text>
        </>
      ) : (<Text style={{color:'black',fontSize:25,fontWeight:'bold'}} >Not Get</Text>)}
    </View>
  );
};

export default UploadAndDisplayImage;
