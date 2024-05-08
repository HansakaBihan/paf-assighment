package com.example.healthclubapi.controller.response;

import lombok.Data;

@Data
public class PostResponse {

    private Integer id;

    private String description;

    // File paths matching the Post entity fields
    private String imagePath1;
    private String imagePath2;
    private String imagePath3;
}
