package com.example.healthclubapi.entity;

import com.example.healthclubapi.dto.ExerciseDTO;
import com.example.healthclubapi.entity.Exercise;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public void setExercises(List<ExerciseDTO> exerciseDTOs) {
        if (exerciseDTOs == null) {
            this.exercises = null; // or clear the list if you want to remove all exercises
            return;
        }

        // Convert ExerciseDTO to Exercise
        List<Exercise> convertedExercises = new ArrayList<>();
        for (ExerciseDTO dto : exerciseDTOs) {
            Exercise exercise = new Exercise();
            exercise.setName(dto.getName());
            exercise.setReps(dto.getReps());
            exercise.setSets(dto.getSets());
            // Assuming other properties to be set as well, adjust as needed
            convertedExercises.add(exercise);
        }

        this.exercises = convertedExercises;
    }
}
