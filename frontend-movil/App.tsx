import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RootNavigator from "./src/navigation/RootStack";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { createContext, useState } from "react";

const Stack = createStackNavigator();

export const UserContext = createContext<any>(null);

export default function App() {
	const [user, setUser] = useState({
		"idUser": null,
		"firstName": null,
		"pfp": null
	})

	let [fontsLoaded] = useFonts({
		Inter_500Medium,
		Inter_400Regular,
		Inter_600SemiBold
	})

	console.log("Logged user:", user);
	
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</UserContext.Provider>
	)
}