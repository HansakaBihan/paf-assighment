package com.example.healthclubapi.service;

import com.example.healthclubapi.controller.response.PostResponse;
import com.example.healthclubapi.dto.PostDTO;
import com.example.healthclubapi.entity.Post;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService {
    void addPost(Post post);

    PostResponse create(PostDTO postDTO, MultipartFile file1, MultipartFile file2, MultipartFile file3, MultipartFile video, String description) throws IOException;


    PostResponse updatePost(Integer id, MultipartFile file1, MultipartFile file2, MultipartFile file3, MultipartFile video, String description) throws IOException;

    List<Post> getUsers();

    void deletePost(Integer id) throws IOException;


    Post getPostById(Integer id);
}
