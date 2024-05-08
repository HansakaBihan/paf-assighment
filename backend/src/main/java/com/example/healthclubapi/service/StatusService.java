package com.example.healthclubapi.service;

import com.example.healthclubapi.dto.StatusDTO;
import com.example.healthclubapi.entity.Status;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StatusService {
    void addStatus(Status status);


    List<Status> getStatus();

    Status getStatus(Integer id);

    void updateStatus(Integer id, Status status);

    void deleteStatus(Integer id);

    void updateDescription(Integer id, StatusDTO statusDTO);
}
