package com.example.healthclubapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Status {

    @Id
    @GeneratedValue
    private Integer id;

    private Number distanceRan;

    private Integer pushupsCompleted;

    private Number weightLifted;

    private String description;


}
