const fs = require("fs");
const { decode } = require("wav-decoder");

const inputFile = "file_example_WAV_10MG (1).wav";
const windowSizeMs = 1000;
const desiredMaxValue = 10;

async function generateWaveformDataArray() {
  try {
    const buffer = fs.readFileSync(inputFile);
    const audioData = await decode(buffer);
    const { channelData, sampleRate } = audioData;
    const samplesPerWindow = Math.floor(sampleRate * (windowSizeMs / 1000));
    const waveformDataArray = [];
    for (let i = 0; i < channelData[0].length; i += samplesPerWindow) {
      let sum = 0;
      for (let j = 0; j < samplesPerWindow; j++) {
        if (i + j < channelData[0].length) {
          sum += Math.abs(channelData[0][i + j]);
        }
      }
      const average = sum / samplesPerWindow;
      waveformDataArray.push(average);
    }

    const maxValue = Math.max(...waveformDataArray);
    const scaledWaveformDataArray = waveformDataArray.map(
      (value) => (value / maxValue) * desiredMaxValue
    );
    return { scaledWaveformDataArray, sampleRate };
  } catch (error) {
    console.error("Error:", error);
  }
}

generateWaveformDataArray()
  .then(({ scaledWaveformDataArray, sampleRate }) => {
    // Save text file with scaled waveform data
    fs.writeFileSync(
      "waveform_data.txt",
      scaledWaveformDataArray.join("\n"),
      "utf8"
    );

    console.log("Scaled Waveform Data Array:", scaledWaveformDataArray);
    console.log("Sample Rate:", sampleRate);
  })
  .catch((error) => console.error("Error:", error));
