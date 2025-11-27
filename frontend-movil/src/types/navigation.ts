import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

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
export type ProfileProps = RouteProp<RootStackParamList, 'Profile'>

export const API_URL = 'http://localhost:3003/';

