/* eslint-disable no-tabs */
/* eslint-disable indent */
const dragItem = document.querySelector('#dragCircle');
const container = document.querySelector('#circleContainer');

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
const itemSize = dragItem.offsetHeight;
const upperPosBound = container.offsetHeight - itemSize;
const lowerPosBound = 0;
let xOffset = upperPosBound / 2;
let yOffset = upperPosBound / 2;
const numberOfSquares = Math.floor(container.offsetHeight / itemSize);
let squaresPositionX = 0;
let squaresPositionY = 0;

function getClosestNumber(numToCompare, lowNumber, highNumber) {
	const a = highNumber - numToCompare;
	const b = numToCompare - lowNumber;

	if (Math.max(a, b) === a) {
		return lowNumber;
	}
	return highNumber;
}

// apply translate to move circle into new position
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

function checkIfBoundsAreCrossed(upperBoundary, lowerBoundary, objectPosition) {
	return objectPosition < lowerBoundary || objectPosition > upperBoundary;
}

function setNewPositions() {
	xOffset = currentX;
	yOffset = currentY;

	setTranslate(currentX, currentY, dragItem);
}

// note: can refactor this later!!!
function drag(e) {
	if (active) {
		e.preventDefault();

		currentX = e.clientX - initialX;
		currentY = e.clientY - initialY;

		if (checkIfBoundsAreCrossed(upperPosBound, lowerPosBound, currentX)) {
			currentX = getClosestNumber(currentX, lowerPosBound, upperPosBound);
			setNewPositions();
			dragEnd(e);
		} else if (
			checkIfBoundsAreCrossed(upperPosBound, lowerPosBound, currentY)
		) {
			currentY = getClosestNumber(currentY, lowerPosBound, upperPosBound);
			setNewPositions();
			dragEnd(e);
		} else {
			setNewPositions();
		}
	}
}

container.addEventListener('mousedown', dragStart, false);
container.addEventListener('mouseup', dragEnd, false);
container.addEventListener('mousemove', drag, false);

// Adding Squares to page

function addElement(elementType, classType, elementToFollow) {
	const newElement = document.createElement(elementType);
	const oldElement = document.querySelector(`.${elementToFollow}`);

	newElement.classList.add(classType);
	oldElement.appendChild(newElement);

	setTranslate(squaresPositionX, squaresPositionY, newElement);
}

for (let i = 1; i <= numberOfSquares; i += 1) {
	for (let j = 1; j <= numberOfSquares; j += 1) {
		addElement('div', 'squareContainer', 'mainContainer');
		addElement('div', 'squareFront', 'squareContainer');
		addElement('div', 'squareShadow', 'squareContainer');

		squaresPositionX += itemSize;
	}
	squaresPositionX = 0;
	squaresPositionY += itemSize;
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
