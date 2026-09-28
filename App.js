import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const ROWS = Array.from({ length: 10 }, (_, index) => index);

function Home({ navigation }) {
  return (
    <View style={styles.home}>
      <Text style={styles.instructions}>
        Open the form sheet and let it close. The sheet should keep its gray
        background and blue rows while it slides out. On Android, an empty sheet
        slides out instead.
      </Text>
      <Button
        title="Open form sheet"
        onPress={() => navigation.navigate('FormSheet', {})}
      />
      <Button
        title="Open form sheet, close after 500 ms"
        onPress={() => navigation.navigate('FormSheet', { closeAfterMs: 500 })}
      />
      <Button
        title="Open form sheet, close while it enters"
        onPress={() => navigation.navigate('FormSheet', { closeAfterMs: 100 })}
      />
    </View>
  );
}

function FormSheet({ navigation, route }) {
  const { closeAfterMs } = route.params;

  useEffect(() => {
    if (closeAfterMs === undefined) {
      return;
    }
    const timeout = setTimeout(() => navigation.goBack(), closeAfterMs);
    return () => clearTimeout(timeout);
  }, [closeAfterMs, navigation]);

  return (
    <View style={styles.sheet}>
      <Button title="Close" onPress={() => navigation.goBack()} />
      {ROWS.map((row) => (
        <View key={row} style={styles.row}>
          <Text>Row {row}</Text>
        </View>
      ))}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="FormSheet"
          component={FormSheet}
          options={{ presentation: 'formSheet' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  home: { flex: 1, justifyContent: 'center', padding: 16, gap: 16 },
  instructions: { fontSize: 16 },
  sheet: { flex: 1, backgroundColor: 'gray' },
  row: {
    height: 50,
    marginVertical: 5,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'lightblue',
  },
});
