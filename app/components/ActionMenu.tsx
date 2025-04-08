import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import { Pattern } from '../utils/types';

type Props = {
    pattern: Pattern;
}
export default function ActionMenu({pattern }: Props) {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View >
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon="plus-circle-outline" size={30} iconColor="#fff" onPress={openMenu} />}
            >
                <Menu.Item onPress={() => console.log("Added to queue")} title="Add to Queue" />
                <Menu.Item onPress={() => console.log("Added to library")} title="Add to Library" />
                <Menu.Item onPress={() => console.log("Project started")} title="Cast On Project" />
                <Menu.Item onPress={() => console.log("Shared")} title="Share" />
            </Menu>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});