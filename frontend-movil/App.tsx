import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RootNavigator from "./src/navigation/RootStack";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";

const Stack = createStackNavigator();

export default function App() {

	let [fontsLoaded] = useFonts({
		Inter_500Medium,
		Inter_400Regular,
		Inter_600SemiBold
	})

	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	)
}