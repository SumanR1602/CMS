import React, { useState } from 'react';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface FeedbackFormProps {
  complaintId: string;
  onFeedbackSubmit: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ complaintId, onFeedbackSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (response.ok) {
        toast.success('Feedback submitted successfully');
        onFeedbackSubmit();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to submit feedback: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('An error occurred while submitting feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  value <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="input-field min-h-[100px]"
          placeholder="Share your experience..."
          required
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;