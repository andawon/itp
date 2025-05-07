# Quantize-Me-Not

Quantize-Me-Not is a browser-based tool that adds natural groove to MIDI drum loops.  
Instead of snapping all notes to a strict grid, this tool applies slight timing and velocity changes to make your rhythms feel more human and musical.

## Motivation

Drums are the foundation of a track. When the drums feel right, the rest of the music becomes stable and expressive.  
As someone who produces music regularly, I often spend a lot of time adjusting the groove and tone of drums. The groove comes from small details, like how much to delay or push hi-hats, and how to control velocity.

But doing this kind of micro-adjustment manually for every track is time-consuming and repetitive.  
I thought it would be helpful to extract a groove I already like and apply it automatically to new MIDI loops with one click.

Ableton already has a feature called "Groove Pool," but I sometimes work in Logic or Pro Tools during sessions, and those DAWs do not have the same functionality.  
So I decided to build a standalone web tool that can be used outside of any specific DAW.

## What It Does

This tool allows you to:

1. Upload a MIDI drum loop
2. Choose a groove preset ("Swinger" or "Disclosure")
3. Apply groove adjustments automatically
4. Download the new MIDI file with the modified groove

## How It Works

- Built with HTML, CSS, and JavaScript
- Uses the @tonejs/midi library to read, edit, and save MIDI files
- All processing is done in the browser
- The user interface is designed with a black and white theme

## Groove Presets

### Swinger (based on Anomalie groove)
- Applies to hi-hats (MIDI note 49)
- Offbeat hi-hats are delayed by 0.04 seconds
- Offbeat velocities are reduced to 60

### Disclosure
- All hi-hats (MIDI 49) are delayed by 0.04 seconds
- Velocity stays the same

## System Diagram

Upload MIDI → Choose preset → Apply groove → Download new MIDI


## Software Stack

- HTML: layout and structure
- CSS: black and white design theme
- JavaScript: core logic, file handling, note processing
- @tonejs/midi: MIDI parsing and writing in the browser


## What Works Well

- Fast and easy to use in any browser
- Clear groove changes in the result
- No need for installation or login
- Multiple presets working as intended

## Limitations and Future Plans

- No visual MIDI display or playback
- Does not detect custom drum mappings (only works well with C1 = kick, D#1 = snare, C#2 = hi-hat)
- Limited to one track MIDI files
- User-defined groove editing not supported yet

Future plans include:

- Add MIDI preview and playback
- Support for multitrack or custom mappings
- Custom groove builder
- More presets 

## Reflection

I’ve often heard that being a good programmer requires patience. People say that coding means facing bugs every day and spending long hours solving them. I understood that idea in theory, but this project helped me feel it directly. And it's quite similar to musician's life for me.

Every time I made a change, something else broke. I had to find the cause, fix it, then another bug appeared. Sometimes I had to completely change my approach or rewrite logic. It was a cycle of effort and revision.

This project was more difficult than I expected. One of the hardest parts was making the program understand which notes are kick, snare, and hi-hat in any loop. In the current version, it only works properly if the drum loop follows standard note mappings, which is a clear limitation.

Still, I’m satisfied with the groove output. This result feels like something between the 'good' and 'better' outcomes I described in my FFP. I’m also happy that I was able to design and include the Disclosure-style preset. Even though the result has limits, I learned a lot from this process, especially about coding mindset and problem-solving.

## Codes! 


## Code

Below is the final version of the code used for this project.  
It runs fully in the browser and requires no backend or installation.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Quantize-Me-Not</title>
  <script src="https://cdn.jsdelivr.net/npm/@tonejs/midi@2.0.27/build/Midi.min.js"></script>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #000;
      color: #fff;
      padding: 40px;
      text-align: center;
    }
    h1 {
      color: #fff;
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    p {
      color: #aaa;
    }
    input, button, select {
      margin: 10px;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
    }
    input[type="file"] {
      background-color: #fff;
      color: #000;
    }
    select {
      background-color: #111;
      color: #fff;
      border: 1px solid #444;
    }
    button {
      background-color: #fff;
      color: #000;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #ddd;
    }
    #downloadButton {
      display: none;
      background-color: #fff;
      color: #000;
      margin-top: 20px;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      display: inline-block;
    }
    #downloadButton:hover {
      background-color: #ddd;
    }
  </style>
</head>
<body>
  <h1>Quantize-Me-Not</h1>
  <p>Enhance your MIDI groove without quantizing the life out of it</p>

  <input type="file" id="midiFile" accept=".mid,.midi" />
  <br>
  <select id="presetSelect">
    <option value="swinger">Swinger</option>
    <option value="disclosure">Disclosure</option>
  </select>
  <button onclick="applyGroove()">Apply Groove</button>
  <br>
  <a id="downloadButton">Download Modified MIDI</a>

  <script>
    let originalMidi;

    document.getElementById("midiFile").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        originalMidi = new Midi(arrayBuffer);
        console.log("Loaded MIDI", originalMidi);
      }
    });

    function applyGroove() {
      if (!originalMidi) {
        alert("Please upload a MIDI file first.");
        return;
      }

      const preset = document.getElementById("presetSelect").value;
      const midi = new Midi();
      midi.header = originalMidi.header;
      const track = midi.addTrack();

      const sourceTrack = originalMidi.tracks[0];
      let hatCount = 0;

      for (let note of sourceTrack.notes) {
        if (note.midi === 49) {
          if (preset === "swinger") {
            const isWeak = hatCount % 2 === 1;
            const timeOffset = isWeak ? 0.04 : 0.0;
            const velocity = isWeak ? 60 : 120;
            track.addNote({
              midi: note.midi,
              time: note.time + timeOffset,
              velocity: velocity / 127,
              duration: note.duration
            });
            hatCount++;
          } else if (preset === "disclosure") {
            const timeOffset = 0.04;
            track.addNote({
              midi: note.midi,
              time: note.time + timeOffset,
              velocity: note.velocity,
              duration: note.duration
            });
          }
        } else {
          track.addNote(note);
        }
      }

      const output = midi.toArray();
      const blob = new Blob([output], { type: "audio/midi" });
      const url = URL.createObjectURL(blob);

      const link = document.getElementById("downloadButton");
      link.href = url;
      link.download = "grooved_output.mid";
      link.style.display = "inline-block";
      link.textContent = "Download Modified MIDI";
    }
  </script>
</body>
</html>
