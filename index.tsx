import { registerRootComponent } from 'expo';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './app/navigation/DrawerNavigator';
import { PaperProvider } from 'react-native-paper';

export default function Index() {
    LogBox.ignoreLogs([
        'TRenderEngineProvider: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
        'MemoizedTNodeRenderer: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
        'TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
        'bound renderChildren: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    ]);

    return (
        <PaperProvider>
            <NavigationContainer>
                <DrawerNavigator />
            </NavigationContainer>
        </PaperProvider>
  );
}
registerRootComponent(Index);
