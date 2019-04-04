const textBlock = document.getElementById("text");

let words = text.split(/ /g);

function render() {
  if (words.length === 0) window.clearInterval(a);
  else {
    let blank = textBlock.textContent === "";
    if (blank) textBlock.textContent += `${words[0]}`;
    else textBlock.textContent += ` ${words[0]}`;
    words.shift();
  }
  if (textBlock.scrollHeight > textBlock.clientHeight) {
    textBlock.style.marginTop = `calc(540px - ${textBlock.scrollHeight}px)`;
    console.log(textBlock.scrollHeight, textBlock.clientHeight);
  }
}

let a = window.setInterval(render, 500);
