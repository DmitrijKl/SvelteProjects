import { encoded, translations } from "./data.js";

function transcriptId(encoded, translations) {
  const keysTranslations = Object.keys(translations);
  const excludeValues = ["groupId", "service", "formatSize", "ca"];
  const uniqueId = [];
  encoded.forEach((group) => {
    for (let key in group) {
      //   if (group[key] === null ) {
      //     group[key] = "Не уточнили что делать с null";
      //   }
      if (
        !keysTranslations.includes(group[key]) &&
        typeof group[key] === "number"
      ) {
        uniqueId.push(group[key]);
      }
      for (let i = 0; i < keysTranslations.length; i++) {
        if (
          keysTranslations[i] === group[key] &&
          !excludeValues.includes(key)
        ) {
          group[key] = translations[keysTranslations[i]];
        }
      }
    }
  });
  return [uniqueId, encoded];
}
console.log("Let's rock");
const [uniqueId, encodedList] = transcriptId(encoded, translations); //Запуск transcriptId
console.log(uniqueId, encoded);
