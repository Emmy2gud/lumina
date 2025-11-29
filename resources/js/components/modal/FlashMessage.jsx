import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const FlashMessage = () => {
    const { flash } = usePage().props;
  
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    if (!visible || !flash.success) return null;

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out">
            <div className="relative">
                <div className="absolute inset-0 bg-emerald-50/30 backdrop-blur-md rounded-lg -m-1"></div>
                <div className="relative flex bg-purple-500/80 text-white px-6 py-3 rounded-lg shadow-lg shadow-emerald-100 text-sm ring-1 ring-inset ring-emerald-100">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{flash.success}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashMessage;
