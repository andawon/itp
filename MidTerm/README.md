# Midterm Sound Project i p5.js

## Description

This project is an interactive sound experiment using p5.js.  
Press the keys 'A', 'S', and 'L' to play different sound effects.  
Each key is mapped to sound file, allowing users to trigger sounds interactively.

### Code Used in the Project
```javascript
let soundA, soundS, soundL;

function preload() {
  soundFormats('wav');  // Specifies the format for audio files
  soundA = loadSound('sound1.wav'); 
  soundS = loadSound('sound2.wav');  
  soundL = loadSound('sound3.wav');
}
function setup() {
  createCanvas(400, 200); //Creates a 400X200 pixel canvas
  textSize(20); // Sets the text size to 20
  textAlign(CENTER, CENTER); // Aligns text to the center
  text("Press A, S, or L to play sounds", width / 2, height / 2);
}
function keyPressed() {a
  if (key.toLowerCase() === 'a') {
    soundA.play();  
  } else if (key.toLowerCase() === 's') {
    soundS.play();  
  } else if (key.toLowerCase() === 'l') {
    soundL.play();  
  }
}
```

#### What I Learned

1. Initially, I struggled to figure out where to upload the audio files in p5.js. I assumed there was no direct way, but I later realized I just wasn't looking in the right place (the "Sketch" tab).
2. I learned how to use loadSound() in p5.js to load and play audio files.
3. How to detect key presses with keyPressed() to trigger interactive elements.

##### Result(Link)

[Click here to view](https://editor.p5js.org/andawon/sketches/D86hvbpiF) 