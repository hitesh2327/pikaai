import React from 'react';
import { Navigate } from 'react-router-dom';
import { tokenUtils } from '../utils/token';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = tokenUtils.getAccessToken();
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};
