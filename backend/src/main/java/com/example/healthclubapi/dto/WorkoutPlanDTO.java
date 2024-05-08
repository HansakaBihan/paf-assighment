package com.example.healthclubapi.dto;

import lombok.Data;

import java.util.List;

@Data
public class WorkoutPlanDTO {
    private String name;
    private int age;
    private double weight;
    private double height;
    private List<ExerciseDTO> exercises;
}

