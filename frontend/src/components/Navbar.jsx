import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, CheckSquare } from 'lucide-react';
import Button from './Button';

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <div className="flex-shrink-0 flex items-center text-primary">
                            <CheckSquare className="h-8 w-8 mr-2" />
                            <span className="font-bold text-xl tracking-tight">TaskFlow</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <div className="hidden md:flex items-center text-gray-700 mr-4">
                                    <span className="text-sm font-medium">Welcome, {user.name}</span>
                                </div>
                                <Link to="/profile">
                                    <Button variant="ghost" className="!p-2">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button variant="secondary" onClick={onLogout} className="flex items-center">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
