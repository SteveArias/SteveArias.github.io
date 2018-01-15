var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	for (var i = 0; i < modeButtons.length; i++){
	// For every button, add an event listener that waits for a click
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		modeButtons[2].classList.remove("selected");
		// Make the button have the .selected class to change appearance
		this.classList.add("selected");
		switch (this.textContent){
			// If the button clicked has the text "Easy", change numSquares to 3
			case "Easy":
				numSquares = 3;
				break;
			//If the button clicked has the text "Hard", change numSquares to 3
			case "Hard":
				numSquares = 6;
				break;
			//If the button clicked has the text "Very Hard", change numSquares to 4
			case "Very Hard":
				numSquares = 9;
				break;
		}
		
		reset();
	});
	}

	for (var i = 0; i < squares.length; i++) {
		// Add click listeners to squares
		squares[i].addEventListener("click", function() {
		// Compare to color to picked color
		if (this.style.backgroundColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?"
			changeColors(pickedColor);
			h1.style.backgroundColor = pickedColor;
		}
		else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
		});
	}
	reset();
}

function reset(){
	// Generate all new colors
	colors = generateRandomColors(numSquares);
	// Pick a new random color from colors array
	pickedColor = pickColor();
	// Change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	// Change colors of squares
	for (var i = 0; i < squares.length; i++){
		// Check if there's a color in the ith position of the colors array
		if (colors[i]) {
			squares[i].style.display = "block"; 
			// If there is, change the ith square's color to the ith color in the colors array
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			// If there isn't, make the ith square hidden
			squares[i].style.display = "none";
		}
	}
	// Change resetButton to say 'New Colors'
	resetButton.textContent = "New Colors";
	// Reset color of h1 to steelblue
	h1.style.backgroundColor = "steelblue";
	// Remove any text from the message display
	messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function(){
	reset();
});
	
function changeColors(color){
	// Loop through all the squares and change their background colors
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	// Create a random index ot of the colors array
	var random = Math.floor(Math.random() * colors.length);
	// Return the index of the array
	return colors[random];
}

function generateRandomColors(num){
	// Make an array
	var array = [];

	// Push a new rbg color into array
	for (var i = 0; i < num; i++) {
		array.push(randomColor());
	}
	
	// return that array
	return array;
}

function randomColor() {
	// Generate random number from 0 to 255 for r
	var r = Math.floor(Math.random() * 256);
	// Generate random number from 0 to 255 for g
	var g = Math.floor(Math.random() * 256);
	// Generate random number from 0 to 255 for b
	var b = Math.floor(Math.random() * 256);

	// Return rgb color
	// Ex: rgb(45, 56, 89)
	return "rgb(" + r + ", " + g + ", " + b + ")";
}