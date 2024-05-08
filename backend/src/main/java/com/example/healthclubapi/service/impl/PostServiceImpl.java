package com.example.healthclubapi.service.impl;

import com.example.healthclubapi.controller.response.PostResponse;
import com.example.healthclubapi.dto.PostDTO;
import com.example.healthclubapi.entity.Post;
import com.example.healthclubapi.repository.PostRepository;
import com.example.healthclubapi.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PostRepository postRepository;

    // Define the upload directory path
    private static final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/src/main/uploads";

    @Override
    public void addPost(Post post) {
        postRepository.save(post);
    }

    @Override
    public PostResponse create(PostDTO postDTO, MultipartFile file1, MultipartFile file2, MultipartFile file3, MultipartFile video, String description) throws IOException {
        // Map PostDTO to Post entity
        Post post = modelMapper.map(postDTO, Post.class);

        // Set the description
        post.setDescription(description);

        // Save file1, file2, file3, and video if provided
        saveFile(post, file1, "imagePath1");
        saveFile(post, file2, "imagePath2");
        saveFile(post, file3, "imagePath3");
        saveFile(post, video, "video"); // Save video file

        // Log URLs before sending response
        System.out.println("Image 1 URL: " + post.getImagePath1());
        System.out.println("Image 2 URL: " + post.getImagePath2());
        System.out.println("Image 3 URL: " + post.getImagePath3());
        System.out.println("Video URL: " + post.getVideoPath());

        // Save the Post entity
        postRepository.save(post);

        // Map Post entity to PostResponse
        return modelMapper.map(post, PostResponse.class);
    }


    @Override
    public PostResponse updatePost(Integer id, MultipartFile file1, MultipartFile file2, MultipartFile file3, MultipartFile video, String description) throws IOException {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setDescription(description);

            if (file1 != null && !file1.isEmpty()) {
                saveFile(post, file1, "imagePath1");
            }
            if (file2 != null && !file2.isEmpty()) {
                saveFile(post, file2, "imagePath2");
            }
            if (file3 != null && !file3.isEmpty()) {
                saveFile(post, file3, "imagePath3");
            }
            if (video != null && !video.isEmpty()) {
                saveFile(post, video, "video");
            }

            postRepository.save(post);
            return modelMapper.map(post, PostResponse.class);
        } else {
            throw new IllegalArgumentException("Post with ID " + id + " not found.");
        }
    }

    private void saveFile(Post post, MultipartFile file, String fieldName) throws IOException {
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIRECTORY, fileName);
            Files.write(filePath, file.getBytes());

            // Set the appropriate imagePath or videoPath field on the Post entity
            switch (fieldName) {
                case "imagePath1":
                    post.setImagePath1(fileName);
                    break;
                case "imagePath2":
                    post.setImagePath2(fileName);
                    break;
                case "imagePath3":
                    post.setImagePath3(fileName);
                    break;
                case "video":
                    post.setVideoPath(fileName);
                    break;
            }
        }
    }

    @Override
    public List<Post> getUsers() {
        return postRepository.findAll();
    }

    @Override
    public void deletePost(Integer id) throws IOException {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            deleteFile(post.getImagePath1());
            deleteFile(post.getImagePath2());
            deleteFile(post.getImagePath3());
            deleteFile(post.getVideoPath());
            postRepository.delete(post);
        } else {
            throw new IllegalArgumentException("Post with ID " + id + " not found.");
        }
    }

    private void deleteFile(String fileName) throws IOException {
        if (fileName != null && !fileName.isEmpty()) {
            Path filePath = Paths.get(UPLOAD_DIRECTORY, fileName);
            Files.deleteIfExists(filePath);
        }
    }

    @Override
    public Post getPostById(Integer id) {
        return postRepository.findById(id).orElse(null);
    }
}