# Template

## What will (likely) be the title of your project?

Quantize Me Not: A Web Tool for Enhancing Drum Groove

## In just a sentence or two, summarize your project. (E.g., "My project a web-based synthesizer.")

This is a web-based tool that improves the groove of uploaded MIDI drum loops by adjusting their timing and velocity. Users can also choose groove presets based on the styles of artists like Kaytranada, Disclosure, and Anomalie.

## List at least 3 resources you know you will use in developing your project

1.Tone.js – to play drum loops in the browser

2.@tonejs/midi – to read and save MIDI files

3.HTML, CSS, JavaScript – for the interface and logic

4.My own groove analysis data (timing and velocity values)

## In a paragraph or more, detail your project. What will your software do? What features will it have? How will it be executed?

Quantize Me Not is a tool that helps improve the groove of MIDI drum loops. Users upload a MIDI file, and the program automatically adjusts the timing and velocity of notes to make the loop feel more natural and musical. The user can then download the updated MIDI file and use it in any DAW (digital audio workstation).
Besides the basic groove enhancement, the tool will also have preset styles based on artists like Kaytranada, Disclosure, and Anomalie. I will analyze the grooves of these artists and create preset data myself (not with AI). Users will also be able to hear the result using drum sounds in the browser, thanks to Tone.js.

## Will any work as part of this project overlap with any work you are doing outside of this class? For another class? Who is the professor in this class?

No. This project is only for this class.


### In a sentence (or list of features), define a GOOD outcome for your final project. I.e., what WILL you accomplish no matter what?

1.Upload a MIDI drum loop

2.Apply basic groove enhancement (timing and velocity)

3.Download the new MIDI file

### In a sentence (or list of features), define a BETTER outcome for your final project. I.e., what do you THINK you can accomplish before the final project's deadline?

1.Add 3 artist-style presets (Kaytranada, Disclosure, Anomalie)

2.Compare original and modified groove in playback


### In a sentence (or list of features), define a BEST outcome for your final project. I.e., what do you HOPE to accomplish before the final project's deadline?

1.Add sliders to customize swing and velocity feel

2.Let users choose different drum sounds



## In a paragraph or more, outline your next steps WITH A SPECIFIC CALENDAR. What new skills will you need to acquire? What topics will you need to research?

Week 1: Analyze grooves from Kaytranada, Disclosure, and Anomalie. Create JSON files for timing and velocity changes.
Week 2: Build MIDI upload and playback using Tone.js and @tonejs/midi.
Week 3: Apply groove presets and make the MIDI export work.
Week 4: Improve the design, add basic visualizations, and test everything.
I will study how MIDI works, how to change note timing and velocity, and how to show rhythm visually in the browser using JavaScript and maybe Canvas or SVG.

