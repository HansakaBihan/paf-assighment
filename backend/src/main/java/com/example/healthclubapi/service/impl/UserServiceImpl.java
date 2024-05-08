package com.example.healthclubapi.service.impl;

import com.example.healthclubapi.dto.UserDTO;
import com.example.healthclubapi.entity.User;
import com.example.healthclubapi.repository.UserRepository;
import com.example.healthclubapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public void addUser(User user) {

        userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id" + id));
        return user;
    }

    @Override
    public void updateUser(Integer id, User user) {
        //check whether the user is in database or not
        userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id" + id));

        user.setId(id);

        userRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        //check weather the user is in database or not

      User user =   userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id" + id));

        userRepository.delete(user);

    }

    @Override
    public void updateName(Integer id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id" + id));

        user.setName(userDTO.getName());

        userRepository.save(user);
    }


}
