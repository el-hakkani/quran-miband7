import { TouchEventManager } from "../lib/TouchEventManager";
import { AppGesture } from "../lib/AppGesture";
import { FsUtils } from "../lib/FsUtils";
import { all_page_paths, db_path, surah_starting_indexes } from "./constants";
import { requested_surah_starting_indexes } from "./pages";
import 'array-find-last';

class TheNobleQuran {
  contents = [];

  constructor(p) {
    this.path = 'pages';
    this.current = p;
    this.view = null;
    this.available_pages = [];
    requested_surah_starting_indexes.forEach(page => {
      for (let i = page; i < surah_starting_indexes[surah_starting_indexes.indexOf(page) + 1]; i++) {
        this.available_pages.push(i);
      }
    });
    console.log(this.available_pages);
  }

  getSelfPath() {
    const pkg = hmApp.packageInfo();
    const idn = pkg.appId.toString(16).padStart(8, "0").toUpperCase();
    return "/storage/js_" + pkg.type + "s/" + idn;
  }

  start() {
    this.bg = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 192,
      h: 490,
      color: 0xffffff
    });
    console.log(this.path + "/" + all_page_paths[this.current]);
    this.view = hmUI.createWidget(hmUI.widget.IMG, {
      x: 10,
      y: 20,
      w: 172,
      h: 450,
      src: this.path + "/" + all_page_paths[this.current],
    });

    // Switch handlers
    (new TouchEventManager(
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 0,
        y: 64,
        w: 192,
        h: (490 - 64) / 2,
        src: "",
      })
    )).ontouch = (e) => {
      this.switch(-1);
    };

    (new TouchEventManager(
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 0,
        y: 64 + (490 - 64) / 2,
        w: 192,
        h: (490 - 64) / 2,
        src: "",
      })
    )).ontouch = (e) => {
      this.switch(1);
    };
  }

  switch(delta) {
    let val = parseInt(this.current) + delta;

    if (this.available_pages.indexOf(val) == -1) {
      let nextAvailablePage;
      if (delta == -1) {
        nextAvailablePage = this.available_pages.findLast(x => x < val);
      } else {
        nextAvailablePage = this.available_pages.find(x => x > val);
      }

      if (nextAvailablePage == undefined || nextAvailablePage == val - delta) {
        return;
      }

      val = nextAvailablePage;
    }

    this.view.setProperty(hmUI.prop.MORE, {
      src: this.path + "/" + all_page_paths[val],
    });
    this.current = val;
    FsUtils.writeText(db_path, val.toString());
  }
}

let __$$app$$__ = __$$hmAppManager$$__.currentApp;
let __$$module$$__ = __$$app$$__.current;
__$$module$$__.module = DeviceRuntimeCore.Page({
  onInit(p) {
    AppGesture.withYellowWorkaround("left", {
      appid: 606060609,
      url: "page/index",
      param: p,
    });
    AppGesture.init();
    hmSetting.setBrightScreen(600);

    const theNobleQuran = new TheNobleQuran(p);
    theNobleQuran.start();
  },

  onDestroy() {
    hmSetting.setBrightScreenCancel();
  }
});
