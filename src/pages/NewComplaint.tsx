import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = [
  'Infrastructure',
  'Public Services',
  'Environmental',
  'Other',
];

const NewComplaint = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Complaint submitted successfully!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Failed to submit complaint');
      }
    } catch (error) {
      toast.error('An error occurred while submitting the complaint');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-8">
          <Send className="h-8 w-8 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Submit Complaint</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="input-field"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Brief title of your complaint"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              className="input-field"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="input-field min-h-[150px]"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Detailed description of your complaint"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewComplaint;