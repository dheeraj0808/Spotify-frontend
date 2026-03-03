import React from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPause, FaHeart, FaEllipsisH, FaClock } from 'react-icons/fa';
import { usePlayerStore } from '../store/store';
import { Song } from '../types/song.types';
import { formatTime, formatDuration } from '../utils/formatTime';

const generatePlaceholderImage = (index: number) =>
    `https://picsum.photos/seed/album${index}/400/400`;

const MOCK_ALBUM_SONGS: Song[] = Array.from({ length: 10 }, (_, i) => ({
    id: `alb-song-${i}`,
    title: [
        'Alone Again', 'Too Late', 'Hardest To Love', 'Scared To Live', 'Snowchild',
        'Escape From LA', 'Heartless', 'Faith', 'Blinding Lights', 'After Hours',
    ][i],
    artist: 'The Weeknd',
    artistId: 'artist-weeknd',
    album: 'After Hours',
    albumId: 'album-afterhours',
    duration: [262, 239, 220, 215, 244, 357, 198, 256, 200, 361][i],
    coverUrl: generatePlaceholderImage(80),
    audioUrl: [
        'https://upload.wikimedia.org/wikipedia/commons/4/4b/Beethoven_Symphony_No._5_-_Movement_1.mp3',
        'https://upload.wikimedia.org/wikipedia/commons/a/a2/Vivaldi_-_The_Four_Seasons_-_Spring_-_1_Allegro.mp3',
        'https://upload.wikimedia.org/wikipedia/commons/d/d4/Mozart_-_Symphony_No._40_-_Movement_1.mp3',
        'https://upload.wikimedia.org/wikipedia/commons/3/30/Bach_-_Cello_Suite_No._1_-_1_Prelude.mp3',
        'https://upload.wikimedia.org/wikipedia/commons/d/df/Chopin_-_Nocturne_Op._9_No._2.mp3',
        'https://upload.wikimedia.org/wikipedia/commons/0/0e/Debussy_-_Clair_de_Lune.mp3',
        'https://upload.wikimedia.org/wikipedia/commons/1/1e/Tchaikovsky_-_Swan_Lake_-_Act_II_-_10_Scene.mp3',
        'https://upload.wikimedia.org/wikipedia/commons/3/3a/Grieg_-_In_the_Hall_of_the_Mountain_King.mp3',
        'https://upload.wikimedia.org/wikipedia/commons/9/91/Rossini_-_William_Tell_Overture_-_Finale.mp3',
        'https://upload.wikimedia.org/wikipedia/commons/5/52/Strauss_-_Blue_Danube_Waltz.mp3',
    ][i],
    trackNumber: i + 1,
    plays: Math.floor(Math.random() * 1500000000),
    addedAt: '2020-03-20',
    isLiked: i % 3 === 0,
}));

export default function Album() {
    const { id } = useParams();
    const { playQueue, isPlaying, currentSong, togglePlay } = usePlayerStore();

    const album = {
        id: id || 'album-afterhours',
        name: 'After Hours',
        artistName: 'The Weeknd',
        coverUrl: generatePlaceholderImage(80),
        releaseDate: '2020-03-20',
        type: 'Album',
        songs: MOCK_ALBUM_SONGS,
        totalDuration: MOCK_ALBUM_SONGS.reduce((a, s) => a + s.duration, 0),
        label: 'Republic Records',
    };

    const isPlayingThisAlbum =
        currentSong && album.songs.some((s) => s.id === currentSong.id);

    const handlePlayAll = () => {
        if (isPlayingThisAlbum) {
            togglePlay();
        } else {
            playQueue(album.songs, 0);
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
                    background: 'linear-gradient(180deg, rgba(120, 60, 60, 0.6) 0%, #121212 100%)',
                }}
            >
                <img
                    src={album.coverUrl}
                    alt={album.name}
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
                        {album.type}
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
                        {album.name}
                    </h1>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '14px',
                            color: '#FFFFFF',
                        }}
                    >
                        <span style={{ fontWeight: 700 }}>{album.artistName}</span>
                        <span style={{ color: '#B3B3B3' }}> • </span>
                        <span style={{ color: '#B3B3B3' }}>
                            {album.releaseDate.split('-')[0]}
                        </span>
                        <span style={{ color: '#B3B3B3' }}> • </span>
                        <span style={{ color: '#B3B3B3' }}>
                            {album.songs.length} songs, {formatDuration(album.totalDuration)}
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
                    {isPlayingThisAlbum && isPlaying ? (
                        <FaPause />
                    ) : (
                        <FaPlay style={{ marginLeft: '3px' }} />
                    )}
                </button>

                <button
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#A7A7A7',
                        fontSize: '28px',
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
                    }}
                >
                    <FaEllipsisH />
                </button>
            </div>

            {/* Track List */}
            <div style={{ padding: '0 32px 120px' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '40px 6fr 100px',
                        gap: '16px',
                        padding: '0 16px 8px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '4px',
                    }}
                >
                    <span style={{ fontSize: '12px', color: '#A7A7A7', textAlign: 'center' }}>#</span>
                    <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>Title</span>
                    <span style={{ fontSize: '12px', color: '#A7A7A7', textAlign: 'right' }}>
                        <FaClock />
                    </span>
                </div>

                {album.songs.map((song, i) => {
                    const isCurrentSong = currentSong?.id === song.id;
                    return (
                        <div
                            key={song.id}
                            onClick={() => playQueue(album.songs, i)}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '40px 6fr 100px',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '10px 16px',
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
                            <div style={{ fontSize: '13px', color: '#A7A7A7', textAlign: 'right' }}>
                                {formatTime(song.duration)}
                            </div>
                        </div>
                    );
                })}

                {/* Footer info */}
                <div
                    style={{
                        marginTop: '32px',
                        paddingTop: '24px',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    <p style={{ fontSize: '13px', color: '#A7A7A7' }}>
                        {album.releaseDate}
                    </p>
                    <p style={{ fontSize: '11px', color: '#6A6A6A', marginTop: '4px' }}>
                        © {album.releaseDate.split('-')[0]} {album.label}
                    </p>
                </div>
            </div>
        </div>
    );
}
