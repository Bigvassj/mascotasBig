import { createDrawerNavigator } from "@react-navigation/drawer";
import PetsListAdminScreen from "../screens/admin/PetsListAdminScreen";
import { Feather } from "@expo/vector-icons";
import EditPetsScreen from "../screens/admin/EditPetsScreen";

const Drawer = createDrawerNavigator();

const AdminNavigator = () => (
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
                marginLeft: -16
            },
            drawerItemStyle: {
                borderRadius: 8,
                marginHorizontal: 8,
                marginVertical: 4
            }
        }}
    >
        <Drawer.Screen
            name="Mascotas disponibles"
            component={PetsListAdminScreen}
            options={{
                drawerIcon: ({ color }) => <Feather name="box" size={24} color={color} />,
                title: "Mascotas disponibles"
            }}
        />
        <Drawer.Screen
            name="Editor mascotas"
            component={EditPetsScreen}
            options={{
                drawerIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
                title: "Editor mascotas"
            }}
        />
    </Drawer.Navigator>
);

export default AdminNavigator;