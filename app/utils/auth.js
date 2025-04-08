import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';   
import { useEffect, useState, useRef } from 'react'; 



const CLIENT_ID = "1dd107f5c63e3c45e59f414686ca175b";
const CLIENT_SECRET = "H8Nc2J1FU_mPilQOKd5m72cJjq6duu_S91esZ89h";
const AUTHORIZATION_ENDPOINT = "https://www.ravelry.com/oauth2/auth";
const TOKEN_ENDPOINT = "https://www.ravelry.com/oauth2/token";
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: false });

export const useAuth = () => {
    const [authCode, setAuthCode] = useState(null);
    const[accessToken, setAccessToken] = useState(null);
    const generatedState = useRef(Math.random().toString(36).substring(2, 15)).current;
    console.log("Generated State:", generatedState);

    useEffect(() => {
        SecureStore.setItemAsync("oauth_state", generatedState);
        console.log("State stored in SecureStore:", generatedState);
    }, []);

    console.log("REDIRECT_URI:", REDIRECT_URI);
    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: CLIENT_ID,
            responseType: "code",
            scopes: ["offline"],
            redirectUri: REDIRECT_URI,
            state: generatedState,
        },
        { authorizationEndpoint: AUTHORIZATION_ENDPOINT }
    );

    useEffect(() => {
        const verifyAuth = async () => {
            console.log("useEffect triggered");
            console.log("Full OAuth response:", response); // Log entire response object

            if (!response || response.type !== "success") {
                console.log("No response or unsuccessful. Exiting useEffect.");
                return;
            }

            if (response.type === "cancel") {
                console.error("User cancelled authentication");
                return;
            }

            console.log("OAuth Success! Extracting authorization code...");
            const receivedCode = response.params.code;
            setAuthCode(receivedCode);
            console.log("Received Code:", receivedCode);


            try {
                const storedState = await SecureStore.getItemAsync("oauth_state");
                console.log("Stored State:", storedState);

                if (response.params.state !== storedState) {
                    console.error("State does not match");
                    return;
                }
                console.log("State matches, exchanging for token...");
                const accessToken = await exchangeAuthorizationCodeForToken(receivedCode);
                if (accessToken) {
                    setAccessToken(accessToken);
                } else {
                    console.error("Failed to exchange token");
                }
            } catch (error) {
                console.error("Failed to retrieve stored state:", error);
            }
        };

        if (response) {
            verifyAuth();
        }

    }, [response]);



    return {promptAsync, authCode, accessToken };
};

export const exchangeAuthorizationCodeForToken = async (authCode) => {
    console.log("Exchanging authorization code for token");
    if (!authCode) {
        console.error("No authorization code received");
        return null;
    }

    try {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
            },
            body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
        });

        const data = await response.json();

        if (data.access_token) {
            console.log("Token exchange successful");
            await SecureStore.setItemAsync("access_token", data.access_token);
            console.log("Stored Access Token:", data.access_token);
            if (data.refresh_token) {
                await SecureStore.setItemAsync("refresh_token", data.refresh_token);
                console.log("Stored Refresh Token:", data.refresh_token);
            }
            return data.access_token;
        } else {
            console.error("Token exchange failed");
            return null;
        }
    } catch (error) {
        console.error("Failed to exchange token:", error);
        return null;
    }
};

export const checkLoginStatus = async () => {
    console.log("Checking login status");
    const accessToken = await SecureStore.getItemAsync("access_token");
    const refreshToken = await SecureStore.getItemAsync("refresh_token");

    if (accessToken) {
        console.log("Access Token found");

        const isValid = await validateAccessToken(accessToken);
        if (isValid) {
            console.log("Access Token is valid");
            return accessToken;
        } else {
            console.log("Access Token is invalid. Attempting refresh.");
        }

        if (refreshToken) {
            console.log("Refresh Token found");
            const newAccessToken = await refreshAccessToken(refreshToken);
            if (newAccessToken) {
                console.log("Access Token refreshed successfully");
                return newAccessToken;
            } else {
                console.error("Failed to refresh token");
            }
        }

        console.log("No tokens found");
        return null;
    };
}

export const refreshAccessToken = async (refreshToken) => {
    console.log("Refreshing access token");

    try {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`
        });

        const data = await response.json();

        if (data.access_token) {
            console.log("Token refresh successful");
            await SecureStore.setItemAsync("access_token", data.access_token);
            return data.access_token;
        } else {
            console.error("Token refresh failed");
            return null;
        }
    } catch (error) {
        console.error("Failed to refresh token:", error);
        return null;
    }
};

const validateAccessToken = async (accessToken) => {
    console.log("Validating access token");
    try {
        const response = await fetch("https://api.ravelry.com/current_user.json", {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        });

        if (response.status === 200) {
            console.log("Access token is valid");
            return true;
        } else {
            console.error("Access token is invalid");
            return false;
        }
    } catch (error) {
        console.error("Failed to validate access token:", error);
        return false;
    }
};

export const logout = async () => {
    console.log("Logging out");
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    console.log("Tokens removed");
};