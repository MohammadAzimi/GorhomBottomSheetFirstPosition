import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const VERTICAL_SPACING = 16;
const IMAGE_SIZE = 80
const HEIGHT = IMAGE_SIZE + 2 * VERTICAL_SPACING ;

export const ListItem = ({ id, cityName, imageUrl, isSelected = false, onPress = () => {} }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.container, isSelected && styles.selectedItem]}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.nameContainer}>
                    <Text style={styles.cityText}>{cityName}</Text>
                    <Text>{id.slice(0, 10)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

ListItem.HEIGHT = HEIGHT;
ListItem.VERTICAL_SPACING = VERTICAL_SPACING;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: HEIGHT,
        paddingVertical: 16,
        paddingHorizontal: 8,
        marginBottom: 16,
        elevation: 4,
        backgroundColor: 'lightgray',
        borderRadius: 8,
        overflow: 'hidden',
    },
    nameContainer: {
        flex: 1,
        marginHorizontal: 8,
        justifyContent: 'space-around',
    },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        marginHorizontal: 8,
        borderRadius: 8
    },
    selectedItem: {
        backgroundColor: 'lightblue'
    },
    cityText: {
        fontSize: 20,
        fontWeight: '800',
    }
})