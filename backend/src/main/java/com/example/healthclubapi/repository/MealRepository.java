package com.example.healthclubapi.repository;

import com.example.healthclubapi.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Integer> {
}
