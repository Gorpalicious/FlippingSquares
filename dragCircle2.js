var dragItem = document.querySelector('#dragCircle');
var container = document.querySelector('#circleContainer');

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
var itemWidth;
var itemHeight;

console.log(dragItem.getAttribute(width));

container.addEventListener('mousedown', dragStart, false);
container.addEventListener('mouseup', dragEnd, false);
container.addEventListener('mousemove', drag, false);

function dragStart(e) {
	initialX = e.clientX - xOffset;
	initialY = e.clientY - yOffset;

	if (e.target === dragItem) {
		active = true;
	}
}

function dragEnd(e) {
	initialX = currentX;
	initialY = currentY;

	active = false;
}

// note: can refactor this later!!!
function drag(e) {
	if (active) {
		e.preventDefault();

		currentX = e.clientX - initialX;
		currentY = e.clientY - initialY;

		if (currentX < 0 || currentX > 350) {
			currentX = getClosestNumber(currentX, 0, 350);

			xOffset = currentX;
			yOffset = currentY;

			setTranslate(currentX, currentY, dragItem);

			dragEnd(e);
		} else if (currentY < 0 || currentY > 350) {
			currentY = getClosestNumber(currentY, 0, 350);

			xOffset = currentX;
			yOffset = currentY;

			setTranslate(currentX, currentY, dragItem);

			dragEnd(e);
		} else {
			xOffset = currentX;
			yOffset = currentY;

			setTranslate(currentX, currentY, dragItem);
		}
	}
}

// note: can refactor this later!!!
function getClosestNumber(numToCompare, lowNumber, highNumber) {
	let a = highNumber - numToCompare;
	let b = numToCompare - lowNumber;
	console.log(Math.max(highNumber, lowNumber));
	if (Math.max(a, b) === a) {
		return lowNumber;
	} else {
		return highNumber;
	}
}

function setTranslate(xPos, yPos, el) {
	el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
}

const squares = Array.from(document.querySelectorAll('.squareFront'));

// let squaresArray = Array.from(squares);

squares.forEach(squares => {
	squares.addEventListener('mouseall', FollowMouse);
});

[...squares].forEach(squares => {
	squares.addEventListener('mouseclick', SetShadows);
});

function FollowMouse() {
	//get current squares origin
	//get current mouse position
	// set skew
	// set shadow
}

function SetShadows() {
	//get current squares origin
	//get current sun position
	// set shadow
}
