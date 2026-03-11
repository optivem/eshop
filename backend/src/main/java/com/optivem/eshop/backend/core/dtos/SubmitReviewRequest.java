package com.optivem.eshop.backend.core.dtos;

import lombok.Data;

@Data
public class SubmitReviewRequest {
    private String rating;
    private String comment;
}
