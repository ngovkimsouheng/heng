// text typing animation
const texts = ["FRONTEND DEVELOPER", "UX/UI DESGINER" , "PROBLEM SOLVER"]; //["OUR REASON", "OUR VISION", "OUR PURPOSE"];
const typingElement = document.getElementById("typing-text");
const cursor = document.querySelector(".blinking-cursor");
let textIndex = 0;
let charIndex = 0;
let typing = true;

function typeEffect() {
  const currentText = texts[textIndex];

  if (typing) {
    typingElement.textContent = currentText.slice(0, charIndex++);
    if (charIndex > currentText.length) {
      typing = false;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingElement.textContent = currentText.slice(0, --charIndex);
    if (charIndex === 0) {
      typing = true;
      textIndex = (textIndex + 1) % texts.length;
    }
  }
  setTimeout(typeEffect, typing ? 100 : 50); // typing speed
}

typeEffect();
//