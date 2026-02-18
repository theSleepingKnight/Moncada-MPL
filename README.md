# Microloan Servicing Prototype

A high-fidelity Customer and Loans Management System built with React, Tailwind CSS, and Context API.

## Features

- **Dashboard**: Interactive charts for Loan Distribution, Repayment Trends, New Customers, and Revenue vs Debt.
- **Customer Management**: Add new customers, view details, and toggle status (Active/Disabled).
- **Loans Management**: Create new loan applications and approve pending loans.
- **Payment Processing**: Process loan repayments (Cashier only).
- **Staff Accounts**: Manage staff accounts (Admin only).
- **Role-Based Access Control**:
  - **Admin**: Full access.
  - **Loan Officer**: Manage customers and loans.
  - **Cashier**: Process payments.

## Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **Lucide-React** (Icons)
- **Recharts** (Data Visualization)

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Login Credentials**:
    - **Admin**: admin@test.com / password
    - **Loan Officer**: officer@test.com / password
    - **Cashier**: cashier@test.com / password

## Project Structure

- `src/components`: UI Components (Dashboard, Customers, Loans, etc.)
- `src/context`: Global state management (AppContext)
- `src/data`: Mock data for initial state
- `src/App.jsx`: Main application layout and routing logic

## Notes

- All data is volatile and resets on page refresh (no backend).
- The application uses `localStorage` is NOT implemented as per requirements (purely volatile context state).
