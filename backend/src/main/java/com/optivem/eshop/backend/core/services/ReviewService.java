package com.optivem.eshop.backend.core.services;

import com.optivem.eshop.backend.core.dtos.SubmitReviewRequest;
import com.optivem.eshop.backend.core.dtos.SubmitReviewResponse;
import com.optivem.eshop.backend.core.entities.OrderStatus;
import com.optivem.eshop.backend.core.entities.Review;
import com.optivem.eshop.backend.core.exceptions.NotExistValidationException;
import com.optivem.eshop.backend.core.exceptions.ValidationException;
import com.optivem.eshop.backend.core.repositories.OrderRepository;
import com.optivem.eshop.backend.core.repositories.ReviewRepository;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;

    public ReviewService(ReviewRepository reviewRepository, OrderRepository orderRepository) {
        this.reviewRepository = reviewRepository;
        this.orderRepository = orderRepository;
    }

    public SubmitReviewResponse submitReview(SubmitReviewRequest request) {
        var orderNumber = request.getOrderNumber();

        var optionalOrder = orderRepository.findByOrderNumber(orderNumber);

        if (optionalOrder.isEmpty()) {
            throw new NotExistValidationException("Order " + orderNumber + " does not exist.");
        }

        var order = optionalOrder.get();

        if (order.getStatus() != OrderStatus.DELIVERED) {
            throw new ValidationException("Order must be delivered before a review can be submitted");
        }

        var reviewId = generateReviewId();

        var review = new Review(reviewId, orderNumber, request.getRating(), request.getComment());
        reviewRepository.save(review);

        var response = new SubmitReviewResponse();
        response.setReviewId(reviewId);
        return response;
    }

    private String generateReviewId() {
        var uuid = java.util.UUID.randomUUID().toString().toUpperCase();
        return "REV-" + uuid;
    }
}
