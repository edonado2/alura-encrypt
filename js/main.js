rawText = document.querySelector(".raw-text");
encrypt = document.querySelector("#encrypt");
decrypt = document.querySelector("#decrypt");
resultCard = document.querySelector(".result .card");
defaultImage = "./static/muneco.svg";

charMap = {
  "e": "enter",
  "i": "imes",
  "a": "ai",
  "o": "ober",
  "u": "ufat",
};

let reverseCharMap = {};
Object.keys(charMap).forEach(key => {
  reverseCharMap[charMap[key]] = key;
});

encrypt.addEventListener("click", (e) => {
    let rawTextValue = rawText.value.toLowerCase();
  
    const keys = Object.keys(charMap);
    let encryptedText = ""; 
  
    for (let i = 0; i < rawTextValue.length; i++) {
      const char = rawTextValue[i];
  
      if (keys.includes(char)) {
        encryptedText += charMap[char]; 
      } else {
        encryptedText += char;
      }
    }

    rawText.value = "";
  
    if (encryptedText.trim() !== "") {
      resultCard.innerHTML = `
        <h2 class="encrypted-msg">${encryptedText}</h2>
      `;
    } else {
      resultCard.innerHTML = `
        <img src="${defaultImage}" alt="muneco" srcset="">
        <h2 class="initial-msg">Ningun texto fue encontrado </h2>
        <p class="initial-msg">Ingresa el texto que desea encriptar</p>
      `;
    }
  });
  
  

decrypt.addEventListener("click", (e) => {
  const encryptedText = resultCard.querySelector(".encrypted-msg").textContent;
  let decryptedText = "";

  let i = 0;
  while (i < encryptedText.length) {
    let found = false;
    Object.keys(reverseCharMap).forEach(key => {
      if (encryptedText.startsWith(key, i)) {
        decryptedText += reverseCharMap[key];
        i += key.length;
        found = true;
      }
    });
    if (!found) {
      decryptedText += encryptedText[i];
      i++;
    }
  }

  rawText.value = decryptedText;  
});
