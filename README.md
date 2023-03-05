### 1.7 Recap

<b>App</b>

- RN이 존재 - 그 안에 js 번역기가 존재 - 그 안에 js와 style이 존재
- RN은 bridge와 연결
- bridge는 OS와 연결

<b>ReactNative</b>

1. Not browser
2. interface
3. Native 부분에서 event감지-> ios,android가 bridge를 통해 js에게 message 전달-> js에서 코드를 실행하여 Native에게 message를 전달

<b>expo :</b>

1. 우리가 만들고 싶어하지 않는 인프라 시설(App의 전체적인 infra)을 대신 만들어서 제공해줌
2. javascript코드를 바꿀 수 있게 해줌

### 2.1 The Rules of Native

- React Native는 웹사이트가 아니므로(not HTML) div태그를 사용할 수 없다. 그 대신 View를 사용하는데, 이것은 container이다. (import해주어야 함)
- react native에 있는 모든 text는 text component에 들어가야 한다. (span,p태그를 사용할 수 없다.)
- 일부 style을 사용할 수 없다. (웹에서 가져올 수 없는 property가 존재한다.)

- style를 분리하기 위해 StyleSheet.create 등을 사용할 수 있다. (stylesheet.create는 자동완성 기능을 제공한다.)

* status-bar는 제 3자 패키지로서 import하지 않는다.

### 2.2 React Native Packages

- React Native는 모든 Components를 지원하지 않는다.(bugs etc..) -> instead, RN & Components & APIs의 규모를 줄였다.

### 2.3 Third Party Packages

- View : components가 화면에 렌더링 된다.
- StatusBar : 화면에 렌더링 된다.
  > expo에서도 status-bar를 제공하고, react native에서도 status-bar를 제공한다.  
  > RN에서는 독립적으로 지원해주기 않으므로 expo에서 지원하는 status-bar를 사용한다(expo는 우리에게 필요한 packages를 제공해준다).

### 2.4 Layout System

목표: React Native's layout System 정복하기

<b>기본적으로 모든 View는 Flex Container이다.</b>
<b>React Native에서 Flex Direction의 기본값은 Column이다.(웹의 경우 row가 기본)</b>

+, height와 width를 이용해서 layout을 만들지 않는다.

```js
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 3, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
    </View>
  );
}
```

다음과 같이 부모요소에 flex:1 이라는 기준을 주어야 이를 기준으로 자식요소의 비율을 조정할 수 있다.

### 2.5 Styles

```js
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 70,
    fontWeight: "500",
  },
  weather: {
    flex: 3,
  },
  day: {
    flex: 1,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 150,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
```

재밌다ㅎㅎ  
_View 및 Text 태그 안에 style요소를 추가하고, style은 stylesheet로 따로 작성해준다._

### 2.6 Styles part Two

ScrollView를 사용하는 방법에 대해서 배움  
-> ScrollView를 import하고, View태그가 아닌 ScrollView로 수정해줌.

ScrollView를 사용할 때, ScrollView의 Style을 만들고 싶다면 Style prop을 사용하는 것이 아니라 Container Style을 사용해야 한다.

ScrollView에서는 Flex 사이즈를 줄 필요가 없다.

dimensions을 import함으로써 핸드폰 스크린의 사이즈를 가져온다.
ex. ` import {Dimensions} from "react-native";` ` const {width: SCREEN_WIDTH} = Dimensions.get("window");`

ScrollView에 paingEnabled, horizontal, showHorizontalScrollIndicator, indicatorStyle 속성을 추가함.

### 2.8 Weather

### 2.9 Recap

1. getWrather이라는 function을 만들었다. component가 mount되면 이 function을 호출한다.  
   -> 이 function은 유저로부터 location을 받기를 요청한다.
2. 3개의 state를 만들었다.
3. 유저로부터 locaiton에 대한 접근을 허락받으면 유저의 현재 위치를 알 수 있다.(위도&경도)
4. reverseGeocode 함수를 통해 위도&경도를 가지고 주소를 알려준다.
5. reverseGeocode 함수를 통해 알아낸 주소를 setCity로 설정해준다.
6. API를 가져오기 전, API key를 가져와 작성해주고 이후에 받은 응답을 통해 정보를 가지고 온다.
7. 설정해놓은 array가 비어 있는 경우에 ActivityIndicator가 나오도록 만들어준다.
   > array가 비어있지 않다면, 컴포넌트를 return한다.

- toFixed(1) : 소수점 첫째자리까지 보여주고 싶을 때 사용

