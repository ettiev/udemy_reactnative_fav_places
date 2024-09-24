import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

function AllPlaces() {
    const isFocused = useIsFocused();
    const [loadedPlaces, setLoadedPlaces] = useState([])

    useEffect(() => {
        async function loadPlaces() {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }
        if (isFocused) {
            loadPlaces();
        } 
    }, [isFocused])
    
    return (
        <PlacesList places={loadedPlaces}/>
    )
}

export default AllPlaces;