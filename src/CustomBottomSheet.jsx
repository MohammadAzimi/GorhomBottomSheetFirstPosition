import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { ListItem } from './ListItem';


const SNAP_POINTS = ['70%'];

export const CustomBottomSheet = forwardRef(({
    zoneList = [],
    selectedZone,
    onZoneSelected
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetRef = useRef(null);
    const flatListRef = useRef(null);

    const scrollToItem = () => {
        if (!selectedZone) return;
        if (zoneList.length < 1) return;
        const index = zoneList.findIndex(value => value.id === selectedZone?.id);
        flatListRef.current.scrollToIndex({
            animated: true,
            index: index,
        })
        console.log('scrollToItem called by index:' + index)
    }

    const handleSnapPress = (index = 0) => {
        bottomSheetRef.current.snapToIndex(index);
        scrollToItem();
    }

    const handleClosePress = () => {
        bottomSheetRef.current.snapToIndex(index);
    }

    // const handleOnChange = useCallback((index) => {
    //     if (index > -1) {
    //         setIsOpen(true);
    //     }
    //     else {
    //         setIsOpen(false);
    //     }
    // }, [])

    const renderItem = ({ item }) => {
        return (
            <ListItem
                {...item}
                onPress={() => onZoneSelected(item)}
                isSelected={item.id === selectedZone?.id}
            />
        )
    }

    const getItemLayout = (_, index) => (
        {
            length: ListItem.HEIGHT,
            offset: (ListItem.HEIGHT + ListItem.VERTICAL_SPACING) * index,
            index: index,
        }
    )

    useImperativeHandle(ref, () => ({
        open: handleSnapPress,
        close: handleClosePress,
        snapToIndex: handleSnapPress,
    }));

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={SNAP_POINTS}
            enableDismissOnClose={true}
            // onChange={handleOnChange}
            enablePanDownToClose={true}
            >
            <View style={{ backgroundColor: '#b2b2b2', alignItems: 'center', marginTop: 16 }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        textTransform: 'uppercase',
                        paddingStart: 10,
                    }}>
                    {'Select Zone'}
                </Text>
            </View>
            <BottomSheetFlatList
                ref={flatListRef}
                getItemLayout={getItemLayout}
                data={zoneList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
            />
        </BottomSheet>
    )
})

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    }
})