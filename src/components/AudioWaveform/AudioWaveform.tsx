// FIXME:
/* eslint-disable no-console */
import { Menu, Tooltip } from "@mantine/core";
import { getAudioData } from "@remotion/media-utils";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videConfigAtom } from "src/libs/atom";
import { waveFormAtom } from "src/libs/atom/atom";
import { selectAllTemplate1Data, updateT1Music } from "src/libs/store/features/template1Slice";

/** @package */
export const AudioWaveform = () => {
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const { durationInFrames } = useAtomValue(videConfigAtom);
  const [waveforms, setWaveforms] = useAtom(waveFormAtom);
  const { music } = useSelector(selectAllTemplate1Data);

  const BAR_WIDTH = 7;
  const BAR_MARGIN_BETWEEN = 2;
  const MAX_BAR_HEIGHT = 30;
  const QUANTITY_OF_SAMPLES = durationInFrames / 2.5;

  const getWaveForm = useCallback(async () => {
    const audioData = await getAudioData(music);
    const fullWaveforms = Array.from(audioData.channelWaveforms[0]);
    const blockSize = Math.floor(fullWaveforms.length / QUANTITY_OF_SAMPLES);
    const blocks = new Array(Math.floor(fullWaveforms.length / blockSize))
      .fill(0)
      .map((_) => fullWaveforms.splice(0, blockSize));
    const waveformValues = blocks
      .map((block) => block.reduce((accumulator, value) => accumulator + Math.abs(value), 0) / block.length)
      .filter((value) => !!value);
    const multiplier = Math.pow(Math.max(...waveformValues), -1);
    const smoothWaveforms = waveformValues.map((value, index, array) => {
      const weightOfMean = 5;
      const toSmooth = [array[index - 1], value * 3, array[index + 1]];

      const smootherValue = toSmooth.reduce((acc, value) => acc + value, 0) / weightOfMean;

      return smootherValue * multiplier;
    });
    const filterNaN = smoothWaveforms.filter((x) => x === x);
    setWaveforms(filterNaN);
  }, [QUANTITY_OF_SAMPLES, setWaveforms, music]);

  useEffect(() => {
    // FIXME:
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getWaveForm();
  }, [getWaveForm]);

  return (
    <Menu shadow="md" width={400} opened={isOpened} onChange={setIsOpened}>
      <Menu.Target>
        <Tooltip label="BGMを変更" color="teal" withArrow>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: MAX_BAR_HEIGHT,
              width: 900,
            }}
            className="cursor-pointer pr-10"
            onClick={() => setIsOpened(true)}
          >
            {waveforms.map((v, i) => {
              const height = MAX_BAR_HEIGHT * v;

              return (
                <div
                  key={i}
                  style={{
                    height,
                    width: BAR_WIDTH,
                    marginLeft: BAR_MARGIN_BETWEEN,
                    borderRadius: 10,
                  }}
                  className="bg-sky-300"
                />
              );
            })}
          </div>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Music</Menu.Label>
        <Menu.Item
          onClick={() =>
            dispatch(
              updateT1Music({
                music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music1.mp3",
              })
            )
          }
        >
          Circle of Life
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            dispatch(
              updateT1Music({
                music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music2.mp3",
              })
            )
          }
        >
          View Above the Clouds
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            dispatch(
              updateT1Music({
                music: "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music3.mp3",
              })
            )
          }
        >
          Real Thing
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
