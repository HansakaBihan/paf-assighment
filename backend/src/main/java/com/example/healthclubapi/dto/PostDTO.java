package com.example.healthclubapi.dto;

import lombok.Data;

@Data
public class PostDTO {
    private Integer id;

    private String description;

    private String imagePath1;
    private String imagePath2;
    private String imagePath3;
    private String videoPath;
}
