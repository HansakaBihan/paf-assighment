package com.example.healthclubapi.service.impl;

import com.example.healthclubapi.dto.StatusDTO;
import com.example.healthclubapi.entity.Status;
import com.example.healthclubapi.repository.StatusRepository;
import com.example.healthclubapi.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;
    @Override
    public void addStatus(Status status) {

        statusRepository.save(status);
    }

    @Override
    public List<Status> getStatus() {
        return statusRepository.findAll();
    }

    @Override
    public Status getStatus(Integer id) {
        Status status = statusRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid status id" + id));
        return status;
    }

    @Override
    public void updateStatus(Integer id, Status status) {
        //check whether the status is in database or not
        statusRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid status id" + id));

        status.setId(id);

        statusRepository.save(status);
    }

    @Override
    public void deleteStatus(Integer id) {
        //check weather the status is in database or not

      Status status =   statusRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid status id" + id));

        statusRepository.delete(status);

    }

    @Override
    public void updateDescription(Integer id, StatusDTO statusDTO) {
        Status status = statusRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid status id" + id));

        status.setDescription(statusDTO.getDescription());

        statusRepository.save(status);
    }
}
