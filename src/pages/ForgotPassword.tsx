import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSpotify } from 'react-icons/fa';
import Button from '../components/common/Button';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        setError('');
        setSubmitted(true);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '14px 16px',
        borderRadius: '4px',
        border: '1px solid rgba(255,255,255,0.3)',
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontSize: '14px',
        transition: 'border-color 200ms ease',
        outline: 'none',
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#121212',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'linear-gradient(180deg, #1a1a1a 0%, #121212 30%)',
            }}
        >
            {/* Header */}
            <div
                style={{
                    width: '100%',
                    padding: '32px',
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    backgroundColor: '#000000',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate('/')}
                >
                    <FaSpotify style={{ fontSize: '40px', color: '#FFFFFF' }} />
                    <span style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF' }}>
                        Spotify
                    </span>
                </div>
            </div>

            {/* Content */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    padding: '48px 32px',
                    animation: 'fadeInUp 400ms ease',
                }}
            >
                {!submitted ? (
                    <>
                        <h1
                            style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                color: '#FFFFFF',
                                textAlign: 'center',
                                marginBottom: '12px',
                            }}
                        >
                            Reset your password
                        </h1>
                        <p
                            style={{
                                textAlign: 'center',
                                fontSize: '14px',
                                color: '#A7A7A7',
                                marginBottom: '40px',
                                lineHeight: 1.6,
                            }}
                        >
                            Enter the email address linked to your Spotify account, and we'll
                            send you an email with instructions.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label
                                    style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#FFFFFF',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    placeholder="name@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        ...inputStyle,
                                        borderColor: error ? '#F15E6C' : 'rgba(255,255,255,0.3)',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = '#FFFFFF')}
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = error
                                            ? '#F15E6C'
                                            : 'rgba(255,255,255,0.3)')
                                    }
                                />
                                {error && (
                                    <p style={{ fontSize: '12px', color: '#F15E6C', marginTop: '6px' }}>
                                        {error}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                style={{
                                    marginTop: '8px',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    padding: '16px',
                                }}
                            >
                                Send Reset Link
                            </Button>
                        </form>

                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '32px',
                                paddingTop: '24px',
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <Link
                                to="/login"
                                style={{
                                    fontSize: '14px',
                                    color: '#FFFFFF',
                                    textDecoration: 'underline',
                                    fontWeight: 600,
                                }}
                            >
                                Back to Login
                            </Link>
                        </div>
                    </>
                ) : (
                    /* Success State */
                    <div style={{ textAlign: 'center' }}>
                        <div
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(29, 185, 84, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                            }}
                        >
                            <span style={{ fontSize: '36px' }}>✉️</span>
                        </div>
                        <h2
                            style={{
                                fontSize: '1.75rem',
                                fontWeight: 800,
                                color: '#FFFFFF',
                                marginBottom: '12px',
                            }}
                        >
                            Check your inbox
                        </h2>
                        <p
                            style={{
                                fontSize: '14px',
                                color: '#A7A7A7',
                                lineHeight: 1.6,
                                marginBottom: '32px',
                            }}
                        >
                            We've sent a password reset link to{' '}
                            <strong style={{ color: '#FFFFFF' }}>{email}</strong>. Please check
                            your email and follow the instructions.
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            onClick={() => navigate('/login')}
                            style={{
                                fontSize: '16px',
                                fontWeight: 700,
                                padding: '16px',
                            }}
                        >
                            Back to Login
                        </Button>
                        <p
                            style={{
                                fontSize: '13px',
                                color: '#6A6A6A',
                                marginTop: '20px',
                            }}
                        >
                            Didn't receive the email?{' '}
                            <span
                                onClick={() => setSubmitted(false)}
                                style={{
                                    color: '#1DB954',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                Try again
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
