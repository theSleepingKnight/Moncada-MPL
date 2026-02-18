import React, { useEffect, useState } from 'react';
import { XCircle, CheckCircle, AlertOctagon } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-close after 3s
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        success: 'bg-green-50 border-green-200 text-green-700',
        error: 'bg-red-50 border-red-200 text-red-700',
        warning: 'bg-orange-50 border-orange-200 text-orange-700'
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
        error: <XCircle className="w-5 h-5 flex-shrink-0" />,
        warning: <AlertOctagon className="w-5 h-5 flex-shrink-0" />
    };

    return (
        <div className={`fixed bottom-6 right-6 z-[60] p-4 rounded-xl shadow-lg border flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${styles[type]}`}>
            {icons[type]}
            <p className="font-medium text-sm">{message}</p>
            <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full transition-colors ml-2">
                <XCircle size={16} className="opacity-50" />
            </button>
        </div>
    );
};

export default Toast;
