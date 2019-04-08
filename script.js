const SUPER_START_SIGNAL = /^\$\$/;
const SUPER_END_SIGNAL = /.+\$\$/;
const SUPER_MARK = /\$\$/;
const SMALL_START_SIGNAL = /^%%/;
const SMALL_END_SIGNAL = /.+%%/;
const SMALL_MARK = /%%/;
const END_MARK = /.+\./;

const textBlock = document.getElementById("textBlock");

let words;
let target;
let className = "normal";

const addP = function(className) {
  let p = document.createElement("p");
  p.classList.add(className);
  textBlock.appendChild(p);
  target = p;
};

const reset = function() {
  text = quotes[counter];
  textBlock.style.marginTop = "100%";
  words = text.split(/ /g);
  while (textBlock.firstChild) {
    textBlock.removeChild(textBlock.firstChild);
  }
  addP("normal");
};

const render = function() {
  window.removeEventListener("keypress", next);
  let time = 400;

  let superBegin = SUPER_START_SIGNAL.test(words[0]);
  let superEnd = SUPER_END_SIGNAL.test(words[0]);
  let smallBegin = SMALL_START_SIGNAL.test(words[0]);
  let smallEnd = SMALL_END_SIGNAL.test(words[0]);
  let sentenceEnd = END_MARK.test(words[0]);

  if (superBegin) addP("super");
  if (smallBegin) addP("small");

  let span = document.createElement("span");
  let word = words[0]
    .split(SUPER_MARK)
    .join("")
    .split(SMALL_MARK)
    .join("");
  span.textContent = word;
  span.style.opacity = 0;
  target.appendChild(span);
  if (!SUPER_START_SIGNAL.test(words[1])) {
    let space = document.createElement("span");
    space.textContent = " ";
    space.classList.add("space");
    target.appendChild(space);
  }
  if (textBlock.scrollHeight > textBlock.clientHeight) {
    textBlock.style.marginTop = `${540 - textBlock.scrollHeight}px`;
  }

  if (superEnd) addP("normal");
  if (smallEnd) addP("normal");
  if (sentenceEnd && !Array.from(target.classList).includes("small")) {
    addP("normal");
    time = 1000;
  }

  words.shift();
  if (words[0]) {
    window.setTimeout(render, time);
  } else {
    if (textBlock.scrollHeight < 270) {
      textBlock.style.marginTop = `${(540 - textBlock.scrollHeight) / 2}px`;
    } else {
      textBlock.style.marginTop = `calc(${540 -
        textBlock.scrollHeight}px - 4rem)`;
    }
    window.addEventListener("keypress", next);
  }

  span.style.opacity = 1;
};

const next = function(e) {
  if (e.key === " ") {
    counter = (counter + 1) % quotes.length;
    reset();
    render();
  }
};

reset();
render();
