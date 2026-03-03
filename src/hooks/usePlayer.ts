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

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [nextSong, setCurrentTime, setDuration]);

    useEffect(() => {
        if (audioRef.current && currentSong) {
            audioRef.current.src = currentSong.audioUrl;
            if (isPlaying) {
                audioRef.current.play().catch(() => { });
            }
        }
    }, [currentSong]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(() => { });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

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
