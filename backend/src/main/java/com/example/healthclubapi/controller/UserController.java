package com.example.healthclubapi.controller;
import com.example.healthclubapi.dto.UserDTO;
import com.example.healthclubapi.entity.User;
import com.example.healthclubapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

   @Autowired
    private UserService userService;

   @PostMapping("/add")
    public String addUser(@RequestBody User user) {

       userService.addUser(user);

       return "success add user";
   }

   @GetMapping
    public List<User> getUsers() {
       return userService.getUsers();
   }

   @GetMapping("/get")
    public User getUser(@RequestParam Integer id) {
       return userService.getUser(id);
   }

   @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
       userService.updateUser(id, user);

       return ResponseEntity.noContent().build();
   }

   @DeleteMapping("/delete/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Integer id) {
       userService.deleteUser(id);

       return ResponseEntity.noContent().build();
   }

   @PatchMapping("/update-name/{id}")
   public ResponseEntity<Void> updateName(@PathVariable Integer id, @RequestBody UserDTO userDTO) {
       userService.updateName(id, userDTO);

       return ResponseEntity.noContent().build();
   }
}

