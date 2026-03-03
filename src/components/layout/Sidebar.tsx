import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaSearch,
    FaBook,
    FaPlus,
    FaHeart,
    FaMusic,
} from 'react-icons/fa';

const MOCK_PLAYLISTS = [
    'Chill Vibes',
    'Workout Energy',
    'Late Night Jazz',
    'Road Trip Anthems',
    'Focus Flow',
    'Indie Discoveries',
    'Hip-Hop Classics',
    'Electronic Dreams',
    'Acoustic Sessions',
    'Morning Coffee',
];

export default function Sidebar() {
    const navigate = useNavigate();
    const [hoveredPlaylist, setHoveredPlaylist] = useState<number | null>(null);

    const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '12px 12px',
        fontSize: '16px',
        fontWeight: 700,
        color: isActive ? '#FFFFFF' : '#B3B3B3',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        textDecoration: 'none',
        borderRadius: '8px',
    });

    return (
        <>
            {/* Top Navigation Box */}
            <nav
                style={{
                    backgroundColor: '#121212',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}
            >
                <NavLink
                    to="/"
                    style={({ isActive }) => navLinkStyle(isActive)}
                    className="sidebar-link"
                >
                    <FaHome style={{ fontSize: '24px' }} />
                    <span>Home</span>
                </NavLink>
                <NavLink
                    to="/search"
                    style={({ isActive }) => navLinkStyle(isActive)}
                    className="sidebar-link"
                >
                    <FaSearch style={{ fontSize: '24px' }} />
                    <span>Search</span>
                </NavLink>
            </nav>

            {/* Library Box */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: '#121212',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                {/* Library Header */}
                <div
                    style={{
                        padding: '16px 16px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: '#B3B3B3',
                            fontSize: '16px',
                            fontWeight: 700,
                            padding: '4px 8px',
                            borderRadius: '8px',
                            transition: 'color 0.2s',
                        }}
                        className="library-btn"
                    >
                        <FaBook style={{ fontSize: '24px' }} />
                        Your Library
                    </button>
                    <button
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            color: '#B3B3B3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        className="icon-hover-bg"
                        title="Create playlist or folder"
                    >
                        <FaPlus />
                    </button>
                </div>

                {/* Playlist Scroll Area */}
                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '8px',
                    }}
                    className="sidebar-scroll"
                >
                    {/* Liked Songs Special Item */}
                    <div
                        onClick={() => navigate('/playlist/liked')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                        }}
                        className="playlist-item"
                    >
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '4px',
                                background: 'linear-gradient(135deg, #450af5, #c4efd9)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <FaHeart style={{ fontSize: '18px', color: '#FFFFFF' }} />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                                Liked Songs
                            </div>
                            <div style={{ fontSize: '12px', color: '#B3B3B3' }}>Playlist • 128 songs</div>
                        </div>
                    </div>

                    {/* Mock Playlists */}
                    {MOCK_PLAYLISTS.map((name, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/playlist/${i}`)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                            }}
                            className="playlist-item"
                        >
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '4px',
                                    backgroundColor: '#282828',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <FaMusic style={{ fontSize: '16px', color: '#B3B3B3' }} />
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {name}
                                </div>
                                <div style={{ fontSize: '12px', color: '#B3B3B3' }}>Playlist • User</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
