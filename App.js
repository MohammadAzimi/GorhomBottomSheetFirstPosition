import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomBottomSheet } from './src/CustomBottomSheet';
import { ListItem } from './src/ListItem';
import { getZoneList } from './src/Utils';

export default function App() {
  const [selectedZone, setSelectedZone] = useState(null);
  const bottomSheetRef = useRef(null);

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  }

  return (
    <GestureHandlerRootView style={styles.rootGesture}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {selectedZone ? <ListItem {...selectedZone}/> : <Text style={styles.infoText}>{'Press the bottom below and select a zone from list'}</Text>}
        <Pressable onPress={openBottomSheet} style={styles.button}>
          <Text style={styles.buttonText}>{'Open Bottom Sheet'}</Text>
        </Pressable>
        <CustomBottomSheet
          ref={bottomSheetRef}
          zoneList={getZoneList()} 
          selectedZone={selectedZone} 
          onZoneSelected={setSelectedZone}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootGesture:{
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E86D4'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 16,
  }
});
