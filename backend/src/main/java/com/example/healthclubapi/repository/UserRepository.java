package com.example.healthclubapi.repository;

import com.example.healthclubapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
