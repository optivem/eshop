import { FormEvent, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components';
import { useNotificationContext } from '../contexts/NotificationContext';
import { reviewService } from '../services/review-service';

/**
 * Submit Review page component for submitting a review on a delivered order
 */
export function SubmitReview() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { setSuccess, handleResult } = useNotificationContext();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!orderNumber) return;

    setIsSubmitting(true);
    const result = await reviewService.submitReview(orderNumber, Number(rating), comment);
    setIsSubmitting(false);

    handleResult(result, (data) => {
      setSuccess(`Success! Review has been submitted with Review ID ${data.reviewId}`);
    });
  }, [orderNumber, rating, comment, handleResult, setSuccess]);

  return (
    <Layout
      title="Submit Review"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Order History', path: '/order-history' },
        { label: 'Submit Review' }
      ]}
    >
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Submit Review</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">Rating</label>
                  <input
                    type="text"
                    className="form-control"
                    id="rating"
                    aria-label="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="comment" className="form-label">Comment</label>
                  <input
                    type="text"
                    className="form-control"
                    id="comment"
                    aria-label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  aria-label="Submit Review"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