### 2.10 Icons

아이콘을 사용하기 위해서 icon패밀리를 import해야 한다.
json에 들어있는 값(날씨)과 일치하는 아이콘을 찾아 매칭해준다.  
ex)

```const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
};
```

### 3.0 Introduction

배울 내용: RN에서 버튼 클릭을 다루는 법& 어플에 data를 input하는 법& text input, text input에서 키보드 제어방법& 웹에서 사용하는 React와 RN에서 input이 어떻게 다른지 & data를 유지하는 방법 & RN에서 state변경하기, ToDo지우기 등..

### 3.1 Touchables

1. colors.js 파일을 새로 생성하여 theme object를 만들어 준다.
2. opactiy(투명도): TouchableOpacity를 import하여 터치 시에 애니메이션이 들어갈 수 있도록 한다.

- TouchableHighlight : 비슷하나 더 많은 속성을 가짐(+요소를 클릭 했을 때 배경색이 바뀌도록 해준다.)
  더불어 TouchableHighlight는 <b>underlayColor를 설정해야 하기 때문에</b>TouchableOpacity와는 다르다.
- TouchableWithoutFeedback : Touchable 컴포넌트로, 화면의 가장 위에서 일어나는 이벤트를 탭 이벤트를 listen한다. -> But UI 변화 없음.
- pressable: TouchableWithoutFeedback과 같지만 속성이 더욱 많으며 "new" 하다.

3. hitSlope:요소 바깥 어디까지 탭 누르는 것을 감지할지 정한다.

