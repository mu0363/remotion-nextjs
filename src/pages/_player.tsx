// FIXME:
/* eslint-disable no-console */
// import { ActionIcon } from "@mantine/core";
// import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
// import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons";
// import { useAtom, useAtomValue, useSetAtom } from "jotai";
// import { useCallback, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import type { CustomNextPage } from "next";
// import type { FC, RefObject } from "react";
// import { Form } from "src/components/Form";
// import { TimelineCard } from "src/components/TimelineCard";
// import { EditLayout } from "src/layout/EditLayout";
// import { currentFrameAtom } from "src/libs/atom";
// import { activeSceneAtom, isPlayingAtom } from "src/libs/atom/atom";
// import { TEMPLATE1_DURATION, timelineScenes } from "src/libs/const/remotion-config";
// import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
// import { Template1 } from "src/remotion/Template1";

// const Player: CustomNextPage = () => {
//   const template1Data = useSelector(selectAllTemplate1Data);
//   const activeSceneData = useAtomValue(activeSceneAtom);
//   const playerRef = useRef<PlayerRef>(null);
//   const scrollRef = useRef(null);
//   const currentFrame = useAtomValue(currentFrameAtom);
//   const setActiveSceneData = useSetAtom(activeSceneAtom);

//   const getOffset = useCallback(() => {
//     if (scrollRef.current) {
//       setActiveSceneData((prev) => {
//         return { ...prev, from: scrollRef.current.scrollLeft };
//       });
//     }
//   }, [setActiveSceneData]);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollLeft += (currentFrame + 1000) / 1000;
//     }
//   }, [currentFrame, playerRef]);

//   useEffect(() => {
//     getOffset();
//   }, [getOffset]);

//   useEffect(() => {
//     window.addEventListener("touchmove", getOffset);
//   }, [getOffset]);

//   useEffect(() => {
//     // スクロール禁止
//     document.body.style.overflow = "hidden";
//     if (playerRef.current) {
//       playerRef.current.pause();
//       playerRef.current.seekTo(activeSceneData.from);
//     }
//   }, [activeSceneData]);

//   return (
//     <div>
//       <div className="fixed w-full md:static">
//         <div className="mx-0 pt-0 md:mx-10 md:pt-10">
//           <RemotionPlayer
//             ref={playerRef}
//             component={Template1}
//             inputProps={template1Data}
//             durationInFrames={TEMPLATE1_DURATION}
//             compositionWidth={1920}
//             compositionHeight={1080}
//             style={{ width: "100%" }}
//             fps={30}
//             controls={false}
//             autoPlay
//           />
//         </div>
//         {/** 再生バー */}
//         <div className="relative flex items-center justify-center md:hidden">
//           <div className="absolute z-20 mt-11 scroll-auto rounded-full bg-gray-600 py-9 px-0.5" />
//         </div>
//         <div className="mx-0 md:mx-5">
//           <div className="relative flex items-center">
//             <PlayButton playerRef={playerRef} activeSceneData={activeSceneData} />
//             <div className="flex overflow-x-auto pl-48 md:pl-20" ref={scrollRef}>
//               {timelineScenes.map((card) => (
//                 <div key={card.id}>
//                   <TimelineCard card={card} playerRef={playerRef} />
//                 </div>
//               ))}

//               <div className="px-24 md:px-0" />
//             </div>
//           </div>
//         </div>

//         {/** 入力フォーム */}
//         <div className="mx-5 pt-5 md:hidden">
//           <Form />
//         </div>
//         <div className="text-xs text-gray-500">{`currentFrame: ${currentFrame}`}</div>
//         {scrollRef.current && (
//           <div className="text-xs text-gray-500">{`scrollLeft: ${scrollRef.current.scrollLeft}`}</div>
//         )}
//       </div>
//     </div>
//   );
// };

// Player.getLayout = EditLayout;

// export default Player;

// type PlayButtonProps = {
//   playerRef: RefObject<PlayerRef>;
// };

// const PlayButton: FC<PlayButtonProps> = ({ playerRef, activeSceneData }) => {
//   const currentFrame = useAtomValue(currentFrameAtom);
//   const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

//   useEffect(() => {
//     if (playerRef.current) {
//       playerRef.current.pause();
//       playerRef.current.seekTo(activeSceneData.from);
//     }
//   }, [activeSceneData, playerRef]);

//   const calculateTime = (fps: number) => {
//     const minute = Math.floor(fps / (30 * 60));
//     const second = Math.floor(fps / 30);
//     const padSecond = String(second).padStart(2, "0");
//     return `${minute}:${padSecond}`;
//   };

//   return (
//     <div className="absolute z-20">
//       <div className="flex flex-col items-center">
//         <ActionIcon
//           size="lg"
//           radius="xl"
//           variant="filled"
//           className="mx-5 bg-gray-50 shadow-md hover:bg-blue-50"
//           onClick={() => {
//             playerRef.current?.toggle();
//             setIsPlaying(!isPlaying);
//           }}
//         >
//           {isPlaying ? (
//             <IconPlayerPause className="text-blue-400" size={18} />
//           ) : (
//             <IconPlayerPlay className="text-blue-400" size={18} />
//           )}
//         </ActionIcon>
//         <p className="mx-5 mt-2 text-xs font-bold text-gray-600">{calculateTime(currentFrame)}</p>
//       </div>
//     </div>
//   );
// };

function Player() {
  return <div>Enter</div>;
}

export default Player;
