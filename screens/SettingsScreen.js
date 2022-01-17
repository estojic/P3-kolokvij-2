import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

export function SettingsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://api.sampleapis.com/presidents/presidents"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  function handleSettingsPress() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.screen}>
      <Button title="Go to the Home screen!" onPress={handleSettingsPress} color={"#808080"} />
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                <View style={styles.item}>
                  <View style={styles.image}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `${item.photo}`,
                      }}
                    />
                  </View>
                  <View style={styles.text}>
                    <Text style={styles.textSpecific}>Ordinal: {item.ordinal}</Text>
                    <Text style={styles.textSpecific}>Name: {item.name}</Text>
                    <Text style={styles.textSpecific}>Years in Office: {item.yearsInOffice}</Text>
                    <Text style={styles.textSpecific}>Vice Presidents: {item.vicePresidents}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  itemWrapper: {
    backgroundColor:"#282828" 
  },
  item: {
    flexDirection: "row",
    margin: 10,
  },
  text: {
    width: 230,
  },
  textSpecific: {
    color: "#f6f6f6"
  },
});
