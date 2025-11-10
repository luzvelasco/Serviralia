import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs:undefined;
}

export type SplashProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type LoginProps = StackScreenProps<RootStackParamList, 'Login'>;

// export const API_URL = 'http://localhost:3000/api';