import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSpotify } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated, isLoading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        await login({ email, password });
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
                color: '#FFFFFF'
            }}
        >
            {/* Header */}
            <div
                style={{
                    width: '100%',
                    padding: '32px',
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: '#000000',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate('/')}
                >
                    <FaSpotify style={{ fontSize: '44px', color: '#1DB954' }} />
                    <span style={{ fontSize: '30px', fontWeight: 900, letterSpacing: '-1px' }}>
                        Spotify
                    </span>
                </div>
            </div>

            {/* Form Card */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '430px',
                    margin: '32px auto',
                    padding: '48px 56px',
                    backgroundColor: '#121212',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
                }}
            >
                <h1
                    style={{
                        fontSize: '32px',
                        fontWeight: 900,
                        textAlign: 'center',
                        marginBottom: '40px',
                        letterSpacing: '-1px'
                    }}
                >
                    Log in to Spotify
                </h1>

                {error && (
                    <div style={{
                        backgroundColor: '#E91429',
                        color: 'white',
                        padding: '12px 16px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        marginBottom: '24px',
                        textAlign: 'center',
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        {error}
                    </div>
                )}

                {/* Social Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                    <SocialButton icon={<FcGoogle size={20} />} label="Continue with Google" />
                    <SocialButton icon={<FaFacebook size={20} color="#1877F2" />} label="Continue with Facebook" />
                    <SocialButton icon={<FaApple size={20} />} label="Continue with Apple" />
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '32px',
                }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#292929' }} />
                    <span style={{ fontSize: '12px', color: '#7c7c7c', fontWeight: 700 }}>OR</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#292929' }} />
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={labelStyle}>Email or username</label>
                        <input
                            type="text"
                            placeholder="Email or username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
                        <input type="checkbox" id="remember" style={{ accentColor: '#1DB954' }} />
                        <label htmlFor="remember" style={{ fontSize: '14px', fontWeight: 500 }}>Remember me</label>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        loading={isLoading}
                        fullWidth
                        style={{
                            padding: '14px',
                            fontSize: '16px',
                            fontWeight: 700,
                            borderRadius: '9999px',
                            marginTop: '12px'
                        }}
                    >
                        Log In
                    </Button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Link to="/forgot-password" style={{ fontSize: '14px', color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>
                        Forgot your password?
                    </Link>
                </div>

                <div style={{
                    textAlign: 'center',
                    marginTop: '32px',
                    paddingTop: '32px',
                    borderTop: '1px solid #292929',
                }}>
                    <span style={{ fontSize: '14px', color: '#7c7c7c' }}>Don't have an account? </span>
                    <Link
                        to="/register"
                        style={{
                            fontSize: '14px',
                            color: '#FFFFFF',
                            textDecoration: 'underline',
                            fontWeight: 700,
                        }}
                    >
                        Sign up for Spotify
                    </Link>
                </div>
            </div>
        </div>
    );
}

function SocialButton({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '12px 24px',
            borderRadius: '9999px',
            border: '1px solid #7c7c7c',
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.borderColor = '#FFFFFF'}
        onMouseOut={(e) => e.currentTarget.style.borderColor = '#7c7c7c'}
        >
            {icon}
            {label}
        </button>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 700,
    marginBottom: '8px',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    borderRadius: '4px',
    border: '1px solid #7c7c7c',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
};