[comment를 통한 정리](https://docs.expo.dev/versions/v44.0.0/react-native/pressable/)

### 3.2 TextInput

1. [keyboardType을 줄 수 있다.](https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/) (다양한 속성을 설정할 수 있다.)

### 3.3 To Dos (Text저장) --- 헷갈리는 강의.

- Text를 입력하고 완료를 누르면 Text 입력란이 공란이 된다.

- toDo를 만들고 array를 사용하는 대신, hashmap과 같은 object를 만든다.

- remind 💦 : ReactJS에서는 상태를 직접 수정하지 않는다. 그 대신 set~ 과 같은 함수를 사용하여 state를 수정하도록 한다.

- object assign은 object를 가져다가 가른 object와 합쳐준다.

_3개의 object를 결합하기 위해 object assign을 사용했다_

1. 비어있는 object 결합하기
2. 이전 todo를 새로운 todo와 합치기

```const newToDos = Object.assign({}, toDos, {
      [Date.now()]: { text, work: working },
    });
```

[Hash Table](https://www.youtube.com/watch?v=HraOg7W3VAM)

### 3.5 Persist

- ScrollView를 import하였고 이 태그 안에서 Object.keys 사용으로 toDos 목록을 보여준다.
- expo -> AsyncStorage module을 가지고 있다. 따라서 설치 후 import를 해준다.
- JSON.stringify : object를 string으로 바꿔준다.
- parse : string을 Javascript object로 만들어준다.
- <b>실제 앱으로 만들 경우, 항상 try catch문을 사용하는 것이 매우 중요하다</b>

<잘 모르겠는 개념:await, async, object, ..., then >

---

[개념정리]  
`동기(Synchronous)`: 순서가 존재
-> func1, func2가 존재한다면 func1이 실행종료된 후에 func2가 실행된다는 의미인데 이는 `blocking`에 의해 가능하다.  
`비동기(Asynchronous)`: 순서가 존재하지 않음
-> 함수나 메소드가 진행중이든 아니든 바로 실행한다.

참고로 함수나 메소드가 종료되면 그 결과 값을 callback()함수에 넣어주는데, 이후 다른 메소드에서 그 결과값을 필요로 할 경우 callback()함수를 호출한다.

그래서 이 동기/비동기 개념, 즉 await&async 개념이 필요한이유는 <b>화면에서 서버로 데이터를 요청했을 때 서버가 언제 그 요청에 대한 응답을 보내줄 지 모르는 상태로 계속 기다릴 수 없기 때문</b>이다.

`Callback hell` : 웹 서비스를 개발하는 중에 서버에서 data를 받아와 화면에 표시하기까지 인코딩, 사용자 인증 등을 처리해야 하는 경우가 있다. -> 모두 비동기로 처리할 시, callback 안에 callback을 계속 다는 형식으로 코드를 작성하게 된다.
이러한 코드는 가독성 저하 + 로직 변경이 어렵다.

> resolution: 1. Promise 2. Async

- async & await 기본문법

1. 함수 앞에 async라는 예약어를 붙인다.
2. 함수 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 await를 붙인다.

### 3.6 Delete (삭제 + Alert API)

- state는 절대 mutate하지 말 것!!!
- 삭제 버튼을 누르면, alert가 뜨도록 하고 싶은데 이 때 Alert를 import해주어야 한다. (->나의 경우 react-native가 아닌 react에 import해서 오류 발생함)
- Android의 경우 Alert.prompt가 존재하지 않으므로 Alert.alert(제목o 메세지o 버튼o)로 작성한다.
- 삭제 버튼을 누를 시 AlertButtonStyle을 줄 수도 있는데, style="destructive" 와 같이 작성하면 버튼글씨 색깔을 바꿀 수 있다.

```js
const delteToDo = async (key) => {
  Alert.alert("Delete To Do?", "Are u Sure?", [
    { text: "Cancel" },
    {
      text: "Delete",
      onPress: () => {
        const newToDos = { ...toDos }; //object 생성
        delete newToDos[key]; //object에서 key 삭제
        setToDos(newToDos);
        saveToDos(newToDos);
      },
    },
  ]);
};
```

다음과 같이 delete기능을 추가할 수 있다.
여기서 Alert 문구를 통해 텍스트를 띄우고, Delete 텍스트에 Onpress event가 감지될 시에 삭제가 된다.
+saveToDos(newToDos)를 통해 새로고침을 해도 이전 내용이 그대로 반영됨을 확인할 수 있다.

### 3.7 Recap

1. 💫 모든 요소의 시작은 header 에서부터 !!

TouchableOpacity 두 개가 존재함 -> Work와 Travel 를 구현

> TouchableOpacity : 애니메이션+멋진event가 있는 View
> onPress 속성을 사용함

2. 이후 const work ~, const travel ~을 통해 해당 글자를 눌렀을 때 true 또는 false로 설정하게 함
   -> working이 true냐 false냐에 따라 TextInput의 placeholder가 다르게 나타남.

3. TextInput의 나머지 속성들)  
   returnKeyType : return key의 type을 설정할 수 있도록 함
   onChangeText : text가 바뀔 때 실행되는 함수 (setText를 통해 text를 받아서 state에 text를 담아준다.)
   onSubmitEditing : 사용자가 done 버튼을 눌렀을 때 실행되는 함수(text가 비어있는 경우 즉 toDos가 empty이면 dont do anything / toDos에 text가 있으면 새로운 object를 만든다. _기존toDos에 담겨 있던 content와 stat에 새로 추가된 요소들을 결합해서 만들어줌_ )
   이 속성을 통해서 기존에 toDos가 존재한다면 새 toDos를 만들어주는데, text를 입력함과 동시에 working의 상태도 함께 set된다. !!!

4. ```js
   const saveToDos = async (toSave) => {
     await AsnyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
   };
   ```

   에서와 같이 saveToDos는 AsyncStorage를 사용하는데,웹에서 사용하는 local storage와 비슷함.
   이 단계에서는 error가 발생하는지 알려주어야 하는데, 핸드폰의 디스크에 접근하므로 await async 방법을 활용한다.

5. ScrollView : 스크롤 기능 제공
   > Object.keys() : key값들만 담긴 배열을 반환함(only key).

```js
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
```

Object.keys()에 먼저 담아놓은 toDos에 접근하고, map을 통해 key값의 배열을 확인한다.
각각의 key에서, 우리는 toDos 오브젝트에 접근하여 toDo의 working 값이 state의 working과 동일한지 파악한다.

TouchableOpacity속성에서 onPress function을 이용하여 toDo를 delete하고 key를 보내준다.

6. delteToDo()를 살펴보면 Alert가 존재하고, Text에 따라 보여지는 내용을 다르게 한다. ->기본적으로 callback을 정해주지 않으면 아무 일도 일어나지 않음.

   > Delete 버튼을 눌렀을 때에만(onPress) 이후 내용을 실행하도록 작성함.
   > toDos를 가지고 오고, delete하고, delete하고 난 toDos들을 setToDos를 통해 업데이트하고, save함!!

7. 애플리케이션이 재시작 되면, useEffect()를 통해 loadToDos()를 실행시키는데, 이를 호출함으로써 받아온 toDo들을 parse하여 오브젝트로 만듦. 

<JSON.stringify()는 자바스크립트 오브젝트를 받아 string으로 만들어준다.>
