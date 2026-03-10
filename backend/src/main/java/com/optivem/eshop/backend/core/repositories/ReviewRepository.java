package com.optivem.eshop.backend.core.repositories;

import com.optivem.eshop.backend.core.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByOrderNumber(String orderNumber);
}
