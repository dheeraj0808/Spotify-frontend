import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaHeart, FaRegHeart, FaClock } from 'react-icons/fa';
import { usePlayerStore } from '../store/store';
import PlaylistCard from '../components/music/PlaylistCard';
import { Song } from '../types/song.types';
import { Playlist } from '../types/playlist.types';

const generatePlaceholderImage = (index: number) =>
    `https://picsum.photos/seed/lib${index}/300/300`;

const LIKED_SONGS: Song[] = Array.from({ length: 8 }, (_, i) => ({
    id: `liked-${i}`,
    title: ['Bohemian Rhapsody', 'Hotel California', 'Stairway to Heaven', 'Imagine', 'Smells Like Teen Spirit', 'Yesterday', 'Like a Rolling Stone', 'Hey Jude'][i],
    artist: ['Queen', 'Eagles', 'Led Zeppelin', 'John Lennon', 'Nirvana', 'The Beatles', 'Bob Dylan', 'The Beatles'][i],
    artistId: `artist-l-${i}`,
    album: ['A Night at the Opera', 'Hotel California', 'Led Zeppelin IV', 'Imagine', 'Nevermind', 'Help!', 'Highway 61 Revisited', 'Hey Jude'][i],
    albumId: `album-l-${i}`,
    duration: [354, 391, 482, 187, 301, 125, 369, 431][i],
    coverUrl: generatePlaceholderImage(i + 100),
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Beethoven_Symphony_No._5_-_Movement_1.mp3',
    trackNumber: i + 1,
    plays: Math.floor(Math.random() * 2000000000),
    addedAt: '2025-01-15',
    isLiked: true,
}));

const USER_PLAYLISTS: Playlist[] = Array.from({ length: 6 }, (_, i) => ({
    id: `user-pl-${i}`,
    name: ['My Favorites', 'Road Trip', 'Workout Hits', 'Chill Evening', 'Focus Mode', 'Party Mix'][i],
    description: ['A collection of my all-time favorites', 'Perfect for long drives', 'High energy workout tracks', 'Relaxing evening vibes', 'Deep focus instrumentals', 'Party anthems'][i],
    coverUrl: generatePlaceholderImage(i + 110),
    ownerId: 'user-1',
    ownerName: 'You',
    songs: [],
    totalDuration: [5400, 3600, 4200, 3000, 4800, 3600][i],
    isPublic: true,
    followers: Math.floor(Math.random() * 500),
    createdAt: '2024-06-15',
    updatedAt: '2025-01-15',
}));

const RECENTLY_PLAYED: Song[] = Array.from({ length: 6 }, (_, i) => ({
    id: `recent-${i}`,
    title: ['Anti-Hero', 'Flowers', 'As It Was', 'About Damn Time', 'Kill Bill', 'Unholy'][i],
    artist: ['Taylor Swift', 'Miley Cyrus', 'Harry Styles', 'Lizzo', 'SZA', 'Sam Smith'][i],
    artistId: `artist-r-${i}`,
    album: ['Midnights', 'Endless Summer Vacation', "Harry's House", 'Special', 'SOS', 'Gloria'][i],
    albumId: `album-r-${i}`,
    duration: [200, 204, 167, 174, 153, 232][i],
    coverUrl: generatePlaceholderImage(i + 120),
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Beethoven_Symphony_No._5_-_Movement_1.mp3',
    trackNumber: i + 1,
    plays: Math.floor(Math.random() * 3000000000),
    addedAt: '2025-03-10',
    isLiked: i % 2 === 0,
}));

type TabType = 'liked' | 'playlists' | 'recent';

