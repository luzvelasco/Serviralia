import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RootNavigator from "./src/navigation/RootStack";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	)
}