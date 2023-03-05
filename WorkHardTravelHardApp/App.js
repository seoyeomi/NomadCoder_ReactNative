import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./colors";
import { Fontisto } from "@expo/vector-icons";
import AsnyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsnyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsnyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };
  useEffect(() => {
    loadToDos();
  }, []);
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const delteToDo = async (key) => {
    Alert.alert("Delete To Do?", "Are u Sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos }; //object 생성
          delete newToDos[key]; //object에서 key 삭제
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? "white" : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onChangeText={onChangeText}
        onSubmitEditing={addToDo}
        returnKeyType="done"
        value={text}
        autoCapitalize={"sentences"}
        placeholder={
          working ? "What do u have to do ?" : "Where do u wanna Go ? "
        }
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => delteToDo(key)}>
                <Fontisto name="trash" size={18} color={"white"} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    marginTop: 100,
    flexDirection: "row",
  },
  btnText: {
    fontSize: 35,
    fontWeight: "600",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    fontSize: 15,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
  },
});
