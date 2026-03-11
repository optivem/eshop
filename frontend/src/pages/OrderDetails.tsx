import { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, DataState } from '../components';
import { OrderDetailView, OrderActions } from '../features/orders';
import { useOrderDetails } from '../hooks';
import { useNotificationContext } from '../contexts/NotificationContext';

/**
 * Order Details page component for viewing individual order information
 * Allows users to view detailed order information and cancel orders if status is PLACED
 */
export function OrderDetails() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const { order, isLoading, error, isCancelling, cancelOrder, isDelivering, deliverOrder, isSubmittingReview, submitReview } = useOrderDetails(orderNumber);
  const { setSuccess, handleResult } = useNotificationContext();
  const [reviewRating, setReviewRating] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const handleCancel = useCallback(async () => {
    handleResult(await cancelOrder(), () => {
      setSuccess('Order cancelled successfully!');
    });
  }, [cancelOrder, setSuccess, handleResult]);

  const handleDeliver = useCallback(async () => {
    handleResult(await deliverOrder(), () => {
      setSuccess('Order delivered successfully!');
    });
  }, [deliverOrder, setSuccess, handleResult]);

  const handleSubmitReview = useCallback(async () => {
    handleResult(await submitReview(reviewRating, reviewComment), () => {
      setSuccess('Review submitted successfully!');
    });
  }, [submitReview, reviewRating, reviewComment, setSuccess, handleResult]);

  return (
    <Layout
      title="Order Details"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Order History', path: '/order-history' },
        { label: 'Order Details' }
      ]}
    >
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Order Details</h4>
        </div>
        <div className="card-body">
          <DataState
            isLoading={isLoading}
            error={error}
            isEmpty={!order}
            loadingMessage="Loading order details..."
            emptyMessage="Order not found"
          >
            {order && (
              <>
                <OrderDetailView order={order} />
                <div className="row mt-3">
                  <div className="col-md-6 mb-3">
                    <strong>Review Rating:</strong>
                    <p aria-label="Display Review Rating">{order.reviewRating || '\u00A0'}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Review Comment:</strong>
                    <p aria-label="Display Review Comment">{order.reviewComment || '\u00A0'}</p>
                  </div>
                </div>
                {!order.reviewRating && (
                  <div className="mt-3">
                    <h5>Submit Review</h5>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="reviewRating">Rating</label>
                        <input
                          id="reviewRating"
                          type="text"
                          className="form-control"
                          aria-label="Review Rating"
                          value={reviewRating}
                          onChange={(e) => setReviewRating(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="reviewComment">Comment</label>
                        <input
                          id="reviewComment"
                          type="text"
                          className="form-control"
                          aria-label="Review Comment"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      aria-label="Submit Review"
                      onClick={handleSubmitReview}
                      disabled={isSubmittingReview}
                    >
                      {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                )}
                <OrderActions
                  status={order.status}
                  isCancelling={isCancelling}
                  onCancel={handleCancel}
                  isDelivering={isDelivering}
                  onDeliver={handleDeliver}
                  onBack={() => navigate('/order-history')}
                />
              </>
            )}
          </DataState>
        </div>
      </div>
    </Layout>
  );
}
