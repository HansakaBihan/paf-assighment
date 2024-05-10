package com.example.healthclubapi.controller;

import com.example.healthclubapi.controller.response.MealResponse;
import com.example.healthclubapi.dto.MealDTO;
import com.example.healthclubapi.entity.Meal;
import com.example.healthclubapi.entity.Post;
import com.example.healthclubapi.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/meal")
@CrossOrigin(origins = "http://localhost:3000")
public class MealController {

    @Autowired
    private MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }


    @PostMapping("/addmeal")
    public MealResponse create(@ModelAttribute MealDTO mealDTO,
                               @RequestParam("file1") MultipartFile file1,
                               @RequestParam("title") String title,
                               @RequestParam("ingredients") String ingredients,
                               @RequestParam("nutritional") String nutritional,
                               @RequestParam("information") String information,
                               @RequestParam("portionSizes") String portionSizes,
                               @RequestParam("dietaryPreferences") String dietaryPreferences) throws IOException {
        return mealService.create(mealDTO, file1, title, ingredients, nutritional, information, portionSizes, dietaryPreferences) ;

    }





    @GetMapping("/getmeal")
    public List<Meal> getMeal(){return mealService.getUsers();}


    @PutMapping("/update/{id}")
    public MealResponse updateMeal(@PathVariable Integer id,
                                   @RequestParam(value = "file1", required = false) MultipartFile file1,
                                   @RequestParam("title") String title,
                                   @RequestParam("ingredients") String ingredients,
                                   @RequestParam("nutritional") String nutritional,
                                   @RequestParam("information") String information,
                                   @RequestParam("portionSizes") String portionSizes,
                                   @RequestParam("dietaryPreferences") String dietaryPreferences) throws IOException {
        return mealService.updateMeal(id, file1, title, ingredients, nutritional, information, portionSizes, dietaryPreferences);
    }





    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMeal(@PathVariable Integer id) {
        try {
            mealService.deleteMeal(id);
            return ResponseEntity.ok("Meal with ID " + id + " deleted successfully.");
        } catch (IllegalArgumentException | IOException e) {
            return ResponseEntity.badRequest().body("Meal with ID " + id + " not found.");
        }
    }
    @GetMapping("/meal/{id}")
    public ResponseEntity<?> getMealById(@PathVariable Integer id) {
        try {
            Meal meal = mealService.getMealById(id);
            if (meal != null) {
                return ResponseEntity.ok(meal);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching meal with ID " + id);
        }
    }
}