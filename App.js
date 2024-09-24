import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// npx expo install expo-splash-screen
import * as SplashScreen from 'expo-splash-screen';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  
  useEffect(() => {
    async function initHandler() {
      init();
      setDbInitialized(true);
      await SplashScreen.hideAsync();  
    }
    initHandler(); 
  }, [dbInitialized]);
  
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen 
            name="AllPlaces" 
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favourite Places',
              headerRight: 
              ({tintColor}) => <IconButton icon='add' 
              color={tintColor}
              size={24} 
              onPress={() => navigation.navigate('AddPlace')} 

            />
            })}
          />
          <Stack.Screen 
            name="AddPlace" 
            component={AddPlace}
            options={{
              title: 'Add a New Place'
            }}  
          />
          <Stack.Screen name="Map" component={Map}/>
          <Stack.Screen 
            name="PlaceDetails" 
            component={PlaceDetails}
            options={{
              title: "Loading place..."
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>  
    </>
    
  );
}

const styles = StyleSheet.create({
  
});
