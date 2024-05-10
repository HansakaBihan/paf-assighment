package com.example.healthclubapi.controller.response;

import lombok.Data;

@Data
public class   MealResponse {

    private Integer id;
    private String title;
    private String ingredients;
    private String nutritional;
    private String information;
    private String portionSizes;
    private String dietaryPreferences;
    private String imagePath1;
}


