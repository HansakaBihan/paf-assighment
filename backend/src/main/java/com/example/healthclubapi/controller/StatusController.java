package com.example.healthclubapi.controller;
import com.example.healthclubapi.dto.StatusDTO;
import com.example.healthclubapi.entity.Post;
import com.example.healthclubapi.entity.Status;
import com.example.healthclubapi.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/status")
public class StatusController {

   @Autowired
    private StatusService statusService;

   @PostMapping("/add")
    public String addStatus(@RequestBody Status status) {

       statusService.addStatus(status);

       return "success add status";
   }

    @GetMapping("/get")
    public List<Status> getStatus() {
        return statusService.getStatus();
    }

//   @GetMapping("/get")
//    public Status getStatus(@RequestParam Integer id) {
//       return statusService.getStatus(id);
//   }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Integer id) {
        try {
            Status post = statusService.getStatus(id);
            if (post != null) {
                return ResponseEntity.ok(post);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching post with ID " + id);
        }
    }

   @PutMapping("/update/{id}")
    public ResponseEntity<Status> updateStatus(@PathVariable Integer id, @RequestBody Status status) {
       statusService.updateStatus(id, status);

       return ResponseEntity.noContent().build();
   }

   @DeleteMapping("/delete/{id}")
    public ResponseEntity<Status> deleteStatus(@PathVariable Integer id) {
       statusService.deleteStatus(id);

       return ResponseEntity.noContent().build();
   }

   @PatchMapping("/update-description/{id}")
   public ResponseEntity<Void> updateDescription(@PathVariable Integer id, @RequestBody StatusDTO statusDTO) {
       statusService.updateDescription(id, statusDTO);

       return ResponseEntity.noContent().build();
   }
}

