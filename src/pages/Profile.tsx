import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaMusic, FaHeart, FaUserFriends, FaSpotify } from 'react-icons/fa';
import PlaylistCard from '../components/music/PlaylistCard';
import { Playlist } from '../types/playlist.types';
import Button from '../components/common/Button';

const generatePlaceholderImage = (index: number) =>
    `https://picsum.photos/seed/profile${index}/300/300`;

const MOCK_USER = {
    id: 'user-1',
    username: 'ujjwal_pratap',
    email: 'ujjwal@example.com',
    displayName: 'Ujjwal Pratap',
    avatarUrl: generatePlaceholderImage(1),
    isPremium: true,
    createdAt: '2023-06-15',
    followers: 248,
    following: 182,
    publicPlaylists: 12,
};

const USER_PLAYLISTS: Playlist[] = Array.from({ length: 6 }, (_, i) => ({
    id: `profile-pl-${i}`,
    name: ['My Favorites', 'Road Trip', 'Workout Hits', 'Chill Evening', 'Focus Mode', 'Party Mix'][i],
    description: ['All-time favorites', 'Perfect for long drives', 'High energy workout', 'Relaxing vibes', 'Deep focus', 'Party anthems'][i],
    coverUrl: generatePlaceholderImage(i + 50),
    ownerId: 'user-1',
    ownerName: 'Ujjwal Pratap',
    songs: [],
    totalDuration: [5400, 3600, 4200, 3000, 4800, 3600][i],
    isPublic: true,
    followers: Math.floor(Math.random() * 500),
    createdAt: '2024-06-15',
    updatedAt: '2025-01-15',
}));

export default function Profile() {
    const navigate = useNavigate();
    const [hoveredStat, setHoveredStat] = useState<number | null>(null);

    const stats = [
        { icon: <FaMusic />, label: 'Playlists', value: MOCK_USER.publicPlaylists },
        { icon: <FaUserFriends />, label: 'Followers', value: MOCK_USER.followers },
        { icon: <FaHeart />, label: 'Following', value: MOCK_USER.following },
    ];

    return (
        <div style={{ animation: 'fadeIn 400ms ease' }}>
            {/* Profile Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '32px',
                    padding: '60px 32px 40px',
                    background: 'linear-gradient(180deg, rgba(80, 56, 160, 0.6) 0%, #121212 100%)',
                }}
            >
                {/* Avatar */}
                <div
                    style={{
                        width: '232px',
                        height: '232px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: '0 4px 60px rgba(0,0,0,0.5)',
                        flexShrink: 0,
                    }}
                >
                    <img
                        src={MOCK_USER.avatarUrl}
                        alt={MOCK_USER.displayName}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>

                {/* Info */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#FFFFFF', letterSpacing: '1px' }}>
                            Profile
                        </p>
                        {MOCK_USER.isPremium && (
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(29,185,84,0.2)',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: '#1DB954',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }}
                            >
                                <FaSpotify /> Premium
                            </span>
                        )}
                    </div>
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
                        {MOCK_USER.displayName}
                    </h1>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '14px',
                            color: '#B3B3B3',
                        }}
                    >
                        <span>@{MOCK_USER.username}</span>
                        <span> • </span>
                        <span>{MOCK_USER.email}</span>
                    </div>
                </div>
            </div>

            {/* Stats + Actions */}
            <div style={{ padding: '24px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
                    {/* Stats */}
                    <div style={{ display: 'flex', gap: '32px' }}>
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                onMouseEnter={() => setHoveredStat(i)}
                                onMouseLeave={() => setHoveredStat(null)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '16px 24px',
                                    borderRadius: '12px',
                                    backgroundColor: hoveredStat === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                                    transition: 'all 200ms ease',
                                    cursor: 'default',
                                    minWidth: '100px',
                                }}
                            >
                                <span style={{ fontSize: '18px', color: '#1DB954' }}>{stat.icon}</span>
                                <span style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>{stat.value}</span>
                                <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginLeft: 'auto' }}>
                        <Button
                            variant="outline"
                            size="md"
                            icon={<FaEdit />}
                            onClick={() => navigate('/edit-profile')}
                            style={{
                                borderRadius: '9999px',
                                border: '1px solid rgba(255,255,255,0.3)',
                                padding: '10px 24px',
                            }}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>

                {/* User's Public Playlists */}
                <h2
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '20px',
                    }}
                >
                    Public Playlists
                </h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '24px',
                        paddingBottom: '120px',
                    }}
                >
                    {USER_PLAYLISTS.map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            </div>
        </div>
    );
}
