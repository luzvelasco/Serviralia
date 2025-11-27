import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra as { apiUrl: string } | undefined;

if (!extra) {
  throw new Error("Expo extra.apiUrl is not defined");
}

export const API_URL = extra.apiUrl;
// export const API_URL = 'http://localhost:3003/';
// export const API_URL = 'http://192.168.1.72:3003/';


export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;
  Home: undefined;
  Search: { skillId: number };
  WorkerProfile: { workerId: number };
  Review: { workerId: number, workerSkills: string[]};
  WorkerSignup: undefined;
  ClientSignup: undefined;
  Profile: undefined;
}

export type SplashProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type LoginProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SearchProps = RouteProp<RootStackParamList, 'Search'>;
export type WorkerProfileProps = RouteProp<RootStackParamList, 'WorkerProfile'>
export type ReviewScreenRouteProp = RouteProp<RootStackParamList, 'Review'>;
export type ClientSignupProps = StackScreenProps<RootStackParamList, 'ClientSignup'>;
export type WorkerSignupProps = StackScreenProps<RootStackParamList, 'WorkerSignup'>;
export type ProfileProps = StackScreenProps<RootStackParamList, 'Profile'>

