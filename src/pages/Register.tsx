import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSpotify } from 'react-icons/fa';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
    const navigate = useNavigate();
    const { register, isAuthenticated, isLoading, error } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!formData.name.trim()) errs.name = 'What should we call you?';
        if (!formData.email.trim()) errs.email = 'You need to enter your email.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'This email is invalid.';
        
        if (!formData.password) errs.password = 'You need to enter a password.';
        else if (formData.password.length < 8) errs.password = 'Your password is too short.';
        
        if (formData.password !== formData.confirmPassword) {
            errs.confirmPassword = 'Passwords do not match.';
        }
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setLocalErrors(errs);
            return;
        }
        setLocalErrors({});
        await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    Sign up to start listening
                </h1>

                {(error || Object.keys(localErrors).length > 0) && (
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
                        {error || 'Please correct the errors below.'}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>What's your name?</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: localErrors.name ? '#E91429' : '#7c7c7c' }}
                        />
                        {localErrors.name && <p style={errorText}>{localErrors.name}</p>}
                    </div>

                    <div>
                        <label style={labelStyle}>What's your email?</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: localErrors.email ? '#E91429' : '#7c7c7c' }}
                        />
                        {localErrors.email && <p style={errorText}>{localErrors.email}</p>}
                    </div>

                    <div>
                        <label style={labelStyle}>Create a password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: localErrors.password ? '#E91429' : '#7c7c7c' }}
                        />
                        {localErrors.password && <p style={errorText}>{localErrors.password}</p>}
                    </div>

                    <div>
                        <label style={labelStyle}>Confirm your password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: localErrors.confirmPassword ? '#E91429' : '#7c7c7c' }}
                        />
                        {localErrors.confirmPassword && <p style={errorText}>{localErrors.confirmPassword}</p>}
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
                        Sign Up
                    </Button>
                </form>

                <div style={{
                    textAlign: 'center',
                    marginTop: '32px',
                    paddingTop: '32px',
                    borderTop: '1px solid #292929',
                }}>
                    <span style={{ fontSize: '14px', color: '#7c7c7c' }}>Already have an account? </span>
                    <Link
                        to="/login"
                        style={{
                            fontSize: '14px',
                            color: '#FFFFFF',
                            textDecoration: 'underline',
                            fontWeight: 700,
                        }}
                    >
                        Log in here
                    </Link>
                </div>
            </div>
        </div>
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

const errorText: React.CSSProperties = {
    fontSize: '12px',
    color: '#F15E6C',
    marginTop: '6px',
    fontWeight: 500,
};
