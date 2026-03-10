package com.optivem.eshop.backend.core.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "review_id", nullable = false, unique = true)
    private String reviewId;

    @Column(name = "order_number", nullable = false)
    private String orderNumber;

    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Column(name = "comment", nullable = false)
    private String comment;

    public Review(String reviewId, String orderNumber, Integer rating, String comment) {
        if (reviewId == null || reviewId.trim().isEmpty()) {
            throw new IllegalArgumentException("reviewId cannot be null or empty");
        }
        if (orderNumber == null || orderNumber.trim().isEmpty()) {
            throw new IllegalArgumentException("orderNumber cannot be null or empty");
        }
        if (rating == null) {
            throw new IllegalArgumentException("rating cannot be null");
        }
        if (comment == null || comment.trim().isEmpty()) {
            throw new IllegalArgumentException("comment cannot be null or empty");
        }

        this.reviewId = reviewId;
        this.orderNumber = orderNumber;
        this.rating = rating;
        this.comment = comment;
    }
}
