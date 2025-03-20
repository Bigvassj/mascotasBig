import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, Modal, Button } from "react-native";

const EditPetsScreen = () => {
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [filter, setFilter] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPet, setCurrentPet] = useState(null);
    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState("");
    const [detalles, setDetalles] = useState("");

    useEffect(() => {
        fetchDogs();
        fetchCats();
    }, []);

    const fetchDogs = async () => {
        const response = await fetch("https://dog.ceo/api/breeds/image/random/10");
        const data = await response.json();
        const dogs = data.message.map((image, index) => ({
            id: `dog-${index}`,
            nombre: `Perro ${index + 1}`,
            imagen: image,
            detalles: "Amigable y juguetón",
        }));
        setPets((prevPets) => [...prevPets, ...dogs]);
        setFilteredPets((prevPets) => [...prevPets, ...dogs]);
    };

    const fetchCats = async () => {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
        const data = await response.json();
        const cats = data.map((cat, index) => ({
            id: `cat-${index}`,
            nombre: `Gato ${index + 1}`,
            imagen: cat.url,
            detalles: "Independiente y curioso",
        }));
        setPets((prevPets) => [...prevPets, ...cats]);
        setFilteredPets((prevPets) => [...prevPets, ...cats]);
    };

    const handleFilter = (text) => {
        setFilter(text);
        const filtered = pets.filter((pet) => pet.nombre.toLowerCase().includes(text.toLowerCase()));
        setFilteredPets(filtered);
    };

    const agregarMascota = () => {
        const nuevaMascota = {
            id: `mascota-${pets.length + 1}`,
            nombre,
            imagen,
            detalles,
        };
        setPets([...pets, nuevaMascota]);
        setFilteredPets([...filteredPets, nuevaMascota]);
        setModalVisible(false);
        limpiarFormulario();
    };

    const editarMascota = () => {
        const mascotasActualizadas = pets.map((pet) =>
            pet.id === currentPet.id ? { ...pet, nombre, imagen, detalles } : pet
        );
        setPets(mascotasActualizadas);
        setFilteredPets(mascotasActualizadas);
        setModalVisible(false);
        limpiarFormulario();
    };

    const eliminarMascota = (id) => {
        setPets(pets.filter((pet) => pet.id !== id));
        setFilteredPets(filteredPets.filter((pet) => pet.id !== id));
    };

    const abrirModal = (pet = null) => {
        if (pet) {
            setCurrentPet(pet);
            setNombre(pet.nombre);
            setImagen(pet.imagen);
            setDetalles(pet.detalles);
        } else {
            limpiarFormulario();
        }
        setModalVisible(true);
    };

    const limpiarFormulario = () => {
        setCurrentPet(null);
        setNombre("");
        setImagen("");
        setDetalles("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a el editor de mascotas</Text>
            

            {/* Lista de mascotas */}
            <FlatList
                data={filteredPets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.petCard}>
                        <Image source={{ uri: item.imagen }} style={styles.petImage} resizeMode="contain" />
                        <Text style={styles.petName}>{item.nombre}</Text>
                        <Text style={styles.petDetails}>{item.detalles}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.editButton]}
                                onPress={() => abrirModal(item)}
                            >
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton]}
                                onPress={() => eliminarMascota(item.id)}
                            >
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />

            {/* Botón flotante para agregar mascotas */}
            <TouchableOpacity style={styles.addButton} onPress={() => abrirModal()}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            {/* Modal para agregar/editar mascotas */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {currentPet ? "Editar Mascota" : "Agregar Mascota"}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="URL de la imagen"
                            value={imagen}
                            onChangeText={setImagen}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Detalles"
                            value={detalles}
                            onChangeText={setDetalles}
                            multiline
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#ff5722" />
                            <Button
                                title={currentPet ? "Guardar Cambios" : "Agregar"}
                                onPress={currentPet ? editarMascota : agregarMascota}
                                color="#1A3D7D"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


// Diseño mejorado
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fde3f8",
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000000",
        textAlign: "center",
    },
  
    petCard: {
        backgroundColor: "#fde3f8",
        padding: 15,
        marginBottom: 15,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#ed42f5",
        shadowColor: "#0D47A1",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        flex: 1,
        marginHorizontal: 8,
    },
    petImage: {
        width: "100%",
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
    },
    petName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0D47A1",
        textAlign: "center",
    },
    petDetails: {
        fontSize: 14,
        color: "#1565C0",
        textAlign: "center",
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    editButton: {
        backgroundColor: "#0017ff",
    },
    deleteButton: {
        backgroundColor: "#ff0000",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    addButton: {
        position: "absolute",
        bottom: 25,
        right: 25,
        backgroundColor: "#1E88E5",
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        padding: 25,
        borderRadius: 12,
        width: "85%",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#0D47A1",
        textAlign: "center",
    },
    input: {
        backgroundColor: "#F3F4F6",
        padding: 14,
        borderRadius: 6,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#64B5F6",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});


export default EditPetsScreen;