import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'Expense', category: 'Nike' },
    { id: 2, date: '2023-10-05', amount: 150, type: 'Income', category: 'Adidas' },
  ]);

  const [form, setForm] = useState({ date: '', amount: '', type: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTransactions(transactions.map(transaction => 
        transaction.id === currentId ? { ...transaction, ...form } : transaction
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      setTransactions([...transactions, { ...form, id: transactions.length + 1 }]);
    }
    setForm({ date: '', amount: '', type: '', category: '' });
  };

  const handleEdit = (id) => {
    const transaction = transactions.find(transaction => transaction.id === id);
    setForm(transaction);
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sneaker Accounting App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium">Date</label>
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Amount</label>
          <input 
            type="number" 
            name="amount" 
            value={form.amount} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Type</label>
          <select 
            name="type" 
            value={form.type} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Category</label>
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEditing ? 'Update Transaction' : 'Add Transaction'} <FaPlus className="inline ml-2" />
        </button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Date</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Type</th>
            <th className="py-2">Category</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="border px-4 py-2">{transaction.date}</td>
              <td className="border px-4 py-2">{transaction.amount}</td>
              <td className="border px-4 py-2">{transaction.type}</td>
              <td className="border px-4 py-2">{transaction.category}</td>
              <td className="border px-4 py-2">
                <button 
                  onClick={() => handleEdit(transaction.id)} 
                  className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(transaction.id)} 
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;