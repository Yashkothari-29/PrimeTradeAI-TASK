import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 'medium', className = '' }) => {
    const sizes = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12',
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <Loader2 className={`${sizes[size]} animate-spin text-primary`} />
        </div>
    );
};

export default Loader;
