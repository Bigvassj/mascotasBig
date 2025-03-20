import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import AdminNavigator from "./AdminNavigator";
import UserNavigator from "./UserNavigator";

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    const { user } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {user ? (
                <Drawer.Navigator screenOptions={{ headerShown: false }}>
                    {user.role === "admin" ? (
                        <Drawer.Screen name="Admin" component={AdminNavigator} />
                    ) : (
                        <Drawer.Screen name="User" component={UserNavigator} />
                    )}
                </Drawer.Navigator>
            ) : (
                <LoginScreen />
            )}
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <MainNavigator />
        </AuthProvider>
    );
}
