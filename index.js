const game = (function () {
  const colorDisplay = document.querySelector("#color-display");
  const pickedColorStatus = document.querySelector("#status");
  const squares = document.querySelectorAll(".square");
  const resetButton = document.querySelector("#reset");
  const modeButtons = document.querySelectorAll(".mode");
  const header = document.querySelector(".hero-body");
  let numSquares = 6;
  let colors = [];
  let pickedColor;

  const setUpModeButtons = () => {
    for (let i = 0; i < modeButtons.length; i++) {
      modeButtons[i].addEventListener("click", function () {
        this.innerHTML === "Easy" ? (numSquares = 3) : (numSquares = 6);
        reset();
      });
    }
  };

  // generate colors
  const generateColor = (n) => {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(randomColor());
    }
    return arr;
  };

  // Generate random rgb() color
  const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // select a random color to compare with
  const pickColor = function () {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  //on clicking the sqaures
  const clickEvent = function () {
    const clickedColor = this.style.backgroundColor;
    if (clickedColor === pickedColor) {
      pickedColorStatus.innerHTML = `Correct!`;
      changeColors(clickedColor);
      header.style.backgroundColor = clickedColor;
      resetButton.innerHTML = "Play Again?";
    } else {
      pickedColorStatus.innerHTML = `Try Again!`;
      this.style.backgroundColor = "rgb(0,0,0)";
    }
  };

  // Change color of all squares to picked color after winning
  const changeColors = (color) => {
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.background = color;
    }
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
    colorDisplay.innerHTML = `${pickedColor}`;
    resetButton.innerHTML = "New Colors";
    pickedColorStatus.innerHTML = "";
    for (let i = 0; i < squares.length; i++) {
      if (colors[i]) {
        squares[i].style.display = "block";
        squares[i].style.background = colors[i];
      } else {
        squares[i].style.display = "none";
      }
    }
  };

  resetButton.addEventListener("click", function () {
    this.innerHTML = "New Colors";
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
})();
