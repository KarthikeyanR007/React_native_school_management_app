/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';

// export const getUserClassID = async userID => {
//   try {
//     const userDoc = await firestore().collection('users').doc(userID).get();
//     return userDoc.data().classID;
//   } catch (error) {
//     console.error('Error fetching user class ID:', error);
//     return null;
//   }
// };

export const getSubjectsForClass = async classID => {
  try {
    const subjectsSnapshot = await firestore()
      .collection('classes')
      .doc(classID)
      .collection('subjects')
      .get();
    return subjectsSnapshot.docs.map(doc => doc.data().name);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};
