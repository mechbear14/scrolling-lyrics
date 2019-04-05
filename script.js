const SUPER_START_SIGNAL = /^\$\$/;
const SUPER_END_SIGNAL = /.+\$\$/;
const SUPER_MARK = /\$\$/;

const textBlock = document.getElementById("textBlock");

let words = text.split(/ /g);
let target = textBlock;

function superBegin() {
  let textSpan = document.createElement("span");
  textSpan.classList.add("super");
  textBlock.append(textSpan);
  target = textSpan;
}

function superEnd() {
  let textSpan = document.createElement("p");
  textSpan.classList.add("normal");
  textBlock.append(textSpan);
  target = textSpan;
}

function render() {
  let begin = SUPER_START_SIGNAL.test(words[0]);
  let end = SUPER_END_SIGNAL.test(words[0]);
  let word = words[0].split(SUPER_MARK).join("");

  if (begin) superBegin();

  let blank = target.textContent === "";
  if (blank) {
    target.textContent += `${word}`;
  } else {
    target.textContent += ` ${word}`;
  }

  if (end) superEnd();

  words.shift();
  console.log(begin, end, textBlock.innerHTML);

  if (textBlock.scrollHeight > textBlock.clientHeight) {
    textBlock.style.marginTop = `calc(540px - ${textBlock.scrollHeight}px)`;
  }

  if (words.length === 0) {
    window.clearInterval(handle);
  }
}

superEnd();

let handle = window.setInterval(render, 500);
