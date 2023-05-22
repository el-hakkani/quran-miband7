import { AppGesture } from "../lib/AppGesture";
import { t, extendLocale } from "../lib/i18n";
import { FsUtils } from "../lib/FsUtils";
import { db_path } from "./constants";
import { requested_surah_starting_indexes } from "./pages";
import { version } from "./version";

extendLocale({
  app_name: {
    "en-US": "The Noble Quran",
    "tr-TR": "Kur’an-ı Kerim",
    "ar-AR": "القرآن الكريم",
    "ru-RU": "Галерея",
  },
  action_uninstall: {
    "en-US": "Uninstall",
    "tr-TR": "Uygulamayı Kaldır",
    "ru-RU": "Удалить",
    "ar-AR": "إلغاء التثبيت",
  },
  tap_to_confirm: {
    "en-US": "Tap again to confirm",
    "tr-TR": "Onaylamak için tekrar dokun",
    "ru-RU": "Нажмите ещё раз для подтверждения",
    "ar-AR": "اضغط مرة أخرى للتأكيد",
  },
  uninstall_complete: {
    "en-US": "Uninstalled.\nPlease reboot device to finish",
    "tr-TR": "Uygulama Kaldırıldı. Lütfen cihazı yeniden başlatın",
    "ru-RU": "Удалено.\nПерезагрузите устройство для завершения",
    "ar-AR": "تمت إزالة التطبيق",
  },
  donate: {
    "en-US": "Donate",
    "tr-TR": "Bağış Yap",
    "ar-AR": "يتبرع",
    "ru-RU": "Пожертвовать",
  },
  start_reading: {
    "en-US": "Start Reading",
    "tr-TR": "Okumaya Başla",
    "ar-AR": "بدء القراءة",
    "ru-RU": "Начать чтение",
  },
  continue_reading: {
    "en-US": "Continue Reading",
    "tr-TR": "Okumaya Devam Et",
    "ar-AR": "أكمل القراءة",
    "ru-RU": "Продолжить чтение",
  },
});

class MainScreen {
  appId = 606060609;
  appName = t("app_name");

  infoRows = [
    ["Emircan ERKUL", "Developer"],
    ["github.com/el-haqqani", "Download from"]
  ];

  uninstallText = t("action_uninstall");
  uninstallConfirm = t("tap_to_confirm");
  uninstallResult = t("uninstall_complete");
  donateText = t("donate");
  startReadingText = t("start_reading");
  continueReadingText = t("continue_reading");

  posY = 240;


  getSelfPath() {
    const pkg = hmApp.packageInfo();
    const idn = pkg.appId.toString(16).padStart(8, "0").toUpperCase();
    return "/storage/js_" + pkg.type + "s/" + idn;
  }

  drawBasement() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: (192 - 100) / 2,
      y: 48,
      src: "icon.png"
    });
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 158,
      w: 192,
      h: 48,
      text: this.appName,
      text_size: 28,
      color: 0xFFFFFF,
      align_h: hmUI.align.CENTER_H
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 194,
      w: 192,
      h: 32,
      text: version,
      text_size: 18,
      color: 0xAAAAAA,
      align_h: hmUI.align.CENTER_H
    });

    const pageNumber = parseInt(FsUtils.fetchTextFile(db_path, 4));
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 16,
      y: this.posY,
      w: 192 - 32,
      h: 48,
      text: isNaN(pageNumber) || pageNumber == 0 ? this.startReadingText : this.continueReadingText,
      radius: 24,
      color: 0xFFFFFF,
      normal_color: 0x333333,
      press_color: 0x555555,
      click_func: () => hmApp.gotoPage({
        url: "page/index",
        param: isNaN(pageNumber) ? requested_surah_starting_indexes[0] : pageNumber
      })
    });
    this.posY += 64;

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 16,
      y: this.posY,
      w: 192 - 32,
      h: 48,
      text: "Surah",
      radius: 24,
      color: 0xFFFFFF,
      normal_color: 0x333333,
      press_color: 0x555555,
      click_func: () => hmApp.gotoPage({
        url: "page/surah"
      })
    });
    this.posY += 64;

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 16,
      y: this.posY,
      w: 192 - 32,
      h: 48,
      text: this.donateText,
      radius: 24,
      color: 0xFFFFFF,
      normal_color: 0x333333,
      press_color: 0x555555,
      click_func: () => hmApp.gotoPage({
        url: "page/donate"
      })
    });
    this.posY += 64;

    if (this.appId) {
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 16,
        y: this.posY,
        w: 192 - 32,
        h: 48,
        text: this.uninstallText,
        radius: 24,
        color: 0xF48FB1,
        normal_color: 0x17030e,
        press_color: 0x380621,
        click_func: () => this.uninstall()
      });
      this.posY += 64;
    }
  }

  uninstall() {
    if (!this.confirmed) {
      hmUI.showToast({
        text: this.uninstallConfirm
      });
      this.confirmed = true;
      return;
    }

    const dirname = this.appId.toString(16).padStart(8, "0").toUpperCase();

    FsUtils.rmTree("/storage/js_apps/" + dirname);
    FsUtils.rmTree("/storage/js_apps/data" + dirname);

    hmApp.setLayerY(0);
    hmUI.setLayerScrolling(false);
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 192,
      h: 482,
      color: 0x0
    });
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 200,
      w: 192,
      h: 290,
      text: this.uninstallResult,
      text_style: hmUI.text_style.WRAP,
      align_h: hmUI.align.CENTER_H,
      color: 0xFFFFFF,
    });
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: 192,
      h: 490,
      src: ""
    }).addEventListener(hmUI.event.CLICK_UP, () => {
      hmApp.startApp({
        url: "Settings_systemScreen",
        native: true
      });
    });
  }

  drawInfo() {
    for (let [name, info] of this.infoRows) {
      const metrics = hmUI.getTextLayout(name, {
        text_width: 192,
        text_size: 18
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: this.posY,
        w: 192,
        h: 24,
        text_size: 16,
        color: 0xAAAAAA,
        text: info,
        align_h: hmUI.align.CENTER_H
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: this.posY + 24,
        w: 192,
        h: metrics.height + 24,
        text_size: 18,
        color: 0xFFFFFF,
        text: name,
        text_style: hmUI.text_style.WRAP,
        align_h: hmUI.align.CENTER_H
      });

      this.posY += metrics.height + 32;
    }

    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: this.posY + 64,
      w: 192,
      h: 2,
      src: ""
    })
  }

  getSelfPath() {
    const pkg = hmApp.packageInfo();
    const idn = pkg.appId.toString(16).padStart(8, "0").toUpperCase();
    return "/storage/js_" + pkg.type + "s/" + idn;
  }

  start() {
    this.drawBasement();
    this.drawInfo();
  }
}

let __$$app$$__ = __$$hmAppManager$$__.currentApp;
let __$$module$$__ = __$$app$$__.current;
__$$module$$__.module = DeviceRuntimeCore.Page({
  onInit(p) {
    AppGesture.withYellowWorkaround("left", {
      appid: 606060609,
      url: "page/main",
    });
    AppGesture.init();

    new MainScreen().start();
  }
});
