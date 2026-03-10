package com.optivem.eshop.backend.core.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SubmitReviewResponse {
    private String reviewId;
}
