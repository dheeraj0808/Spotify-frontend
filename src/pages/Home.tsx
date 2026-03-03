import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaClock } from 'react-icons/fa';
import { usePlayerStore } from '../store/store';
import PlaylistCard from '../components/music/PlaylistCard';
import AlbumCard from '../components/music/AlbumCard';
import { Song } from '../types/song.types';
import { Playlist, Album } from '../types/playlist.types';

// ─── Mock Data ───────────────────────────────────────────
const COVER_COLORS = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
    'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    'linear-gradient(135deg, #fccb90, #d57eeb)',
    'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
    'linear-gradient(135deg, #f5576c, #ff6a88)',
    'linear-gradient(135deg, #667eea, #4facfe)',
];

const generatePlaceholderImage = (index: number) =>
    `https://picsum.photos/seed/spotify${index}/300/300`;

const MOCK_SONGS: Song[] = Array.from({ length: 6 }, (_, i) => ({
    id: `song-${i}`,
    title: ['Blinding Lights', 'Starboy', 'Save Your Tears', 'After Hours', 'In Your Eyes', 'Heartless'][i],
    artist: ['The Weeknd', 'The Weeknd', 'The Weeknd', 'The Weeknd', 'The Weeknd', 'The Weeknd'][i],
    artistId: 'artist-1',
    album: 'After Hours',
    albumId: 'album-1',
    duration: [200, 230, 215, 361, 236, 198][i],
    coverUrl: generatePlaceholderImage(i + 10),
    audioUrl: [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    ][i],
    trackNumber: i + 1,
    plays: Math.floor(Math.random() * 3000000000),
    addedAt: '2025-01-15',
    isLiked: i % 3 === 0,
}));

const MOCK_PLAYLISTS: Playlist[] = Array.from({ length: 8 }, (_, i) => ({
    id: `playlist-${i}`,
    name: ['Today\'s Top Hits', 'RapCaviar', 'All Out 2010s', 'Rock Classics', 'Chill Hits', 'Hot Country', 'Viva Latino', 'Peaceful Piano'][i],
    description: ['The hottest tracks right now', 'New music from the biggest artists', 'The biggest songs of the 2010s', 'Rock legends & epic guitar riffs', 'Kick back to the best chill tracks', 'Today\'s top country hits', 'Today\'s top Latin hits', 'Relax and indulge'][i],
    coverUrl: generatePlaceholderImage(i + 20),
    ownerId: 'spotify',
    ownerName: 'Spotify',
    songs: [],
    totalDuration: 3600 * (i + 1),
    isPublic: true,
    followers: Math.floor(Math.random() * 10000000),
    createdAt: '2024-01-01',
    updatedAt: '2025-01-15',
}));

const MOCK_ALBUMS: Album[] = Array.from({ length: 8 }, (_, i) => ({
    id: `album-${i}`,
    name: ['After Hours', 'DAMN.', 'Midnights', 'Renaissance', 'SOS', 'Blonde', 'Future Nostalgia', 'Igor'][i],
    artistName: ['The Weeknd', 'Kendrick Lamar', 'Taylor Swift', 'Beyoncé', 'SZA', 'Frank Ocean', 'Dua Lipa', 'Tyler, The Creator'][i],
    artistId: `artist-${i}`,
    coverUrl: generatePlaceholderImage(i + 30),
    releaseDate: `202${i % 5}-0${(i % 9) + 1}-15`,
    songs: [],
    totalDuration: 3600,
    genre: 'Pop',
    label: 'Republic Records',
    type: 'album',
}));

const RECENT_MIX = [
    { title: 'Daily Mix 1', subtitle: 'The Weeknd, Drake, Post Malone', img: generatePlaceholderImage(40) },
    { title: 'Daily Mix 2', subtitle: 'Tame Impala, Arctic Monkeys', img: generatePlaceholderImage(41) },
    { title: 'Daily Mix 3', subtitle: 'Billie Eilish, Lorde', img: generatePlaceholderImage(42) },
    { title: 'Discover Weekly', subtitle: 'Your weekly mix of fresh music', img: generatePlaceholderImage(43) },
    { title: 'Release Radar', subtitle: 'Catch all the latest releases', img: generatePlaceholderImage(44) },
    { title: 'Liked Songs', subtitle: '128 songs', img: generatePlaceholderImage(45) },
];

