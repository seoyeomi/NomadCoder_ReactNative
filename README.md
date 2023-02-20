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
