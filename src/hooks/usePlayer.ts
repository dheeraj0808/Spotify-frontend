import { useRef, useEffect, useCallback } from 'react';
import { usePlayerStore } from '../store/store';

export function usePlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const {
        currentSong,
        isPlaying,
        volume,
        isMuted,
        currentTime,
        duration,
        playSong,
        playQueue,
        togglePlay,
        nextSong,
        prevSong,
        setCurrentTime,
        setDuration,
        setVolume,
        toggleMute,
        toggleRepeat,
        toggleShuffle,
        repeatMode,
        isShuffled,
        addToQueue,
        queue,
    } = usePlayerStore();

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
        const audio = audioRef.current;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => nextSong();

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        // Apply initial volume
        audio.volume = isMuted ? 0 : volume;

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [nextSong, setCurrentTime, setDuration, volume, isMuted]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && currentSong) {
            const isSameSrc = audio.src === currentSong.audioUrl;
            if (!isSameSrc) {
                audio.src = currentSong.audioUrl;
                audio.load();
            }

            if (isPlaying) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.error("Playback failed:", error);
                    });
                }
            } else {
                audio.pause();
            }
        }
    }, [currentSong, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const seekTo = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, [setCurrentTime]);

    return {
        currentSong,
        isPlaying,
        volume,
        isMuted,
        currentTime,
        duration,
        repeatMode,
        isShuffled,
        queue,
        playSong,
        playQueue,
        togglePlay,
        nextSong,
        prevSong,
        seekTo,
        setVolume,
        toggleMute,
        toggleRepeat,
        toggleShuffle,
        addToQueue,
    };
}