export default function Library() {
    const [activeTab, setActiveTab] = useState<TabType>('liked');
    const { playSong, playQueue } = usePlayerStore();
    const navigate = useNavigate();

    const tabs: { key: TabType; label: string; count: number }[] = [
        { key: 'liked', label: 'Liked Songs', count: LIKED_SONGS.length },
        { key: 'playlists', label: 'Your Playlists', count: USER_PLAYLISTS.length },
        { key: 'recent', label: 'Recently Played', count: RECENTLY_PLAYED.length },
    ];

    return (
        <div style={{ padding: '0 32px 120px', animation: 'fadeIn 400ms ease' }}>
            <h1
                style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '24px',
                }}
            >
                Your Library
            </h1>

            {/* Tabs */}
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '32px',
                }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            padding: '8px 20px',
                            borderRadius: '9999px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 200ms ease',
                            border: 'none',
                            backgroundColor:
                                activeTab === tab.key ? '#FFFFFF' : 'rgba(255,255,255,0.07)',
                            color: activeTab === tab.key ? '#000000' : '#FFFFFF',
                        }}
                    >
                        {tab.label}
                        <span
                            style={{
                                marginLeft: '8px',
                                fontSize: '12px',
                                opacity: 0.7,
                            }}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Liked Songs Tab */}
            {activeTab === 'liked' && (
                <section>
                    {/* Liked Songs Hero */}
                    <div
                        style={{
                            background: 'linear-gradient(135deg, #450af5, #c4efd9)',
                            borderRadius: '12px',
                            padding: '32px',
                            marginBottom: '32px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '24px',
                            minHeight: '200px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>
                                PLAYLIST
                            </p>
                            <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '8px' }}>
                                Liked Songs
                            </h2>
                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                                {LIKED_SONGS.length} songs
                            </p>
                        </div>
                    </div>

                    {/* Song List Header */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '40px 6fr 4fr 60px 100px',
                            gap: '16px',
                            padding: '0 16px 8px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            marginBottom: '4px',
                        }}
                    >
                        <span style={{ fontSize: '12px', color: '#A7A7A7', textAlign: 'center' }}>#</span>
                        <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>Title</span>
                        <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>Album</span>
                        <span></span>
                        <span style={{ fontSize: '12px', color: '#A7A7A7', textAlign: 'right' }}>
                            <FaClock />
                        </span>
                    </div>

                    {LIKED_SONGS.map((song, i) => (
                        <SongRow
                            key={song.id}
                            song={song}
                            index={i + 1}
                            onPlay={() => {
                                playSong(song);
                                playQueue(LIKED_SONGS, i);
                            }}
                        />
                    ))}
                </section>
            )}

            {/* Playlists Tab */}
            {activeTab === 'playlists' && (
                <section>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                            gap: '24px',
                        }}
                    >
                        {/* Create Playlist Card */}
                        <div
                            onClick={() => navigate('/create-playlist')}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                padding: '16px',
                                cursor: 'pointer',
                                transition: 'all 300ms ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '240px',
                                border: '2px dashed rgba(255,255,255,0.15)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.borderColor = '#1DB954';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                            }}
                        >
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(29, 185, 84, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '16px',
                                    fontSize: '24px',
                                    color: '#1DB954',
                                }}
                            >
                                +
                            </div>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                                Create Playlist
                            </span>
                            <span style={{ fontSize: '13px', color: '#A7A7A7', marginTop: '4px' }}>
                                Build a new collection
                            </span>
                        </div>

                        {USER_PLAYLISTS.map((playlist) => (
                            <PlaylistCard key={playlist.id} playlist={playlist} />
                        ))}
                    </div>
                </section>
            )}

            {/* Recently Played Tab */}
            {activeTab === 'recent' && (
                <section>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '40px 6fr 4fr 60px 100px',
                            gap: '16px',
                            padding: '0 16px 8px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            marginBottom: '4px',
                        }}
                    >
                        <span style={{ fontSize: '12px', color: '#A7A7A7', textAlign: 'center' }}>#</span>
                        <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>Title</span>
                        <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>Album</span>
                        <span></span>
                        <span style={{ fontSize: '12px', color: '#A7A7A7', textAlign: 'right' }}>
                            <FaClock />
                        </span>
                    </div>

                    {RECENTLY_PLAYED.map((song, i) => (
                        <SongRow
                            key={song.id}
                            song={song}
                            index={i + 1}
                            onPlay={() => {
                                playSong(song);
                                playQueue(RECENTLY_PLAYED, i);
                            }}
                        />
                    ))}
                </section>
            )}
        </div>
    );
}

/* Song Row Component */
function SongRow({ song, index, onPlay }: { song: Song; index: number; onPlay: () => void }) {
    const [hovered, setHovered] = useState(false);
    const [liked, setLiked] = useState(song.isLiked);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onPlay}
            style={{
                display: 'grid',
                gridTemplateColumns: '40px 6fr 4fr 60px 100px',
                alignItems: 'center',
                gap: '16px',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 200ms ease',
                backgroundColor: hovered ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', width: '40px' }}>
                {hovered ? (
                    <FaPlay style={{ fontSize: '12px', color: '#FFFFFF' }} />
                ) : (
                    <span style={{ fontSize: '14px', color: '#A7A7A7' }}>{index}</span>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                <img
                    src={song.coverUrl}
                    alt={song.title}
                    style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {song.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#A7A7A7' }}>{song.artist}</div>
                </div>
            </div>
            <div style={{ fontSize: '13px', color: '#A7A7A7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {song.album}
            </div>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setLiked(!liked);
                }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: hovered || liked ? 1 : 0,
                    transition: 'opacity 200ms ease',
                }}
            >
                {liked ? (
                    <FaHeart style={{ fontSize: '14px', color: '#1DB954' }} />
                ) : (
                    <FaRegHeart style={{ fontSize: '14px', color: '#A7A7A7' }} />
                )}
            </div>
            <div style={{ fontSize: '13px', color: '#A7A7A7', textAlign: 'right' }}>
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
            </div>
        </div>
    );
}
