import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import PetsListScreen from "../screens/user/PetsListScreen";
import PetDetailsScreen from "../screens/user/PetDetailsScreen";
import PetsFavScreen from "../screens/user/PetsFavScreen";

const PetsStack = createStackNavigator();

const PetsStackScreen = () => (
    <PetsStack.Navigator screenOptions={{ headerShown: true }}>
        <PetsStack.Screen
            name="PetsList"
            component={PetsListScreen}
            options={{ title: "Lista de Mascotas" }}
        />
        <PetsStack.Screen
            name="PetDetails"
            component={PetDetailsScreen}
            options={{ title: "Detalles de la Mascota" }}
        />
    </PetsStack.Navigator>
);

// Crear el Drawer Navigator
const Drawer = createDrawerNavigator();

const UserNavigator = () => (
    <Drawer.Navigator
        screenOptions={{
            headerShown: true,
            drawerActiveBackgroundColor: "rgba(26, 61, 125, 0.1)",
            drawerActiveTintColor: "#1A3D7D",
            drawerInactiveTintColor: "#666",
            drawerStyle: {
                backgroundColor: "#FFFFFF",
                width: 280,
            },
            headerStyle: {
                backgroundColor: "#FFFFFF",
                elevation: 3,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            headerTintColor: "#1A3D7D",
            drawerLabelStyle: {
                fontSize: 16,
                fontWeight: "500",
                marginLeft: -16,
            },
            drawerItemStyle: {
                borderRadius: 8,
                marginHorizontal: 8,
                marginVertical: 4,
            },
        }}
    >
        <Drawer.Screen
            name="Lista de mascotas"
            component={PetsStackScreen}
            options={{
                drawerIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
            }}
        />
        <Drawer.Screen
            name="Mascotas favoritas"
            component={PetsFavScreen}
            options={{
                drawerIcon: ({ color }) => <Feather name="heart" size={24} color={color} />,
            }}
        />
    </Drawer.Navigator>
);

export default UserNavigator;