/* eslint-disable no-tabs */
/* eslint-disable indent */
const dragItem = document.querySelector('#dragCircle');
const container = document.querySelector('#circleContainer');
const mainContainer = document.querySelector('.mainContainer');

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
const skewMax = 80;
// let zIndex = 1;

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

	if (objectToTranslate.classList.contains('squareFront') || objectToTranslate.classList.contains('squareShadow')) {
		objectToTranslate.style.transform = `translate3d(${0}px, ${0}px, 0)`;
	} else {
		objectToTranslate.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
	}
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
		} else if (checkIfBoundsAreCrossed(upperPosBound, lowerPosBound, currentY)) {
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
	const nodes = Array.from(document.querySelectorAll(`.${elementToFollow}`));
	const oldElement = nodes[nodes.length - 1];

	// console.log(newElement);
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

const squaresBoxes = Array.from(document.querySelectorAll('.squareFront'));
const squareShadows = Array.from(document.querySelectorAll('.squareShadow'));

function getChildIndex(child) {
	const parent = child.parentNode;
	const { children } = parent;
	let i = children.length - 1;
	for (; i >= 0; i -= 1) {
		if (child === children[i]) {
			break;
		}
	}
	return i;
}

function scaleBetween(scaledMin, scaledMax, num) {
	const observedMax = 500;
	const observedMin = -500;
	return ((scaledMax - scaledMin) * (num - observedMin)) / (observedMax - observedMin) + scaledMin;
}

function getSkewUsingDistanceToCircle(objLocation, circleLocation, maximumSkew) {
	const objLocationFloor = Math.floor(objLocation);
	const circleLocationFloor = Math.floor(circleLocation);

	const distanceBetween = Math.floor(circleLocationFloor - objLocationFloor);
	// const skewToReturn = Math.floor(distanceBetween / 15);
	const skewToReturn = Math.floor(scaleBetween(-maximumSkew, maximumSkew, distanceBetween));
	// const skewToReturn = Math.floor(scaleBetween(0, maximumSkew, distanceBetween));

	// NOTE TO SELF - SQUARES ARE AFFECTED IN THE SAME WAY EACH TIME (IE SKEW doesn't CHANGE )
	// ALSO IT LOOKS LIKE MORE THAN THE FRONT AND THE SHADOW OF THE SQUARES ARE AFFECTED BY THE SKEW
	// console.log(this);
	// console.log(`distance between: ${distanceBetween}, skew: ${skewToReturn}`);

	return skewToReturn;
}

function transformSquaresArray(element) {
	const squareRect = element.getBoundingClientRect();

	const elementPositionX = squareRect.top;
	const elementPositionY = squareRect.left;

	const circleRect = dragItem.getBoundingClientRect();
	const circleLocationX = circleRect.top;
	const circleLocationY = circleRect.left;

	let valueX = getSkewUsingDistanceToCircle(elementPositionX, circleLocationX, skewMax);
	let valueY = getSkewUsingDistanceToCircle(elementPositionY, circleLocationY, skewMax);

	const skewReducer = 30;

	if (valueX > skewReducer) {
		valueX = skewReducer;
	} else if (valueX < -skewReducer) {
		valueX = -skewReducer;
	}

	if (valueY > skewReducer) {
		valueY = skewReducer;
	} else if (valueY < -skewReducer) {
		valueY = -skewReducer;
	}

	const objectToTranslate = element;
	objectToTranslate.style.transform = `skew(${valueX}deg, ${valueY}deg)`;
}

function transformSquaresAll() {
	squaresBoxes.forEach(transformSquaresArray);
	squareShadows.forEach(transformSquaresArray);
}

mainContainer.addEventListener('click', transformSquaresAll);
