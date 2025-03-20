import React, { useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FavoritesContext } from "../../context/FavoritesContext";

const PetsFavScreen = () => {
    const { favorites } = useContext(FavoritesContext);

    const handleAdoptionRequest = (petId) => {
        alert(`Solicitud de adopción enviada para la mascota con ID: ${petId}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mascotas Favoritas</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.favoriteCard}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.favoriteImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.favoriteName}>{item.name}</Text>
                        <Text style={styles.favoriteBreed}>{item.breed}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleAdoptionRequest(item.id)}
                        >
                            <Text style={styles.buttonText}>Enviar Solicitud de Adopción</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fde3f8",
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000000",
        textAlign: "center",
    },
    favoriteCard: {
        backgroundColor: "#fde3f8",
        padding: 18,
        marginBottom: 15,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#ed42f5",
        shadowColor: "#0D47A1",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
    },
    favoriteImage: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: "#ed42f5",
    },
    favoriteName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1E88E5",
        textAlign: "center",
    },
    favoriteBreed: {
        fontSize: 16,
        color: "#1565C0",
        textAlign: "center",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#1E88E5",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#0D47A1",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default PetsFavScreen;