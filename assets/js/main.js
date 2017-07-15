const $ = window.$;

// Global Variables
const ZERO = 0;
let canvas = '';
const channelsPerPixel = 4;

// Settings - number of lines
const numLines = 13;
const lineWidth = 6;

// const saved = true;

$(document).ready(() => {
	console.log('Hello! main.js is starting! Processing stuff is gonna happen!!');
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeOnePixel(pixelsArray, targetIndex, red, green, blue, alpha) {
	pixelsArray[targetIndex] = red;
	pixelsArray[targetIndex + 1] = green;
	pixelsArray[targetIndex + 2] = blue;
	pixelsArray[targetIndex + 3] = alpha;
}

function glitch(image) {
	let tempPixel = 0;
	const pixelsLength = window.pixels.length / 4;

	const lineLength = getRandomInt(100, 150);
	const lineStart = getRandomInt(30000, 70000) * 4;
	const initialPixel = {
		red: window.pixels[lineStart],
		green: window.pixels[lineStart + 1],
		blue: window.pixels[lineStart + 2],
		alpha: window.pixels[lineStart + 3],
	}

	console.log('length is ' + pixelsLength);
	// length is 268 18212

	console.log('lineLength: ' + lineLength);
	console.log('lineWidth: ' + lineWidth);
	console.log('lineStart: ' + lineStart);
	console.log('initialPixel ----');
	console.log(initialPixel);

	for (let k = 0; k < lineWidth * 4; k += 4) {
		for (let i = 0; i < lineLength; i ++) {
			tempPixel = (lineStart + k) + ((image.width * channelsPerPixel) * i);

			changeOnePixel(window.pixels, tempPixel,
				initialPixel.red, initialPixel.green, initialPixel.blue, initialPixel.alpha);
		}
	}

	window.updatePixels();
}

function setup() {
	let index = 0;

	// Create the canvas and move it to the right place
	canvas = window.createCanvas(ZERO, ZERO);
	canvas.parent('glitched-image');


	// Load the orginal image
	const photo = window.loadImage($('.js-originalImage').attr('src'), (img) => {
		console.log('Loaded the image');

		// Change the canvas size to the original image size
		window.resizeCanvas(img.width, img.height);
		// Put the image on the canvas
		window.image(img, 0, 0, img.width, img.height);

		// Load the image's pixels onto the window.pixels array
		window.loadPixels();

		while (index < numLines) {
			glitch(img);
			index += 1;
		}
	});
}
