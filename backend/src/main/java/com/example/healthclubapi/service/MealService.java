package com.example.healthclubapi.service;

import com.example.healthclubapi.entity.Meal;

import java.util.List;

public interface MealService {
    void addMeal(Meal meal);

    List<Meal> getMeals();

    Meal getMeal(Integer id);

    void updateMeal(Integer id, Meal meal);

    void deleteMeal(Integer id);
}
