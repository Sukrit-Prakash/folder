import { PermissionsAndroid, Platform } from 'react-native';

// Define permission types and their descriptions
export const PERMISSIONS = {
  INTERNET: {
    android: 'android.permission.INTERNET',
    description: 'Required for secure communication with servers',
  },
  NETWORK_STATE: {
    android: 'android.permission.ACCESS_NETWORK_STATE',
    description: 'Required to check network connectivity status',
  },
};

// Check if a permission is granted
export const checkPermission = async (permission) => {
  if (Platform.OS !== 'android') return true;
  
  try {
    const granted = await PermissionsAndroid.check(permission.android);
    return granted;
  } catch (err) {
    console.warn('Error checking permission:', err);
    return false;
  }
};

// Request a permission with explanation
export const requestPermission = async (permission) => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      permission.android,
      {
        title: 'Permission Required',
        message: permission.description,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Error requesting permission:', err);
    return false;
  }
};

// Check and request multiple permissions
export const checkAndRequestPermissions = async (permissions) => {
  const results = {};
  
  for (const permission of permissions) {
    const isGranted = await checkPermission(permission);
    if (!isGranted) {
      results[permission.android] = await requestPermission(permission);
    } else {
      results[permission.android] = true;
    }
  }
  
  return results;
};

// Handle permission denial gracefully
export const handlePermissionDenial = (permission, onDenied) => {
  if (Platform.OS === 'android') {
    Alert.alert(
      'Permission Required',
      `${permission.description}\n\nPlease enable this permission in your device settings to use this feature.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]
    );
  }
  
  if (onDenied) {
    onDenied();
  }
}; 