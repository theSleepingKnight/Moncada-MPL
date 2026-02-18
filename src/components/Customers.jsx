import React, { useState } from 'react';
import { useSystem } from '../context/AppContext';
import { Search, UserPlus, MoreVertical, Edit2, UserX, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import Toast from './ui/Toast';

const ITEMS_PER_PAGE = 5;

const Customers = () => {
    const { customers, toggleCustomerStatus, addNewCustomer, updateCustomer } = useSystem();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [toast, setToast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // New Customer State
    const [newCustomer, setNewCustomer] = useState({
        lastName: '', firstName: '', middleName: '', extension: '',
        email: '', mobileNumber: '', address: '',
        familyRefName: '', familyRefContact: '',
        colleagueRefName: '', colleagueRefContact: ''
    });
    const [formError, setFormError] = useState('');

    // Filtering
    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
    const displayedCustomers = filteredCustomers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleAddSubmit = (e) => {
        e.preventDefault();
        setFormError('');

        // Strict Validation
        if (!newCustomer.lastName || !newCustomer.firstName || !newCustomer.middleName || !newCustomer.mobileNumber || !newCustomer.address) {
            setFormError('Please fill in all required personal and contact fields.');
            return;
        }

        const hasFamilyRef = newCustomer.familyRefName && newCustomer.familyRefContact;
        const hasColleagueRef = newCustomer.colleagueRefName && newCustomer.colleagueRefContact;

        if (!hasFamilyRef && !hasColleagueRef) {
            setFormError('Please provide at least one complete reference (Family or Work Colleague).');
            return;
        }

        // Construct full name: Last, First Middle Extension
        const fullName = `${newCustomer.lastName}, ${newCustomer.firstName} ${newCustomer.middleName} ${newCustomer.extension}`.trim();

        addNewCustomer({
            ...newCustomer,
            name: fullName,
            phone: newCustomer.mobileNumber
        });

        setIsAddModalOpen(false);
        setNewCustomer({
            lastName: '', firstName: '', middleName: '', extension: '',
            email: '', mobileNumber: '', address: '',
            familyRefName: '', familyRefContact: '',
            colleagueRefName: '', colleagueRefContact: ''
        });
        setToast({ message: 'Customer registered successfully!', type: 'success' });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editingCustomer) {
            updateCustomer(editingCustomer.id, {
                name: editingCustomer.name,
                email: editingCustomer.email,
                phone: editingCustomer.phone
            });
            setEditingCustomer(null);
            setToast({ message: 'Customer details updated.', type: 'success' });
        }
    };

    const handleToggleStatus = (customer) => {
        const action = customer.status === 'Active' ? 'disable' : 'enable';
        if (window.confirm(`Are you sure you want to ${action} this customer?`)) {
            toggleCustomerStatus(customer.id);
            setToast({ message: `Customer status updated to ${action}d.`, type: 'success' });
        }
    };

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Customer Management</h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm"
                >
                    <UserPlus size={18} />
                    Add Customer
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Joined Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {displayedCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-xs">
                                                {customer.name && customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{customer.name}</p>
                                                <p className="text-xs text-slate-500">{customer.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-700">{customer.email}</p>
                                        <p className="text-xs text-slate-500">{customer.phone}</p>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {customer.joinedDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${customer.status === 'Active'
                                                ? 'bg-green-50 text-green-700 border-green-100'
                                                : 'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}
                                        >
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setEditingCustomer(customer)}
                                                className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleStatus(customer)}
                                                className={`p-1.5 rounded-lg transition-colors ${customer.status === 'Active'
                                                    ? 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                                                    : 'text-slate-400 hover:text-green-600 hover:bg-green-50'
                                                    }`}
                                                title={customer.status === 'Active' ? 'Disable' : 'Enable'}
                                            >
                                                {customer.status === 'Active' ? <UserX size={16} /> : <UserCheck size={16} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <span className="text-xs text-slate-500">Page {currentPage} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-50"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-50"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Customer Modal (Same as before but with Toast integration via handleAddSubmit) */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 animate-in fade-in zoom-in duration-200 my-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">Registration Form</h3>
                        {formError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
                                <span className="font-bold">Error:</span> {formError}
                            </div>
                        )}
                        <form onSubmit={handleAddSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Personal Information & Address</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                                        <input
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                            value={newCustomer.lastName}
                                            onChange={e => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">First Name <span className="text-red-500">*</span></label>
                                        <input
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                            value={newCustomer.firstName}
                                            onChange={e => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Middle Name <span className="text-red-500">*</span></label>
                                        <input
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                            value={newCustomer.middleName}
                                            onChange={e => setNewCustomer({ ...newCustomer, middleName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Extension</label>
                                        <input
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                            value={newCustomer.extension}
                                            placeholder="e.g. Jr, III (Optional)"
                                            onChange={e => setNewCustomer({ ...newCustomer, extension: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Contact Information */}
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                            value={newCustomer.email}
                                            onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                                        <input
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                            value={newCustomer.mobileNumber}
                                            onChange={e => setNewCustomer({ ...newCustomer, mobileNumber: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Complete Address <span className="text-red-500">*</span></label>
                                    <textarea
                                        required
                                        rows="2"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                                        value={newCustomer.address}
                                        onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                            {/* References */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider flex justify-between items-center">
                                    References
                                    <span className="text-[10px] text-slate-500 font-normal normal-case italic bg-slate-100 px-2 py-0.5 rounded">At least one required</span>
                                </h4>
                                <div className="space-y-4">
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <p className="text-xs font-bold text-slate-700 mb-2">Family Reference</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                placeholder="Name"
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                                                value={newCustomer.familyRefName}
                                                onChange={e => setNewCustomer({ ...newCustomer, familyRefName: e.target.value })}
                                            />
                                            <input
                                                placeholder="Contact Number"
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                                                value={newCustomer.familyRefContact}
                                                onChange={e => setNewCustomer({ ...newCustomer, familyRefContact: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <p className="text-xs font-bold text-slate-700 mb-2">Work Colleague Reference</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                placeholder="Name"
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                                                value={newCustomer.colleagueRefName}
                                                onChange={e => setNewCustomer({ ...newCustomer, colleagueRefName: e.target.value })}
                                            />
                                            <input
                                                placeholder="Contact Number"
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                                                value={newCustomer.colleagueRefContact}
                                                onChange={e => setNewCustomer({ ...newCustomer, colleagueRefContact: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => { setIsAddModalOpen(false); setFormError(''); }}
                                    className="flex-1 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                                >
                                    Complete Registration
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Customer Modal (Simplified for brevity, assumes standard structure) */}
            {editingCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Customer</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                    value={editingCustomer.name}
                                    onChange={e => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                    value={editingCustomer.email}
                                    onChange={e => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                <input
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                    value={editingCustomer.phone}
                                    onChange={e => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditingCustomer(null)}
                                    className="flex-1 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
