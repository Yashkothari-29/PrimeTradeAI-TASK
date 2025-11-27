import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, loading = false }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-500/30",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
