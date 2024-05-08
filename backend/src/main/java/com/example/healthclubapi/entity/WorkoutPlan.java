package com.example.healthclubapi.entity;

import com.example.healthclubapi.dto.ExerciseDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class WorkoutPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int age;
    private double weight;
    private double height;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "workout_plan_id")
    private List<Exercise> exercises;

    public void setExercises(List<ExerciseDTO> exercises) {
        // Your setter logic here if needed
    }
}
