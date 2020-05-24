let numSquares = 6;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll(".square");

const setUpModeButtons = () => {
  $(".mode").on("click", function () {
    this.innerHTML === "Easy" ? (numSquares = 3) : (numSquares = 6);
    reset();
  });
};

const generateColor = (n) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(randomColor());
  }
  return arr;
};

const randomColor = () => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const pickColor = function () {
  return colors[Math.floor(Math.random() * colors.length)];
};

const clickEvent = function () {
  const clickedColor = this.style.backgroundColor;
  if (clickedColor === pickedColor) {
    $("#status").text("Correct!");
    changeColors(clickedColor);
    $(".hero-body").css("background-color", clickedColor);
    $("#reset").text("Play Again?");
  } else {
    $("#status").text("Try Again!");
    $(this).css("background-color", "rgb(0,0,0)");
  }
};

// Change color of all squares to picked color after winning
const changeColors = (color) => {
  $(".square").css("background-color", color);
};

const setUpSquares = () => {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", clickEvent);
  }
};

const reset = () => {
  colors = generateColor(numSquares);
  pickedColor = pickColor();
  $("#color-display").html(`${pickedColor}`);
  $("#reset").html("New Colors");
  $("#status").text("");
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
};

$("#reset").on("click", function () {
  $(this).html("New Colors");
  reset();
  setUpSquares();
});

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

$(document).ready(function () {
  init();
});
