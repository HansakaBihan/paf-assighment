package com.example.healthclubapi.controller;

import com.example.healthclubapi.dto.WorkoutPlanDTO;
import com.example.healthclubapi.entity.WorkoutPlan;
import com.example.healthclubapi.service.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout-plans")
@CrossOrigin(origins = "http://localhost:3000")

public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @PostMapping("/workout/save")
    public ResponseEntity<String> saveWorkoutPlan(@RequestBody WorkoutPlanDTO workoutPlanDTO) {
        try {
            workoutPlanService.createWorkoutPlan(workoutPlanDTO);
            return ResponseEntity.ok("Workout plan saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving workout plan");
        }
    }

    @GetMapping("/workouts")
    public ResponseEntity<List<WorkoutPlan>> getAllWorkoutPlans() {
        List<WorkoutPlan> workoutPlans = workoutPlanService.getAllWorkoutPlans();
        if (!workoutPlans.isEmpty()) {
            return ResponseEntity.ok(workoutPlans);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/workout-plans/{id}")
    public ResponseEntity<WorkoutPlan> getWorkoutPlanById(@PathVariable Long id) {
        WorkoutPlan workoutPlan = workoutPlanService.getWorkoutPlanById(id);
        if (workoutPlan != null) {
            return ResponseEntity.ok(workoutPlan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/update")
    public ResponseEntity<WorkoutPlan> updateWorkoutPlan(@RequestBody WorkoutPlanDTO workoutPlanDTO) {
        WorkoutPlan updatedWorkoutPlan = workoutPlanService.updateWorkoutPlan(workoutPlanDTO);
        return ResponseEntity.ok(updatedWorkoutPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkoutPlan(@PathVariable Long id) {
        workoutPlanService.deleteWorkoutPlan(id);
        return ResponseEntity.ok("Workout plan with ID " + id + " deleted successfully.");
    }
}

