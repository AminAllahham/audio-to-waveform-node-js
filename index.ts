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
    samples: 30,
    channel: 0,
  };
  const buffer: Buffer = await readFile("./aa.mp3");
  const waveformData: number[] = await audioToWaveformData(buffer, options);

  console.log(waveformData.map((x) => x * 10));
}

run();
