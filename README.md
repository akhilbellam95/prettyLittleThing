# prettyLittleThing

Steps to run this project:

## Install dependencies:

```bash
$ yarn
```

Open terminal and run the following command to start the metro bundler:

## Run

```bash
# run in development mode
$ yarn start
```

Open a new terminal and run the following commands to run the app on Android/iOS:

### Build for Android

1. Build the Android app:

```bash
$ yarn android
```

If there is some connection issue between metro server and android emulator or device
then run the following command:

## Fix connection issue

```bash
$ adb reverse tcp:8081 tcp:8081
```

### Build for iOS

1. Install pods:

```bash
$ cd ios && pod install
```

2. Move back to the project root directory

3. Run the iOS app:

```bash
$ yarn ios
```

Alternatively we can open the file ios/prettyLittleThing.xcworkspace and click Run from xcode.

## Test

```bash
# unit tests
$ yarn test

# updates test snapshots
$ yarn test:update-snapshot

# generates test coverage
$ yarn test:coverage
```


## Known issue with xCode 14.3
In the log we see the following error:

Error: Unable to resolve module ./Libraries/Components/DatePicker/DatePickerIOS

https://stackoverflow.com/questions/75913909/react-native-error-unable-to-resolve-module-in-node-modules-react-native-inde