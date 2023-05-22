# The Noble Quran | Mi Band 7 (unofficial) APP

The Noble Quran app generator for Mi Band 7 (unofficial).

![Video](preview.gif)

### Preparation

* Use [Gadgetbridge](https://github.com/Freeyourgadget/Gadgetbridge) android app to protect your data and able to install custom apps like this The Noble Quran app.
* Pair your device [https://codeberg.org/Freeyourgadget/Gadgetbridge/wiki/Huami-Server-Pairing](https://codeberg.org/Freeyourgadget/Gadgetbridge/wiki/Huami-Server-Pairing)
* Install [ADB](https://stackoverflow.com/a/32314718/10985637) to be able to send files to the app or use any alternatives.
* Use [https://github.com/melianmiko/zmake](https://github.com/melianmiko/zmake) to compile the app. I do not suggest you download compiled version. Use this repository and compile by your self after checking the sourcecode.

### Using Compiled Versions

* Visit [releases](https://github.com/el-haqqani/quran-miband7/releases/tag/1.0.0) page to get BIN files. You can find separate BIN files for each surah as well as groups of surahs and one hand-picked release.

### Build

* Edit `.env` file to change paths and change `push` variable to `1` to automatically push the compiled bin file via adb
* `npm i --prefix app` to install required app packages
* `npm i` to install required generator packages
* `node_modules/.bin/grunt build:110` will compile the app with surah between 110th and 114th
* `node_modules/.bin/grunt build:110:112` will compile the app with surah between 110th and 112th
* `node_modules/.bin/grunt build:1,3,110` will compile the app with 1th, 3th, 10th, surah

### Donate

The donate qr code in the app opens [https://donate.quran.com/](https://donate.quran.com/). If you want to donate, please use this address.

قُلْ مَا سَأَلْتُكُم مِّنْ أَجْرٍۢ فَهُوَ لَكُمْ ۖ إِنْ أَجْرِىَ إِلَّا عَلَى ٱللَّهِ ۖ وَهُوَ عَلَىٰ كُلِّ شَىْءٍۢ شَهِيدٌۭ

Say, “If I had ever asked you for a reward, you could keep it. My reward is only from Allah. And He is a Witness over all things.” (34/47)

### Special Thanks

* [https://github.com/quran](https://github.com/quran) for The Noble Quran page image generations.
* [https://github.com/melianmiko/zmake](https://github.com/melianmiko/zmake) for zmake (Unofficial ZeppOS build tool)

### Contribute

Feel free to contribute to this repository.