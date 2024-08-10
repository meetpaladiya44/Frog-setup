// globalState.js
let globalText = "Default Text";

export const getText = () => globalText;
export const setText = (text) => {
   globalText = text;
};