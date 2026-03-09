import { useState } from 'react';
import { OrderStatus } from '../../types/api.types';

export interface OrderActionsProps {
  status: OrderStatus;
  isCancelling: boolean;
  onCancel: () => void;
  isDelivering: boolean;
  onDeliver: () => void;
  isSubmittingReview: boolean;
  onSubmitReview: (rating: string, comment: string) => void;
  onBack: () => void;
}

/**
 * Order actions component for order management buttons
 * Conditionally displays cancel/deliver buttons and review form based on order status
 */
export function OrderActions({ status, isCancelling, onCancel, isDelivering, onDeliver, isSubmittingReview, onSubmitReview, onBack }: OrderActionsProps) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  return (
    <div className="mt-4">
      {status === OrderStatus.PLACED && (
        <>
          <button 
            className="btn btn-danger me-2"
            aria-label="Cancel Order"
            onClick={onCancel}
            disabled={isCancelling}
          >
            {isCancelling ? 'Cancelling...' : 'Cancel Order'}
          </button>
          <button
            className="btn btn-warning me-2"
            aria-label="Deliver Order"
            onClick={onDeliver}
            disabled={isDelivering}
          >
            {isDelivering ? 'Delivering...' : 'Deliver Order'}
          </button>
        </>
      )}
      {status === OrderStatus.DELIVERED && (
        <div className="mb-3">
          <input
            type="number"
            className="form-control mb-2"
            aria-label="Rating"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
          <input
            type="text"
            className="form-control mb-2"
            aria-label="Comment"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="btn btn-success me-2"
            aria-label="Submit Review"
            onClick={() => onSubmitReview(rating, comment)}
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      )}
      <button 
        className="btn btn-secondary"
        onClick={onBack}
      >
        Back to Order History
      </button>
    </div>
  );
}
