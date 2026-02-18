import React from 'react';
import { SystemProvider, useSystem } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Loans from './components/Loans';
import Payments from './components/Payments';
import Accounts from './components/Accounts';


// AppContent - Internal component to use context
const AppContent = () => {
    const { currentUser } = useSystem();
    // We need to manage activeView state. 
    // It's better to lift this to top level or context, but for simplicity local state in AppContent works.
    const [activeView, setActiveView] = React.useState('dashboard');

    if (!currentUser) {
        return <Login />;
    }

    // Determine which component to render
    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'customers':
                return <Customers />;
            case 'loans':
                return <Loans />;
            case 'payments':
                return <Payments />;
            case 'accounts':
                return <Accounts />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1 ml-64 p-8 animate-in fade-in duration-300 min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

const App = () => {
    return (
        <SystemProvider>
            <AppContent />
        </SystemProvider>
    );
};

export default App;
