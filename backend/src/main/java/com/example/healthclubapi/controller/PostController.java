package com.example.healthclubapi.controller;

import com.example.healthclubapi.controller.response.PostResponse;
import com.example.healthclubapi.dto.PostDTO;
import com.example.healthclubapi.entity.Post;
import com.example.healthclubapi.entity.User;
import com.example.healthclubapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/posts")
    public PostResponse create(@ModelAttribute PostDTO postDTO,
                               @RequestParam("file1") MultipartFile file1,
                               @RequestParam("file2") MultipartFile file2,
                               @RequestParam("file3") MultipartFile file3,
                               @RequestParam("video") MultipartFile video,
                               @RequestParam("description") String description) throws IOException {
        return postService.create(postDTO, file1, file2, file3, video, description);
    }





    @GetMapping("/get")
    public List<Post> getPosts() {
        return postService.getUsers();
    }

    @PutMapping("/posts/{id}")
    public PostResponse updatePost(@PathVariable Integer id,
                                   @RequestParam(value = "file1", required = false) MultipartFile file1,
                                   @RequestParam(value = "file2", required = false) MultipartFile file2,
                                   @RequestParam(value = "file3", required = false) MultipartFile file3,
                                   @RequestParam(value = "video", required = false) MultipartFile video,
                                   @RequestParam("description") String description) throws IOException {
        return postService.updatePost(id, file1, file2, file3, video, description);
    }
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Integer id) {
        try {
            postService.deletePost(id);
            return ResponseEntity.ok("Post with ID " + id + " deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Post with ID " + id + " not found.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error deleting files associated with post with ID " + id + ".");
        }
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Integer id) {
        try {
            Post post = postService.getPostById(id);
            if (post != null) {
                return ResponseEntity.ok(post);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching post with ID " + id);
        }
    }
}
