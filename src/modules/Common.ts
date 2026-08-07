import { config } from "../../package.json";
import { getString } from "../utils/locale";
import { SciHubFetcher } from "./SciHubFetcher";

export class Common {
  static registerPrefs() {
    const prefOptions = {
      pluginID: config.addonID,
      src: rootURI + "content/preferences.xhtml",
      label: getString("prefs-title"),
      image: `chrome://${config.addonRef}/content/icons/sci-hub-logo.svg`,
      defaultXUL: true,
    };
    ztoolkit.getGlobal("Zotero").PreferencePanes.register(prefOptions);
  }

  static registerRightClickMenuItem(win: _ZoteroTypes.MainWindow) {
    const doc = win.document;
    const menu = doc.querySelector("#zotero-itemmenu");
    if (!menu) return;
    const menuIcon = `chrome://${config.addonRef}/content/icons/sci-hub-logo.svg`;
    const XUL_NS =
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
    const menuitem = doc.createElementNS(XUL_NS, "menuitem") as XUL.MenuItem;
    menuitem.id = "zotero-itemmenu-scihub-fetch";
    menuitem.setAttribute("label", getString("menuitem-fetch"));
    menuitem.setAttribute("image", menuIcon);
    menuitem.addEventListener("command", () => {
      const zoteroPane = Zotero.getActiveZoteroPane();
      if (!zoteroPane) return;
      SciHubFetcher.updateItems(zoteroPane.getSelectedItems(), false);
    });
    menu.append(menuitem);
    menu.addEventListener("popupshowing", () => {
      const zoteroPane = Zotero.getActiveZoteroPane();
      const items = zoteroPane?.getSelectedItems() ?? [];
      menuitem.hidden = !items.some((item) => item.isRegularItem());
    });
  }
}
