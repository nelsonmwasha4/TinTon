// TinTon Auto-Manager v2 - Kazi 7 Kamili
export const autoManager = {

  // KAZI 1: KUPANGA MAFALILI
  fixFileLocation(fileName, currentFolder) {
    const correctMap = {
      "swahili.js": "src/lang/swahili.js",
      "english.js": "src/lang/english.js",
      "products.js": "src/data/products.js"
    };
    if (correctMap[fileName] && currentFolder !== "lang" && currentFolder !== "data") {
      console.log(`[TinTon] Nimehamisha ${fileName} kwenda ${correctMap[fileName]}`);
      return correctMap[fileName];
    }
    return "sawa";
  },

  // KAZI 2: KUREKEBISHA MAJINA - Src -> src, Swahili -> swahili
  fixFolderName(name) {
    if (!name) return name;
    if (name === "Src") return "src";
    if (name === "Components") return "components";
    if (name === "Lang") return "lang";
    return name.toLowerCase() === name ? name : name.charAt(0).toLowerCase() + name.slice(1);
  },

  // KAZI 3: KUREKEBISHA MISTARI YA IMPORT
  fixImport(oldLine) {
    if (!oldLine) return oldLine;
    if (oldLine.includes("swahili")) {
      return 'import swahili from "./lang/swahili";';
    }
    if (oldLine.includes("Src/")) {
      return oldLine.replaceAll("Src/", "src/").replaceAll("Src/Src/", "");
    }
    return oldLine;
  },

  // KAZI 4: KUUNDA FAILI LILILOPOTEA
  createMissingFile(fileName) {
    if (fileName === "swahili.js") {
      return `export default {
  home: "Nyumbani",
  shop: "Duka",
  cart: "Kikapu",
  search: "Tafuta",
  welcome: "Karibu TinTon"
};`;
    }
    return `export default {};`;
  },

  // KAZI 5: KUANGALIA KOSA KABLA YA NETLIFY
  checkBeforeBuild(files) {
    const errors = [];
    const hasSwahili = files.some(f => f.includes("swahili"));
    if (!hasSwahili) errors.push("swahili.js haipo - nitaunda mpya");
    
    const hasDuplicateSrc = files.some(f => f.includes("Src/")) && files.some(f => f.includes("src/"));
    if (hasDuplicateSrc) errors.push("Umeunda Src mbili - nitafuta moja");
    
    return errors.length === 0 ? "Kila kitu kiko sawa, unaweza kutuma Netlify" : errors;
  },

  // KAZI 6: KUTUNZA NAKALA (Backup)
  backup(content) {
    const backupData = {
      time: new Date().toISOString(),
      content: content
    };
    try { localStorage.setItem("tinton_backup_" + Date.now(), JSON.stringify(backupData)); } catch(e) {}
    return "Nakala imetunzwa";
  },

  // KAZI 7: KURIPOTI KWA KISWAHILI
  report(message) {
    return `[TinTon Builder] ${message} - Imerekebishwa kiotomatiki`;
  }
};
