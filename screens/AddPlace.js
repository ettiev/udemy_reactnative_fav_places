// npm install @react-navigation/native
// npx expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/native-stack

import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
    async function createPlaceHandler(place) {
        await insertPlace(place);        
        navigation.navigate('AllPlaces');
    }
    
    return (
        <PlaceForm onCreatePlace={createPlaceHandler} />    
    )
}

export default AddPlace;