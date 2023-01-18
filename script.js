const DEFAULT_COLOR = "#333333";
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "color";

let selectedColor = DEFAULT_COLOR;
let selectedSize = DEFAULT_SIZE;
let selectedMode = DEFAULT_MODE;

const setColor = (newColor) => {
  selectedColor = newColor;
  colorButton.style.color = newColor;
};

const setSize = (newSize) => {
  selectedSize = newSize;
  sizeTitle.textContent = `${newSize} x ${newSize}`;
};

const setMode = (newMode) => {
  activateButton(newMode);
  selectedMode = newMode;
};

const activateButton = (newMode) => {
  colorButton.classList.remove("selected-button");
  eraseButton.classList.remove("selected-button");
  rainbowButton.classList.remove("selected-button");

  if (newMode === "color") {
    colorButton.classList.add("selected-button");
  }
  if (newMode === "erase") {
    eraseButton.classList.add("selected-button");
  }
  if (newMode === "rainbow") {
    rainbowButton.classList.add("selected-button");
  }
};

const colorPicker = document.querySelector("#colorPicker");
const colorButton = document.querySelector("#colorButton");
const sizeInput = document.querySelector("#sizeInput");
const sizeTitle = document.querySelector(".subtitle#size");
const clearButton = document.querySelector("#clearButton");
const gridContainer = document.querySelector(".grid-container");
const eraseButton = document.querySelector("#eraseButton");
const rainbowButton = document.querySelector("#rainbowButton");

colorPicker.addEventListener("input", (e) => setColor(e.target.value));
colorPicker.addEventListener("input", () => setMode("color"));

sizeInput.addEventListener("input", (e) => setSize(e.target.value));
sizeInput.addEventListener("input", (e) => reloadGrid(e.target.value));
clearButton.addEventListener("click", reloadGrid);
eraseButton.addEventListener("click", () => setMode("erase"));
rainbowButton.addEventListener("click", () => setMode("rainbow"));
colorButton.addEventListener("click", () => setMode("color"));

// mousedown variable
let mouseDown = false;
document.body.addEventListener("mousedown", () => {
  mouseDown = true;
});
document.body.addEventListener("mouseup", () => {
  mouseDown = false;
});

// creating the grid
function createGrid(gridSize) {
  const elementWidth = 100 / gridSize + "%";

  // adding elements to the grid
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridElement = document.createElement("div");
    gridElement.className = "grid-element";
    gridElement.style.flexBasis = elementWidth;
    gridContainer.appendChild(gridElement);
  }

  const gridElements = document.querySelectorAll(".grid-element");
  gridElements.forEach((element) => {
    element.addEventListener("mouseover", paintGrid);
    element.addEventListener("click", paintGrid);
  });
}

// fuction to color a grid element
function paintGrid(e) {
  if (e.type === "mouseover" && !mouseDown) return;

  if (selectedMode === "color") {
    this.style.backgroundColor = selectedColor;
  }
  if (selectedMode === "erase") {
    this.style.backgroundColor = "white";
  }
  if (selectedMode === "rainbow") {
    this.style.backgroundColor = `rgb(${Math.random() * 256}, ${
      Math.random() * 256
    }, ${Math.random() * 256})`;
  }
}

// function to reset the grid
function reloadGrid() {
  gridContainer.innerHTML = "";
  createGrid(selectedSize);
}

window.addEventListener("load", () => {
  createGrid(DEFAULT_SIZE);
  setMode(DEFAULT_MODE);
});
