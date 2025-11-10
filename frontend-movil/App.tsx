import { NavigationContainer } from "@react-navigation/native";
import Splash from "./src/screens/Splash";
import NavTab from "./src/navigation/NavTab";
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