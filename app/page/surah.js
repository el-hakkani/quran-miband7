import { AppGesture } from "../lib/AppGesture";
import { TouchEventManager } from "../lib/TouchEventManager";
import { surah_starting_indexes } from "./constants";
import { requested_surah_starting_indexes } from "./pages";

let __$$app$$__ = __$$hmAppManager$$__.currentApp;
let __$$module$$__ = __$$app$$__.current;
__$$module$$__.module = DeviceRuntimeCore.Page({
  onInit(p) {
    let posY = 50;

    AppGesture.withYellowWorkaround("left", {
      appid: 606060609,
      url: "page/surah",
    });
    AppGesture.init();

    requested_surah_starting_indexes.map(p => surah_starting_indexes.indexOf(p)).forEach(p => {
      (new TouchEventManager(
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 0,
          y: posY,
          src: `surah/${p + 1}.png`
        })
      )).ontouch = (e) => {
        hmApp.gotoPage({
          url: "page/index",
          param: surah_starting_indexes[p]
        });
      };

      posY += [37, 46, 60, 62, 70, 85, 102].includes(p + 1) ? 72 : 61;
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: posY,
      w: 192,
      h: 50,
      src: '',
    })
  }
});
