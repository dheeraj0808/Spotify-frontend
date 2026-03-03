import React from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPause, FaHeart, FaEllipsisH, FaClock } from 'react-icons/fa';
import { usePlayerStore } from '../store/store';
import { Song } from '../types/song.types';
import { formatTime, formatDuration, formatNumber } from '../utils/formatTime';

const generatePlaceholderImage = (index: number) =>
    `https://picsum.photos/seed/playlist${index}/400/400`;

const MOCK_PLAYLIST_SONGS: Song[] = Array.from({ length: 12 }, (_, i) => ({
    id: `pl-song-${i}`,
    title: [
        'Shape of You', 'Levitating', 'Peaches', 'Stay', 'Good 4 U',
        'Montero', 'Kiss Me More', 'Industry Baby', 'Easy On Me', 'Heat Waves',
        'abcdefu', 'Enemy',
    ][i],
    artist: [
        'Ed Sheeran', 'Dua Lipa', 'Justin Bieber', 'The Kid LAROI', 'Olivia Rodrigo',
        'Lil Nas X', 'Doja Cat', 'Lil Nas X', 'Adele', 'Glass Animals',
        'GAYLE', 'Imagine Dragons',
    ][i],
    artistId: `artist-${i}`,
    album: [
        '÷ (Divide)', 'Future Nostalgia', 'Justice', 'F*ck Love', 'SOUR',
        'MONTERO', 'Planet Her', 'MONTERO', '30', 'Dreamland',
        'a study of the human experience volume one', 'Arcane',
    ][i],
    albumId: `album-${i}`,
    duration: [233, 203, 198, 141, 178, 137, 208, 212, 224, 238, 168, 173][i],
    coverUrl: generatePlaceholderImage(i + 60),
    audioUrl: [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    ][i],
    trackNumber: i + 1,
    plays: Math.floor(Math.random() * 2000000000),
    addedAt: '2025-01-15',
    isLiked: i % 4 === 0,
}));

export default function Playlist() {
    const { id } = useParams();
    const { playSong, playQueue, isPlaying, currentSong, togglePlay } = usePlayerStore();

    const playlist = {
        id: id || '0',
        name: 'Today\'s Top Hits',
        description: 'The hottest tracks right now. Cover: Sabrina Carpenter',
        coverUrl: generatePlaceholderImage(99),
        ownerName: 'Spotify',
        followers: 34567890,
        totalDuration: MOCK_PLAYLIST_SONGS.reduce((a, s) => a + s.duration, 0),
        songs: MOCK_PLAYLIST_SONGS,
    };

    const isPlayingThisPlaylist =
        currentSong && playlist.songs.some((s) => s.id === currentSong.id);

    const handlePlayAll = () => {
        if (isPlayingThisPlaylist) {
            togglePlay();
        } else {
            playQueue(playlist.songs, 0);
        }
    };

    return (
        <div style={{ animation: 'fadeIn 400ms ease' }}>
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '24px',
                    padding: '40px 32px',
                    background: 'linear-gradient(180deg, rgba(83, 83, 83, 0.6) 0%, var(--color-bg, #121212) 100%)',
                }}
            >
                <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    style={{
                        width: '232px',
                        height: '232px',
                        borderRadius: '4px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 60px rgba(0,0,0,0.5)',
                    }}
                />
                <div>
                    <p
                        style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: '#FFFFFF',
                            letterSpacing: '1px',
                            marginBottom: '8px',
                        }}
                    >
                        Playlist
                    </p>
                    <h1
                        style={{
                            fontSize: '4rem',
                            fontWeight: 900,
                            color: '#FFFFFF',
                            lineHeight: 1,
                            marginBottom: '16px',
                            letterSpacing: '-2px',
                        }}
                    >
                        {playlist.name}
                    </h1>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#B3B3B3',
                            marginBottom: '8px',
                        }}
                    >
                        {playlist.description}
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '14px',
                            color: '#FFFFFF',
                        }}
                    >
                        <span style={{ fontWeight: 700 }}>{playlist.ownerName}</span>
                        <span style={{ color: '#B3B3B3' }}> • </span>
                        <span style={{ color: '#B3B3B3' }}>
                            {formatNumber(playlist.followers)} likes
                        </span>
                        <span style={{ color: '#B3B3B3' }}> • </span>
                        <span style={{ color: '#B3B3B3' }}>
                            {playlist.songs.length} songs, {formatDuration(playlist.totalDuration)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    padding: '24px 32px',
                }}
            >
                <button
                    onClick={handlePlayAll}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: '#1DB954',
                        color: '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: 'none',
                        fontSize: '22px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                        transition: 'all 200ms ease',
                    }}
                >
                    {isPlayingThisPlaylist && isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '3px' }} />}
                </button>

                <button
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#A7A7A7',
                        fontSize: '28px',
                        transition: 'color 200ms ease',
                    }}
                >
                    <FaHeart />
                </button>

                <button
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#A7A7A7',
                        fontSize: '22px',
                        transition: 'color 200ms ease',
                    }}
                >
                    <FaEllipsisH />
                </button>
            </div>

            {/* Track List */}
            <div style={{ padding: '0 32px 120px' }}>
                {/* Header */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '40px 6fr 4fr 3fr 100px',
                        gap: '16px',
                        padding: '0 16px 8px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '4px',
                    }}
                >
                    <span style={{ fontSize: '12px', color: '#A7A7A7', textAlign: 'center' }}>#</span>
                    <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>Title</span>
                    <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>Album</span>
                    <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>Date Added</span>
                    <span style={{ fontSize: '12px', color: '#A7A7A7', textAlign: 'right' }}>
                        <FaClock />
                    </span>
                </div>

                {/* Songs */}
                {playlist.songs.map((song, i) => {
                    const isCurrentSong = currentSong?.id === song.id;
                    return (
                        <div
                            key={song.id}
                            onClick={() => playQueue(playlist.songs, i)}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '40px 6fr 4fr 3fr 100px',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 200ms ease',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                        >
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span
                                    style={{
                                        fontSize: '14px',
                                        color: isCurrentSong ? '#1DB954' : '#A7A7A7',
                                    }}
                                >
                                    {isCurrentSong ? '♫' : i + 1}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={song.coverUrl}
                                    alt={song.title}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '4px',
                                        objectFit: 'cover',
                                        flexShrink: 0,
                                    }}
                                />
                                <div style={{ overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: isCurrentSong ? '#1DB954' : '#FFFFFF',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {song.title}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#A7A7A7' }}>{song.artist}</div>
                                </div>
                            </div>
                            <div
                                style={{
                                    fontSize: '13px',
                                    color: '#A7A7A7',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {song.album}
                            </div>
                            <div style={{ fontSize: '13px', color: '#A7A7A7' }}>{song.addedAt}</div>
                            <div style={{ fontSize: '13px', color: '#A7A7A7', textAlign: 'right' }}>
                                {formatTime(song.duration)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
