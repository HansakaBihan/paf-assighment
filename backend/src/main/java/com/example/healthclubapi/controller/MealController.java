package com.example.healthclubapi.controller;

import com.example.healthclubapi.entity.Meal;
import com.example.healthclubapi.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/meal")
    public class MealController {

        @Autowired
        private MealService mealService;

        @PostMapping("/addmeal")
        public String addMeal(@RequestBody Meal meal) {
            mealService.addMeal(meal);

            return "Succefully Added";
        }
    @GetMapping
    public List<Meal> getMeals(){
        return mealService.getMeals();
    }

    @GetMapping("/getmeal")
    public Meal getMeal(@RequestParam Integer id){
        return mealService.getMeal(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateMeal(@PathVariable Integer id, @RequestBody Meal meal){
            mealService.updateMeal(id, meal);

            return  ResponseEntity.noContent().build();
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMeal(@PathVariable Integer id) {
        mealService.deleteMeal(id);

        String message = "Meal with ID " + id + " has been successfully deleted.";
        return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"" + message + "\"}");
    }

    }


