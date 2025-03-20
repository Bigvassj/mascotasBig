import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FavoritesContext } from "../../context/FavoritesContext";

const PetDetailsScreen = ({ route, navigation }) => {
    const { pet } = route.params;
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const isFavorite = favorites.some((favPet) => favPet.id === pet.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(pet.id);
        } else {
            addFavorite(pet);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: pet.image }}
                style={styles.petImage}
                resizeMode="contain" 
            />
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>{pet.breed}</Text>
            <Text style={styles.petCharacteristics}>{pet.characteristics}</Text>
            <TouchableOpacity
                style={[styles.button, isFavorite ? styles.removeButton : styles.addButton]}
                onPress={toggleFavorite}
            >
                <Text style={styles.buttonText}>
                    {isFavorite ? "Eliminar de Favoritos" : "Añadir a Favoritos"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("PetsFavScreen")}
            >
                <Text style={styles.buttonText}>Ver Favoritos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fde3f8",
        flex: 1,
        padding: 20,
        alignItems: "center",
    },
    petImage: {
        width: "100%",
        height: 250,
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: "#ed42f5",
    },
    petName: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1E88E5",
        textAlign: "center",
        marginBottom: 8,
    },
    petBreed: {
        fontSize: 18,
        color: "#64B5F6",
        textAlign: "center",
        marginBottom: 5,
    },
    petCharacteristics: {
        fontSize: 16,
        color: "#455A64",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#1E88E5",
        padding: 12,
        borderRadius: 8,
        width: "80%",
        alignItems: "center",
        marginVertical: 8,
        shadowColor: "#0D47A1",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 3 },
    },
    addButton: {
        backgroundColor: "#43A047",
    },
    removeButton: {
        backgroundColor: "#E53935",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});


export default PetDetailsScreen;