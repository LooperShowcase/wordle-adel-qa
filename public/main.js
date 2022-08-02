const LINE_COUNT = 8;
const CHAR_COUNT = 5;

//uncle dom
const uncleWords = document.getElementById("words");

for (let i = 0; i < LINE_COUNT; i++) {
  const wordDiv = document.createElement("div");

  wordDiv.className = "word";

  for (let j = 0; j < CHAR_COUNT; j++) {
    const charDiv = document.createElement("div");
    charDiv.className = "char";
    wordDiv.appendChild(charDiv);
  }

  uncleWords.appendChild(wordDiv);
}

let currentChar = 0;
let currentWord = 0;

document.addEventListener("keydown", async (event) => {
  const firstword = uncleWords.children[currentWord];

  if (event.code == "Enter") {
    if (currentChar == CHAR_COUNT) {
      const answer = getCurrentWord();
      const result = await guess(answer);
      colorize(result);
      currentWord++;
      currentChar = 0;
    }
  } else if (event.code == "Backspace") {
    if (currentChar > 0) {
      currentChar--;
      firstword.children[currentChar].innerHTML = "";
    }
  } else if (currentChar < CHAR_COUNT) {
    firstword.children[currentChar].innerHTML = event.key;
    currentChar++;
  } else {
    alert("stop typing");
  }
});

async function guess(word) {
  const request = await fetch("/hello/" + word);
  const result = await request.json();
  return result;
}

function getCurrentWord() {
  var word = "";
  var wordDiv = document.getElementById("words").children[currentWord];
  for (var i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
}

function colorize(results) {
  const wordDiv =
    document.getElementById("words").children[currentWord].children;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == 1) {
      wordDiv[i].style.backgroundColor = "green";
    } else if (results[i] == 0) {
      wordDiv[i].style.backgroundColor = "yellow";
    } else {
      wordDiv[i].style.backgroundColor = "gray";
    }
  }
}
