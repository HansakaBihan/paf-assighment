package com.example.healthclubapi.service;

import com.example.healthclubapi.dto.ExerciseDTO;
import com.example.healthclubapi.entity.Exercise;

import java.util.List;

public interface ExerciseService {
    Exercise createExercise(ExerciseDTO exerciseDTO);

    List<Exercise> getAllExercises();

    Exercise getExerciseById(Long id);

    Exercise updateExercise(Long id, ExerciseDTO exerciseDTO);

    void deleteExercise(Long id);
}
