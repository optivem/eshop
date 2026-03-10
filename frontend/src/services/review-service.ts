// Service layer for Review API operations

import { fetchJson } from '../common';
import type { SubmitReviewRequest, SubmitReviewResponse } from '../types/api.types';
import type { Result } from '../types/result.types';

class ReviewService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/reviews') {
    this.baseUrl = baseUrl;
  }

  async submitReview(orderNumber: string, rating: number, comment: string): Promise<Result<SubmitReviewResponse>> {
    const requestBody: SubmitReviewRequest = { orderNumber, rating, comment };

    return fetchJson<SubmitReviewResponse>(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
  }
}

export const reviewService = new ReviewService();
