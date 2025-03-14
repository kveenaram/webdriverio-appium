Step1: Start the Appium Server
appium -p 4725 --allow-cors

Step2: Start Emulator in the Android Studio (Use Pixel to run) or Connect Physical Device
emulator -list-avds  

Step3: To run the Andriod based tests
npx wdio run wdio.conf.js --spec ./test/specs/android/login.spec.js

Step4: To run iOS bassed tests 
npm run wdioIos