package com.example.healthclubapi.service.impl;

import com.example.healthclubapi.dto.WorkoutPlanDTO;
import com.example.healthclubapi.entity.WorkoutPlan;
import com.example.healthclubapi.repository.WorkoutPlanRepository;
import com.example.healthclubapi.service.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutPlanServiceImpl implements WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Override
    public WorkoutPlan createWorkoutPlan(WorkoutPlanDTO workoutPlanDTO) {
        WorkoutPlan workoutPlan = new WorkoutPlan();
        // Map DTO to entity (workoutPlan)
        // You can use a mapper like MapStruct or manually map the fields
        workoutPlan.setName(workoutPlanDTO.getName());
        workoutPlan.setAge(workoutPlanDTO.getAge());
        workoutPlan.setWeight(workoutPlanDTO.getWeight());
        workoutPlan.setHeight(workoutPlanDTO.getHeight());
        workoutPlan.setExercises(workoutPlanDTO.getExercises());
        workoutPlanRepository.save(workoutPlan);
        return workoutPlan;
    }

    @Override
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    @Override
    public WorkoutPlan getWorkoutPlanById(Long id) {
        return workoutPlanRepository.findById(id).orElse(null);
    }

    @Override
    public WorkoutPlan updateWorkoutPlan(Long id, WorkoutPlanDTO workoutPlanDTO) {
        // Similar to createWorkoutPlan, but you need to retrieve the existing workoutPlan by id and update its fields
        return null;
    }

    @Override
    public void deleteWorkoutPlan(Long id) {
        workoutPlanRepository.deleteById(id);
    }

    @Override
    public void saveWorkoutPlan(WorkoutPlanDTO workoutPlanDTO) {

    }
}
