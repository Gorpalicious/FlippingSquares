/* eslint-disable no-tabs */
/* eslint-disable indent */
const dragItem = document.querySelector('#dragCircle');
const container = document.querySelector('#circleContainer');

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
// var itemWidth;
// var itemHeight;
const upperPosBound = 388;
const lowerPosBound = 0;
let xOffset = upperPosBound / 2;
let yOffset = upperPosBound / 2;

// note: can refactor this later!!!
function getClosestNumber(numToCompare, lowNumber, highNumber) {
	const a = highNumber - numToCompare;
	const b = numToCompare - lowNumber;
	// console.log(Math.max(highNumber, lowNumber));
	if (Math.max(a, b) === a) {
		return lowNumber;
	}
	return highNumber;
}

function setTranslate(xPos, yPos, el) {
	const objectToTranslate = el;
	objectToTranslate.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function dragStart(e) {
	initialX = e.clientX - xOffset;
	initialY = e.clientY - yOffset;

	if (e.target === dragItem) {
		active = true;
	}
}

function dragEnd() {
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

		if (currentX < lowerPosBound || currentX > upperPosBound) {
			currentX = getClosestNumber(currentX, lowerPosBound, upperPosBound);

			xOffset = currentX;
			yOffset = currentY;

			setTranslate(currentX, currentY, dragItem);

			dragEnd(e);
		} else if (currentY < lowerPosBound || currentY > upperPosBound) {
			currentY = getClosestNumber(currentY, lowerPosBound, upperPosBound);

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

container.addEventListener('mousedown', dragStart, false);
container.addEventListener('mouseup', dragEnd, false);
container.addEventListener('mousemove', drag, false);

// Adding Squares to page

function addElement(elementType, classType, elementToFollow) {
	// create a new div element
	const newElement = document.createElement(elementType);
	newElement.classList.add(classType);

	const oldElementArray = document.querySelectorAll(`.${elementToFollow}`);
	const oldElementLast = oldElementArray[oldElementArray.length - 1];
	// var parentDiv = oldElementLast.parentNode;

	// console.log(currentDiv);
	// console.log(oldElementArray);
	// console.log(oldElementLast);
	// console.log(newElement);
	document.body.append(newElement, oldElementLast.nextSibling);
}

for (let i = 0; i < 1; i += 1) {
	addElement('div', 'squareContainer', 'squareContainer');
	// console.log(i);
}

// const squares = Array.from(document.querySelectorAll('.squareFront'));

// // let squaresArray = Array.from(squares);

// squares.forEach((squares) => {
//   squares.addEventListener('mouseall', FollowMouse);
// });

// [...squares].forEach((squares) => {
//   squares.addEventListener('mouseclick', SetShadows);
// });

// function FollowMouse() {
//   // get current squares origin
//   // get current mouse position
//   // set skew
//   // set shadow
// }

// function SetShadows() {
//   // get current squares origin
//   // get current sun position
//   // set shadow
// }
