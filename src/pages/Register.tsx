import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSpotify } from 'react-icons/fa';
import Button from '../components/common/Button';

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!name.trim()) errs.name = 'Name is required';
        if (!email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
        if (!password) errs.password = 'Password is required';
        else if (password.length < 8) errs.password = 'Password must be at least 8 characters';
        if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
        return errs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        navigate('/');
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

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '14px',
        fontWeight: 700,
        color: '#FFFFFF',
        marginBottom: '8px',
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

            {/* Form Card */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    padding: '48px 32px',
                    animation: 'fadeInUp 400ms ease',
                }}
            >
                <h1
                    style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        textAlign: 'center',
                        marginBottom: '12px',
                    }}
                >
                    Sign up for free
                </h1>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#A7A7A7',
                        marginBottom: '40px',
                    }}
                >
                    Start listening with a free Spotify account
                </p>

                {/* Divider */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '32px',
                    }}
                >
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: '12px', color: '#A7A7A7', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        sign up with your email
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Name */}
                    <div>
                        <label style={labelStyle}>What's your name?</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                ...inputStyle,
                                borderColor: errors.name ? '#F15E6C' : 'rgba(255,255,255,0.3)',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#FFFFFF')}
                            onBlur={(e) => (e.target.style.borderColor = errors.name ? '#F15E6C' : 'rgba(255,255,255,0.3)')}
                        />
                        {errors.name && (
                            <p style={{ fontSize: '12px', color: '#F15E6C', marginTop: '6px' }}>{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label style={labelStyle}>What's your email?</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                ...inputStyle,
                                borderColor: errors.email ? '#F15E6C' : 'rgba(255,255,255,0.3)',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#FFFFFF')}
                            onBlur={(e) => (e.target.style.borderColor = errors.email ? '#F15E6C' : 'rgba(255,255,255,0.3)')}
                        />
                        {errors.email && (
                            <p style={{ fontSize: '12px', color: '#F15E6C', marginTop: '6px' }}>{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label style={labelStyle}>Create a password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                ...inputStyle,
                                borderColor: errors.password ? '#F15E6C' : 'rgba(255,255,255,0.3)',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#FFFFFF')}
                            onBlur={(e) => (e.target.style.borderColor = errors.password ? '#F15E6C' : 'rgba(255,255,255,0.3)')}
                        />
                        {errors.password && (
                            <p style={{ fontSize: '12px', color: '#F15E6C', marginTop: '6px' }}>{errors.password}</p>
                        )}
                        <p style={{ fontSize: '12px', color: '#6A6A6A', marginTop: '6px' }}>
                            Use 8 or more characters with a mix of letters, numbers & symbols
                        </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label style={labelStyle}>Confirm your password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                                ...inputStyle,
                                borderColor: errors.confirmPassword ? '#F15E6C' : 'rgba(255,255,255,0.3)',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#FFFFFF')}
                            onBlur={(e) => (e.target.style.borderColor = errors.confirmPassword ? '#F15E6C' : 'rgba(255,255,255,0.3)')}
                        />
                        {errors.confirmPassword && (
                            <p style={{ fontSize: '12px', color: '#F15E6C', marginTop: '6px' }}>{errors.confirmPassword}</p>
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
                        Sign Up
                    </Button>
                </form>

                {/* Toggle */}
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '32px',
                        paddingTop: '24px',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <span style={{ fontSize: '14px', color: '#A7A7A7' }}>
                        Already have an account?{' '}
                    </span>
                    <Link
                        to="/login"
                        style={{
                            fontSize: '14px',
                            color: '#FFFFFF',
                            textDecoration: 'underline',
                            fontWeight: 600,
                        }}
                    >
                        Log in here
                    </Link>
                </div>
            </div>
        </div>
    );
}
