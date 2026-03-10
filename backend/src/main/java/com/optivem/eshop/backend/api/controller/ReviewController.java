package com.optivem.eshop.backend.api.controller;

import com.optivem.eshop.backend.core.dtos.SubmitReviewRequest;
import com.optivem.eshop.backend.core.dtos.SubmitReviewResponse;
import com.optivem.eshop.backend.core.services.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<SubmitReviewResponse> submitReview(@Valid @RequestBody SubmitReviewRequest request) {
        var response = reviewService.submitReview(request);
        var location = URI.create("/api/reviews/" + response.getReviewId());
        return ResponseEntity.created(location).body(response);
    }
}
