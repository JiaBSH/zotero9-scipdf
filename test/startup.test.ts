import { assert } from "chai";
import { config } from "../package.json";

describe("startup", function () {
  it("should have plugin instance defined", function () {
    assert.isNotEmpty(Zotero[config.addonInstance]);
  });
  it("should register the right-click menu item", function () {
    const doc = Zotero.getMainWindows()[0].document;
    const item = doc.querySelector("#zotero-itemmenu-scihub-fetch");
    assert.exists(item, "Sci-Hub menuitem should be present in the item menu");
  });
});
