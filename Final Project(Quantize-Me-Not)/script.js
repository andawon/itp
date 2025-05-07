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
        if (note.midi === 49) { // C#2 hihat
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
