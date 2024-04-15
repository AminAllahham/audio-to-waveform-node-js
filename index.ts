import audioToWaveformData, { Options } from "audioform";
import { readFile } from "fs/promises";

function scaleArrayToRange(arr, min, max, newMin, newMax) {
  const scaledArray = arr.map((value) => {
    const scaledValue =
      ((value - min) / (max - min)) * (newMax - newMin) + newMin;
    return scaledValue;
  });
  return scaledArray;
}

async function run() {
  const options: Options = {
    samples: 32,
    channel: 0,
  };
  const buffer: Buffer = await readFile("./record_out-1.wav");
  const waveformData: number[] = await audioToWaveformData(buffer, options);



  const min = Math.min(...waveformData);
  const max = Math.max(...waveformData);

  const scaledWaveformData = scaleArrayToRange(waveformData, min, max, 1, 10);

  console.log(scaledWaveformData);

  
}

run();