// ─── Greeting ────────────────────────────────────────────
function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
}

export default function Home() {
    const { playSong, playQueue } = usePlayerStore();
    const navigate = useNavigate();

    return (
        <div style={{ padding: '0 32px 120px', animation: 'fadeIn 400ms ease' }}>
            {/* Hero Greeting */}
            <h1
                style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '24px',
                }}
            >
                {getGreeting()}
            </h1>

            {/* Quick Access Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '12px',
                    marginBottom: '48px',
                }}
            >
                {RECENT_MIX.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            if (i === 0) playQueue(MOCK_SONGS);
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255,255,255,0.07)',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'background-color 200ms ease',
                            height: '64px',
                            position: 'relative',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                            const playBtn = e.currentTarget.querySelector('.play-btn') as HTMLElement;
                            if (playBtn) { playBtn.style.opacity = '1'; playBtn.style.transform = 'scale(1)'; }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)';
                            const playBtn = e.currentTarget.querySelector('.play-btn') as HTMLElement;
                            if (playBtn) { playBtn.style.opacity = '0'; playBtn.style.transform = 'scale(0.8)'; }
                        }}
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            style={{
                                width: '64px',
                                height: '64px',
                                objectFit: 'cover',
                                flexShrink: 0,
                            }}
                        />
                        <span
                            style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                padding: '0 16px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1,
                            }}
                        >
                            {item.title}
                        </span>

                        <div
                            className="play-btn"
                            style={{
                                position: 'absolute',
                                right: '12px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#1DB954',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transform: 'scale(0.8)',
                                transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                            }}
                        >
                            <FaPlay style={{ fontSize: '14px', color: '#000', marginLeft: '2px' }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recently Played Songs */}
            <section style={{ marginBottom: '48px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                        Recently Played
                    </h2>
                    <span
                        style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#A7A7A7',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                        }}
                    >
                        Show All
                    </span>
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

                {MOCK_SONGS.map((song, i) => (
                    <div
                        key={song.id}
                        onClick={() => {
                            playSong(song);
                            playQueue(MOCK_SONGS, i);
                        }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '40px 6fr 4fr 60px 100px',
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
                            <span style={{ fontSize: '14px', color: '#A7A7A7' }}>{i + 1}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                            <img src={song.coverUrl} alt={song.title} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }} />
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song.title}</div>
                                <div style={{ fontSize: '13px', color: '#A7A7A7' }}>{song.artist}</div>
                            </div>
                        </div>
                        <div style={{ fontSize: '13px', color: '#A7A7A7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song.album}</div>
                        <div></div>
                        <div style={{ fontSize: '13px', color: '#A7A7A7', textAlign: 'right' }}>
                            {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </section>

            {/* Featured Playlists */}
            <section style={{ marginBottom: '48px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                        Made For You
                    </h2>
                    <span
                        style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#A7A7A7',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                        }}
                    >
                        Show All
                    </span>
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '24px',
                    }}
                >
                    {MOCK_PLAYLISTS.slice(0, 5).map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            </section>

            {/* New Releases */}
            <section style={{ marginBottom: '48px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                        New Releases
                    </h2>
                    <span
                        style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#A7A7A7',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                        }}
                    >
                        Show All
                    </span>
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '24px',
                    }}
                >
                    {MOCK_ALBUMS.slice(0, 5).map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </section>

            {/* Popular Radio */}
            <section>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                        Popular Playlists
                    </h2>
                    <span
                        style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#A7A7A7',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                        }}
                    >
                        Show All
                    </span>
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '24px',
                    }}
                >
                    {MOCK_PLAYLISTS.slice(3, 8).map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            </section>
        </div>
    );
}
