package com.example.healthclubapi.service;

import com.example.healthclubapi.dto.WorkoutPlanDTO;
import com.example.healthclubapi.entity.WorkoutPlan;

import java.util.List;

public interface WorkoutPlanService {
    WorkoutPlan createWorkoutPlan(WorkoutPlanDTO workoutPlanDTO);

    List<WorkoutPlan> getAllWorkoutPlans();

    WorkoutPlan getWorkoutPlanById(Long id);

    WorkoutPlan updateWorkoutPlan(Long id, WorkoutPlanDTO workoutPlanDTO);

    void deleteWorkoutPlan(Long id);

    void saveWorkoutPlan(WorkoutPlanDTO workoutPlanDTO);
}

