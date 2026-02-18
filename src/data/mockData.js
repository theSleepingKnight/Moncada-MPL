export const USERS = [
    { id: 'admin1', email: 'admin@test.com', name: 'Juan Dela Cruz', role: 'admin', password: 'password' },
    { id: 'officer1', email: 'officer@test.com', name: 'Maria Santos', role: 'officer', password: 'password' },
    { id: 'cashier1', email: 'cashier@test.com', name: 'Jose Rizal', role: 'cashier', password: 'password' },
];

export const INITIAL_CUSTOMERS = [
    { id: 'c1', name: 'Francisco Baltazar', email: 'kiko@example.com', phone: '0917-123-4567', status: 'Active', joinedDate: '2023-01-15', address: 'Tondo, Manila' },
    { id: 'c2', name: 'Gabriela Silang', email: 'gabby@example.com', phone: '0918-234-5678', status: 'Active', joinedDate: '2023-02-20', address: 'Vigan, Ilocos Sur' },
    { id: 'c3', name: 'Andres Bonifacio', email: 'andres@example.com', phone: '0919-345-6789', status: 'Disabled', joinedDate: '2023-03-10', address: 'Tondo, Manila' },
    { id: 'c4', name: 'Melchora Aquino', email: 'tandang.sora@example.com', phone: '0920-456-7890', status: 'Active', joinedDate: '2023-04-05', address: 'Caloocan City' },
    { id: 'c5', name: 'Emilio Aguinaldo', email: 'emilio@example.com', phone: '0921-567-8901', status: 'Active', joinedDate: '2023-05-12', address: 'Kawit, Cavite' },
];

export const INITIAL_LOANS = [
    { id: 'l1', customerId: 'c1', loanType: 'Regular Loan', amount: 25000, interestRate: 3, term: 12, status: 'Active', remainingBalance: 21000, startDate: '2023-06-01' },
    { id: 'l2', customerId: 'c2', loanType: 'Housing Loan', amount: 30000, interestRate: 2, term: 24, status: 'Pending', remainingBalance: 30000, startDate: '2023-07-15' },
    { id: 'l3', customerId: 'c4', loanType: 'Multi-Purpose Loan', amount: 10000, interestRate: 0, term: 6, status: 'Paid', remainingBalance: 0, startDate: '2023-01-10' },
    { id: 'l4', customerId: 'c5', loanType: 'Regular Loan', amount: 35000, interestRate: 3.5, term: 18, status: 'Active', remainingBalance: 32000, startDate: '2023-08-20' },
    { id: 'l5', customerId: 'c1', loanType: 'Multi-Purpose Loan', amount: 5000, interestRate: 0, term: 6, status: 'Pending', remainingBalance: 5000, startDate: '2023-09-01' },
];

export const INITIAL_TRANSACTIONS = [
    { id: 't1', loanId: 'l1', amount: 4000, date: '2023-07-01', processedBy: 'cashier1' },
    { id: 't2', loanId: 'l3', amount: 10000, date: '2023-06-15', processedBy: 'cashier1' },
];

export const INITIAL_LOGS = [
    { id: 'log1', action: 'Created Loan #l1', user: 'officer1', timestamp: '2023-06-01T08:30:00' },
    { id: 'log2', action: 'Approved Loan #l1', user: 'admin1', timestamp: '2023-06-02T09:15:00' },
];
