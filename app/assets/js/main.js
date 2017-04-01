// Global Variables
const ZERO = 0;
var canvas = '';

$(document).ready(function() {
	console.log('Hello! main.js is starting! Processing stuff is gonna happen!!');
});

function setup() {
	// Create the canvas and move it to the right place
	canvas = window.createCanvas(ZERO, ZERO);
	canvas.parent('glitched-image');

	// Load the orginal image
	window.loadImage($('.js-originalImage').attr('src'), function(img) {
		console.log('Loaded the image');

		// Change the canvas size to the original image size
		resizeCanvas(img.width, img.height);
		// Put the image on the canvas
		window.image(img, 0, 0, img.width, img.height);
	});
}
