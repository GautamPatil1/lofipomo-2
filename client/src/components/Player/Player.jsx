import React, { useState, useRef, useEffect } from "react";
import styles from "./Player.module.css";

const Player = ({changeBackgroundImage}) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const nextTrack = () => {
    const newIndex = (index + 1) % lofis.length;
    const newGif = process.env.PUBLIC_URL + '/assets/gifs/desktop/' + (newIndex + 1) + '.gif';
    changeBackgroundImage(newGif);
    setIndex(newIndex);
  };
 
  const prevTrack = () => {
    const newIndex = (index - 1 + lofis.length) % lofis.length;
    const newGif = process.env.PUBLIC_URL + '/assets/gifs/desktop/' + (newIndex + 1) + '.gif';
    changeBackgroundImage(newGif);
    setIndex(newIndex);
  };

  useEffect(() => {
    // Reset the audio and play when the index changes
    audioRef.current.load();
  }, [index]);

  const lofis = [
    "http://usa9.fastcast4u.com/proxy/jamz?mp=/1",
    "https://fluxfm.streamabc.net/flx-chillout-aacplus-64-5024703?sABC=659op428%230%2390nq633s25rons235r17766880390o71%23fgernzf.syhksz.qr&aw_0_1st.playerid=streams.fluxfm.de&amsparams=playerid:streams.fluxfm.de;skey:1704707112",
    "https://fluxfm.streamabc.net/flx-chillhop-aacplus-64-8724785?sABC=659op409%230%2390nq633s25rons235r17766880390o71%23fgernzf.syhksz.qr&aw_0_1st.playerid=streams.fluxfm.de&amsparams=playerid:streams.fluxfm.de;skey:1704707081",
    "https://ilm-stream12.radiohost.de/ilm_ilovechillhop_mp3-192",
    "https://live.hunter.fm/lofi_high",
    "https://audiotainment-sw.streamabc.net/atsw-lofifocus-mp3-128-3757575?sABC=659op5o9%230%23o2p9onn76q3o0p15ns3156s80355283o%23gharva&aw_0_1st.playerid=tunein&amsparams=playerid:tunein;skey:1704707513",
    "https://rautemusik-de-hz-fal-stream14.radiohost.de/study?ref=tunein",
    "https://str3.openstream.co/2339?aw_0_1st.collectionid%3D6263%26stationId%3D6263%26publisherId%3D2363%26k%3D1704707618",
    "https://radio.plaza.one/ogg",
    "https://stream.laut.fm/lofi",
  ];

  return (
    <div className={styles.container}>
      <div
        className={styles.gif}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/gifs/desktop/${
            index + 1
          }.gif)`,
        }}
      />
      <div className={styles.control}>
        <i
          className="fa-solid fa-fast-backward fa-2x"
          aria-hidden="true"
          onClick={prevTrack}
        ></i>
        <div className="playpause"
        
        >
          <i
            className={`fa-solid${isPlaying ? " fa-pause" : " fa-play"} fa-3x`}
            aria-hidden="true"
            onClick={togglePlay}
          ></i>
        </div>
        <i
          className="fa-solid fa-fast-forward fa-2x"
          aria-hidden="true"
          onClick={nextTrack}
        ></i>
      </div>
      <audio
        id="player"g
        ref={audioRef}
        onPlay={handlePlay}
        onPause={handlePause}
      >
        <source src={lofis[index]} />
      </audio>
    </div>
  );
};

export default Player;
