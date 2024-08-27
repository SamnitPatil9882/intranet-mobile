import messaging from '@react-native-firebase/messaging';

export const getNotificationToken = async () => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    return "";
  }
};