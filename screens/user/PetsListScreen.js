import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PetsListScreen = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filter, setFilter] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchDogs();
    fetchCats();
  }, []);

  const fetchDogs = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random/10");
    const data = await response.json();
    const dogs = data.message.map((image, index) => ({
      id: `dog-${index}`,
      image,
      name: `Dog ${index + 1}`,
      type: "dog",
      breed: "Mixed Breed",
      characteristics: "Friendly and loyal",
    }));
    setPets((prevPets) => [...prevPets, ...dogs]);
    setFilteredPets((prevPets) => [...prevPets, ...dogs]);
  };

  const fetchCats = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
    const data = await response.json();
    const cats = data.map((cat, index) => ({
      id: `cat-${index}`,
      image: cat.url,
      name: `Cat ${index + 1}`,
      type: "cat",
      breed: "Mixed Breed",
      characteristics: "Independent and curious",
    }));
    setPets((prevPets) => [...prevPets, ...cats]);
    setFilteredPets((prevPets) => [...prevPets, ...cats]);
  };

  const handleFilter = (text) => {
    setFilter(text);
    const filtered = pets.filter((pet) => pet.breed.toLowerCase().includes(text.toLowerCase()));
    setFilteredPets(filtered);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Mascotas Disponibles</Text>
       
        <FlatList
            data={filteredPets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.petCard}
                    onPress={() => navigation.navigate("PetDetails", { pet: item })}
                >
                  <Image
                      source={{ uri: item.image }}
                      style={styles.petImage}
                      resizeMode="contain" 
                  />
                  <Text style={styles.petName}>{item.name}</Text>
                  <Text style={styles.petBreed}>{item.breed}</Text>
                </TouchableOpacity>
            )}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fde3f8",
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000000",
    textAlign: "center",
  },
  
  petCard: {
    backgroundColor: "#fde3f8",
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ed42f5",
    shadowColor: "#0D47A1",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  petImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  petName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0D47A1",
    textAlign: "center",
  },
  petBreed: {
    fontSize: 14,
    color: "#1565C0",
    textAlign: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
});


export default PetsListScreen;