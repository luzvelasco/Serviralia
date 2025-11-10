import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
}

export type SplashProps = StackScreenProps<RootStackParamList, 'Splash'>;

// export const API_URL = 'http://localhost:3000/api';