package com.example.healthclubapi.service.impl;

import com.example.healthclubapi.controller.response.MealResponse;
import com.example.healthclubapi.dto.MealDTO;
import com.example.healthclubapi.entity.Meal;
import com.example.healthclubapi.repository.MealRepository;
import com.example.healthclubapi.service.MealService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class MealServiceImpl implements MealService {

    private static final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/src/main/uploads";
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MealRepository mealRepository;

    @Override
    public void addMeal(Meal meal) {
        mealRepository.save(meal);
    }

    public MealResponse create(MealDTO mealDTO, MultipartFile file1, String title, String ingredients, String nutritional, String information, String portionSizes, String dietaryPreferences) throws IOException {
        Meal meal = modelMapper.map(mealDTO, Meal.class);
        meal.setTitle(title);
        meal.setIngredients(ingredients);
        meal.setNutritional(nutritional);
        meal.setInformation(information);
        meal.setPortionSizes(portionSizes);
        meal.setDietaryPreferences(dietaryPreferences);

        saveFile(meal, file1, "imagePath1");

        System.out.println("Image 1 URL: " + meal.getImagePath1());

        mealRepository.save(meal);

        return modelMapper.map(meal, MealResponse.class);

    }


    private void saveFile(Meal meal, MultipartFile file, String fieldName) throws IOException {
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIRECTORY, fileName);
            Files.write(filePath, file.getBytes());

            meal.setImagePath1(fileName);
        }
    }

//    @Override
//    public List<Meal> getMeals() {return mealRepository.findAll();}
//


//    @Override
//    public Meal getMeal(Integer id) {
//        Meal meal = mealRepository
//                .findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid"));
//        return meal;
//    }

    @Override
    public MealResponse updateMeal(Integer id, MultipartFile file1,
                                   String title,
                                   String ingredients,
                                   String nutritional,
                                   String information,
                                   String portionSizes,
                                   String dietaryPreferences) throws IOException {
        Optional<Meal> optionalMeal = mealRepository.findById(id);
        if (optionalMeal.isPresent()) {
            Meal meal = optionalMeal.get();
            meal.setTitle(title);
            meal.setIngredients(ingredients);
            meal.setNutritional(nutritional);
            meal.setInformation(information);
            meal.setPortionSizes(portionSizes);
            meal.setDietaryPreferences(dietaryPreferences);

            if (file1 != null && !file1.isEmpty()) {
                saveFile(meal, file1, "imagePath1");

            }
            mealRepository.save(meal);
            return modelMapper.map(meal, MealResponse.class);
        } else {
            throw new IllegalArgumentException("Meal with ID" + id + "not found");
        }
    }

    @Override
    public List<Meal> getUsers() {
        return mealRepository.findAll();
    }

    @Override
    public Meal getMeal(Integer id) {
        return null;
    }

    @Override
    public void deleteMeal(Integer id) throws IOException {
        Optional<Meal> optionalMeal = mealRepository.findById(id);
        if (optionalMeal.isPresent()) {
            Meal meal = optionalMeal.get();
            deleteFile(meal.getImagePath1());
            mealRepository.delete(meal);
        } else {
            throw new IllegalArgumentException("Meal with ID" + id + "not found");

        }
    }


    private void deleteFile(String fileName) throws IOException {
        if (fileName != null && !fileName.isEmpty()) {
            Path filePath = Paths.get(UPLOAD_DIRECTORY, fileName);
            Files.deleteIfExists(filePath);

        }
    }

    @Override
    public Meal getMealById(Integer id) {
            return mealRepository.findById(id).orElse(null);

        
    }
}

