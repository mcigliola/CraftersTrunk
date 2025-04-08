import { Pattern } from "../utils/types";

export type RootStackParamList = {
    Home: undefined;
    MainHome: undefined;
    VerifyLogin: undefined;
    Login: undefined;
    PatternSearch: { accessToken: string, currentPatterns?: Pattern[] };
    PatternDetail: { accessToken?: string, patternId: number };
    Library: undefined;
    Projects: undefined;
    ComingSoonScreen: undefined;
    Account: undefined;

};