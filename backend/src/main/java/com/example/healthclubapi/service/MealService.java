package com.example.healthclubapi.service;

import com.example.healthclubapi.controller.response.MealResponse;
import com.example.healthclubapi.dto.MealDTO;
import com.example.healthclubapi.entity.Meal;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MealService {
    void addMeal(Meal meal);

    MealResponse create(MealDTO mealDTO, MultipartFile file1, String title, String ingredients, String nutritional, String information, String portionSizes, String dietaryPreferences) throws IOException;

 MealResponse updateMeal(Integer id, MultipartFile file1, String title, String ingredients, String nutritional, String information, String portionSizes, String dietaryPreferences)throws IOException;




    List<Meal> getUsers();

    Meal getMeal(Integer id);

//    MealResponse updateMeal(Integer id, Meal meal)throws IOException;

//    MealResponse UpdateMeal(Integer id, MultipartFile file1,
//                            String title,
//                            String ingredients,
//                            String nutritional,
//                            String information,
//                            String portionSizes,
//                            String dietaryPreferences) throws IOException;

    void deleteMeal(Integer id)throws IOException;



    Meal getMealById(Integer id);

}
