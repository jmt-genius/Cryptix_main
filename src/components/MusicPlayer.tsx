import React, { useRef, useState } from 'react';

interface MusicPlayerProps {
  src: string;
  title: string;
  duration: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src, title, duration }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <div className="music-player">
      <h4>{title}</h4>
      <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} />
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{Math.floor(currentTime)} / {duration} seconds</span>
      </div>
    </div>
  );
};

export default MusicPlayer;
