import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa';
import Button from '../common/Button';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <header
            style={{
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                transition: 'background-color 0.3s ease',
            }}
            className="header-blur"
        >
            {/* Navigation Arrows */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: 'none',
                    }}
                    className="icon-hover-bg"
                    aria-label="Go back"
                >
                    <FaChevronLeft style={{ fontSize: '14px' }} />
                </button>
                <button
                    onClick={() => navigate(1)}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: 'none',
                    }}
                    className="icon-hover-bg"
                    aria-label="Go forward"
                >
                    <FaChevronRight style={{ fontSize: '14px' }} />
                </button>
            </div>

            {/* Right section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Button
                    variant="outline"
                    size="sm"
                    style={{
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 700,
                        padding: '6px 16px',
                        borderRadius: '20px',
                    }}
                >
                    Explore Premium
                </Button>

                <button
                    onClick={() => navigate('/login')}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#1a1a1a',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: 'none',
                        padding: '6px',
                    }}
                    className="icon-hover-bg"
                    aria-label="User profile"
                >
                    <FaUserCircle style={{ fontSize: '20px' }} />
                </button>
            </div>
        </header>
    );
}
