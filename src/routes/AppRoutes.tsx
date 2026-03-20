import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Playlist from '../pages/Playlist';
import Album from '../pages/Album';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route 
                path="/" 
                element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} 
            />
            <Route 
                path="/search" 
                element={isAuthenticated ? <Search /> : <Navigate to="/login" replace />} 
            />
            <Route 
                path="/playlist/:id" 
                element={isAuthenticated ? <Playlist /> : <Navigate to="/login" replace />} 
            />
            <Route 
                path="/album/:id" 
                element={isAuthenticated ? <Album /> : <Navigate to="/login" replace />} 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
}
