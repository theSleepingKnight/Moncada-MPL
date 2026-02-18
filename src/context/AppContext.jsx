import React, { createContext, useContext, useState } from 'react';
import { USERS, INITIAL_CUSTOMERS, INITIAL_LOANS, INITIAL_TRANSACTIONS, INITIAL_LOGS } from '../data/mockData';

const AppContext = createContext();

export const SystemProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
    const [loans, setLoans] = useState(INITIAL_LOANS);
    const [staffAccounts, setStaffAccounts] = useState(USERS.slice(0, 3));
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [auditLogs, setAuditLogs] = useState(INITIAL_LOGS);

    const login = (email, password) => {
        const user = staffAccounts.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const canAccess = (requiredRole) => {
        if (!currentUser) return false;
        if (Array.isArray(requiredRole)) {
            return requiredRole.includes(currentUser.role);
        }
        return currentUser.role === requiredRole;
    };

    const logAction = (action) => {
        const newLog = {
            id: `log_${Date.now()}`,
            action,
            user: currentUser ? currentUser.name : 'System',
            timestamp: new Date().toISOString()
        };
        setAuditLogs(prev => [newLog, ...prev]);
    };

    // --- Transactions & Loans ---

    const processPayment = (loanId, amount) => {
        // 1. Update Loan Balance
        setLoans(prevLoans => prevLoans.map(loan => {
            if (loan.id === loanId) {
                const newBalance = Math.max(0, loan.remainingBalance - amount);
                const newStatus = newBalance === 0 ? 'Paid' : loan.status;
                return { ...loan, remainingBalance: newBalance, status: newStatus };
            }
            return loan;
        }));

        // 2. Add Transaction Record
        const newTransaction = {
            id: `txn_${Date.now()}`,
            loanId,
            amount,
            date: new Date().toISOString().split('T')[0],
            processedBy: currentUser ? currentUser.id : 'Unknown'
        };
        setTransactions(prev => [newTransaction, ...prev]);

        // 3. Log Action
        logAction(`Processed payment of ₱${amount} for Loan #${loanId}`);
    };

    const createLoan = (loanData) => {
        const newLoan = {
            ...loanData,
            id: `l_${Date.now()}`,
            status: 'Pending',
            remainingBalance: loanData.amount,
            startDate: new Date().toISOString().split('T')[0]
        };
        setLoans([...loans, newLoan]);
        logAction(`Created loan application for ₱${loanData.amount}`);
    };

    const updateLoanStatus = (loanId, status) => {
        setLoans(prev => prev.map(l => l.id === loanId ? { ...l, status } : l));
        logAction(`Updated Loan #${loanId} status to ${status}`);
    };

    const updateLoan = (loanId, updates) => {
        setLoans(prev => prev.map(l => l.id === loanId ? { ...l, ...updates } : l));
        logAction(`Updated details for Loan #${loanId}`);
    };

    // --- Customers ---

    const addNewCustomer = (customerData) => {
        const newCustomer = {
            ...customerData,
            id: `c_${Date.now()}`,
            joinedDate: new Date().toISOString().split('T')[0],
            status: 'Active'
        };
        setCustomers([...customers, newCustomer]);
        logAction(`Registered new customer: ${customerData.name}`);
        return newCustomer;
    };

    const updateCustomer = (customerId, updates) => {
        setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, ...updates } : c));
        logAction(`Updated customer profile: ${customerId}`);
    };

    const toggleCustomerStatus = (customerId) => {
        setCustomers(prevCustomers => prevCustomers.map(c => {
            if (c.id === customerId) {
                const newStatus = c.status === 'Active' ? 'Disabled' : 'Active';
                logAction(`Changed customer ${c.name} status to ${newStatus}`);
                return { ...c, status: newStatus };
            }
            return c;
        }));
    };

    // --- Staff Accounts ---

    const createStaffAccount = (newAccount) => {
        if (staffAccounts.some(u => u.email === newAccount.email)) {
            throw new Error('Email already exists');
        }
        setStaffAccounts([...staffAccounts, { ...newAccount, id: `staff_${Date.now()}`, status: 'Active' }]);
        logAction(`Created staff account: ${newAccount.email}`);
    };

    const updateStaffAccount = (accountId, updates) => {
        setStaffAccounts(prevAccounts => prevAccounts.map(account => {
            if (account.id === accountId) {
                return { ...account, ...updates };
            }
            return account;
        }));
        logAction(`Updated staff account: ${accountId}`);
    };

    const deleteStaffAccount = (accountId) => {
        setStaffAccounts(prevAccounts => prevAccounts.filter(account => account.id !== accountId));
        logAction(`Deleted staff account: ${accountId}`);
    };

    return (
        <AppContext.Provider value={{
            currentUser,
            customers,
            loans,
            staffAccounts,
            transactions,
            auditLogs,
            login,
            logout,
            canAccess,
            processPayment,
            createLoan,
            updateLoanStatus,
            updateLoan,
            addNewCustomer,
            updateCustomer,
            toggleCustomerStatus,
            createStaffAccount,
            updateStaffAccount,
            deleteStaffAccount,
            logAction
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useSystem = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useSystem must be used within a SystemProvider');
    }
    return context;
};
