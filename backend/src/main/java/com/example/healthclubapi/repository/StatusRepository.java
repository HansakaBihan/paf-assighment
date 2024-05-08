package com.example.healthclubapi.repository;

import com.example.healthclubapi.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Integer> {
}
