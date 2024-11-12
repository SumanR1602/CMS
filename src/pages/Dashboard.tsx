import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, AlertCircle, CheckCircle, Clock, MessageSquare, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import FeedbackForm from '../components/FeedbackForm';

interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

const Dashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setComplaints(data);
      } else {
        toast.error('Failed to fetch complaints');
      }
    } catch (error) {
      toast.error('Error fetching complaints');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'In Progress':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'Resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
        <Link
          to="/complaints/new"
          className="flex items-center space-x-2 btn-primary"
        >
          <PlusCircle className="h-5 w-5" />
          <span>New Complaint</span>
        </Link>
      </div>

      {complaints.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No complaints found
          </h3>
          <p className="text-gray-500">
            Start by creating your first complaint
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {complaint.title}
                </h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(complaint.status)}
                  <span
                    className={`text-sm font-medium ${complaint.status === 'Resolved'
                        ? 'text-green-600'
                        : complaint.status === 'Rejected'
                          ? 'text-red-600'
                          : 'text-blue-600'
                      }`}
                  >
                    {complaint.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{complaint.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex space-x-4">
                  <span>Category: {complaint.category}</span>
                  <span>
                    Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {complaint.status === 'Resolved'  && !complaint.feedback && (
                  <button
                    onClick={() => setSelectedComplaint(complaint._id)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Leave Feedback</span>
                  </button>
                )}
              </div>

              {selectedComplaint === complaint._id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <FeedbackForm
                    complaintId={complaint._id}
                    onFeedbackSubmit={() => {
                      setSelectedComplaint(null);
                      fetchComplaints();
                    }}
                  />
                </div>
              )}

              {complaint.feedback && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Your Feedback</h4>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < (complaint.feedback?.rating ?? 0) // Safely access rating with optional chaining
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{complaint.feedback?.comment ?? 'No feedback provided'}</p>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;