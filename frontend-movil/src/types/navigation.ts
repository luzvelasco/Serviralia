import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs:undefined;
  Home: undefined;
  Search: { skillId: number}
}

export type SplashProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type LoginProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SearchProps = RouteProp<RootStackParamList, 'Search'>;

export const API_URL = 'http://localhost:3003/';

