import httpRequest from "./httpRequest.js";

class Translator {
  currentLanguage;
  currentLanguageID;
  map;

  defaultLanguage = "EN";

  constructor() {
    this.map = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get("lang")) this.defaultLanguage = urlParams.get("lang");
    this.loadLanguage("GR");
    this.loadLanguage("EN");
    // this.loadLanguage('FR');
  }

  async loadLanguage(lang) {
    this.map[lang] = JSON.parse(
      await httpRequest("GET", `../../assets/json/${lang}.json`, null)
    );
    if (lang == this.defaultLanguage) {
      this.currentLanguage = this.map[lang];
      this.currentLanguageID = lang;
    }
  }

  get language() {
    return this.currentLanguageID;
  }

  get(id) {
    return this.currentLanguage[id] || this.map["EN"][id] || id;
  }

  setCurrentLanguage(lan) {
    if (!this.map[lan]) return false;
    this.currentLanguage = this.map[lan];
    this.currentLanguageID = lan;
    return true;
  }
}

const translator = new Translator();

export default translator;
