import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import Button from '../components/common/Button';

const generatePlaceholderImage = (index: number) =>
    `https://picsum.photos/seed/profile${index}/300/300`;

export default function EditProfile() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('Ujjwal Pratap');
    const [username, setUsername] = useState('ujjwal_pratap');
    const [avatarPreview, setAvatarPreview] = useState(generatePlaceholderImage(1));
    const [saved, setSaved] = useState(false);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => {
            navigate('/profile');
        }, 1500);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '14px 16px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.2)',
        backgroundColor: 'rgba(255,255,255,0.07)',
        color: '#FFFFFF',
        fontSize: '14px',
        transition: 'all 200ms ease',
        outline: 'none',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '14px',
        fontWeight: 700,
        color: '#FFFFFF',
        marginBottom: '8px',
    };

    return (
        <div style={{ padding: '0 32px 120px', animation: 'fadeIn 400ms ease', maxWidth: '600px', margin: '0 auto' }}>
            <h1
                style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '40px',
                }}
            >
                Edit Profile
            </h1>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Avatar Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div
                        onClick={handleAvatarClick}
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            position: 'relative',
                            flexShrink: 0,
                            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                        }}
                    >
                        <img
                            src={avatarPreview}
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 200ms ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                        >
                            <FaCamera style={{ fontSize: '24px', color: '#FFFFFF', marginBottom: '4px' }} />
                            <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>
                                Choose photo
                            </span>
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div>
                        <p style={{ fontSize: '14px', color: '#A7A7A7', marginBottom: '8px' }}>
                            Click on the image to upload a new profile photo.
                        </p>
                        <p style={{ fontSize: '12px', color: '#6A6A6A' }}>
                            Recommended: Square image, at least 300x300px
                        </p>
                    </div>
                </div>

                {/* Name */}
                <div>
                    <label style={labelStyle}>Display Name</label>
                    <input
                        type="text"
                        placeholder="Your display name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#1DB954';
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.07)';
                        }}
                    />
                </div>

                {/* Username */}
                <div>
                    <label style={labelStyle}>Username</label>
                    <input
                        type="text"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#1DB954';
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.07)';
                        }}
                    />
                    <p style={{ fontSize: '12px', color: '#6A6A6A', marginTop: '6px' }}>
                        This appears on your profile and in search results
                    </p>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px' }}>
                    <Button
                        type="button"
                        variant="ghost"
                        size="md"
                        onClick={() => navigate('/profile')}
                        style={{
                            padding: '12px 32px',
                            color: '#FFFFFF',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        style={{
                            padding: '12px 40px',
                            fontSize: '14px',
                            fontWeight: 700,
                        }}
                    >
                        {saved ? '✓ Saved!' : 'Save Profile'}
                    </Button>
                </div>
            </form>

            {/* Success Toast */}
            {saved && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#1DB954',
                        color: '#000000',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 700,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                        animation: 'fadeInUp 300ms ease',
                        zIndex: 1000,
                    }}
                >
                    Profile saved successfully!
                </div>
            )}
        </div>
    );
}
