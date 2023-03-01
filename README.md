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

comment를 통한 정리: [https://docs.expo.dev/versions/v44.0.0/react-native/pressable/]

### 3.2 TextInput

1. keyboardType을 줄 수 있다. [https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/] (다양한 속성을 설정할 수 있다.)

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

(Hash Table)[https://www.youtube.com/watch?v=HraOg7W3VAM]
