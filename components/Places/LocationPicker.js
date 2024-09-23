import { useState } from "react";
// npx expo install expo-location
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { StyleSheet, View, Alert, Text, Image } from "react-native";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../util/location";


function LocationPicker() {
    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions(); // For Android and iOS
    
    async function verifyPermissions() {  // For Android and iOS
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app!');
            return false;
        }
        return true;    
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    function pickOnMapHandler() {

    }
    
    let locationPreview = <Text>No location available.</Text>
    if (pickedLocation) {
        locationUri = getMapPreview(pickedLocation.lat, pickedLocation.lng)
        console.log(locationUri);
        locationPreview = (
            <Image 
                style={styles.image}
                source={{ uri: locationUri }} 
            />    
        )
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                { locationPreview }
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>    
            </View>
        </View>    
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'    
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
});