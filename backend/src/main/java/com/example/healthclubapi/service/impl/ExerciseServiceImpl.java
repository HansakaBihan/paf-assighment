package com.example.healthclubapi.service.impl;

import com.example.healthclubapi.dto.ExerciseDTO;
import com.example.healthclubapi.entity.Exercise;
import com.example.healthclubapi.repository.ExerciseRepository;
import com.example.healthclubapi.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    public Exercise createExercise(ExerciseDTO exerciseDTO) {
        Exercise exercise = new Exercise();
        // Map DTO to entity (exercise)
        // You can use a mapper like MapStruct or manually map the fields
        exercise.setName(exerciseDTO.getName());
        exercise.setReps(exerciseDTO.getReps());
        exercise.setSets(exerciseDTO.getSets());
        return exerciseRepository.save(exercise);
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id).orElse(null);
    }

    @Override
    public Exercise updateExercise(Long id, ExerciseDTO exerciseDTO) {
        // Similar to createExercise, but you need to retrieve the existing exercise by id and update its fields
        return null;
    }

    @Override
    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
}
