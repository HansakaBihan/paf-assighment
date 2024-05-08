package com.example.healthclubapi.service.impl;

import com.example.healthclubapi.entity.Meal;
import com.example.healthclubapi.repository.MealRepository;
import com.example.healthclubapi.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MealServiceImpl implements MealService {
    @Autowired
private MealRepository mealRepository;
    @Override
    public void addMeal(Meal meal) {
        mealRepository.save(meal);
    }

    @Override
    public List<Meal> getMeals() {return mealRepository.findAll();}



    @Override
    public Meal getMeal(Integer id) {
      Meal meal =mealRepository
              .findById(id)
              .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid") );
        return meal;
    }

    @Override
    public void updateMeal(Integer id, Meal meal) {
        mealRepository
                .findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"invalid"+id));

        meal.setId(id);

        mealRepository.save(meal);
    }

    @Override
    public void deleteMeal(Integer id) {
       Meal meal= mealRepository
                .findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"invalid"+id));

        mealRepository.delete(meal);
    }

}
