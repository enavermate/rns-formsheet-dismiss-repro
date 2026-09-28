# react-native-screens: Android form sheet loses its content during the dismiss animation

Minimal reproducer. It uses only `@react-navigation/native-stack` and `react-native-screens`, with no router on top.

## Run

```sh
npm install
npx expo start --android
```

It runs in Expo Go (SDK 57, `react-native-screens` 4.26.2).

## Steps

1. On an Android device or emulator, press **Open form sheet, close after 500 ms**.
2. Watch the sheet while it slides out.

**Expected:** the sheet keeps its gray background and blue rows until it is gone.

**Actual:** as the dismissal starts, the rows and the background disappear, and an empty sheet slides out. It does not happen on every run, because it depends on timing. On a slow emulator it happens most of the time, and more often when the sheet is closed before its enter animation has finished.
