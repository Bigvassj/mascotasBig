import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import MainNavigator from "./navigation/AppNavigator";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <FavoritesProvider>
                    <MainNavigator />
                </FavoritesProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}