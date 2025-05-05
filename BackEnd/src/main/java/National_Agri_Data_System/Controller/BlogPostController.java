package National_Agri_Data_System.Controller;

import National_Agri_Data_System.Entity.BlogPost;
import National_Agri_Data_System.Entity.Comment;
import National_Agri_Data_System.Entity.Reaction;
import National_Agri_Data_System.Service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/blog-posts")
@Validated
public class BlogPostController {

    @GetMapping("/getName")
    public String getName(){
        return "dhanushka";
    }

//    @Autowired
//    private BlogPostService blogPostService;
//
//    @PostMapping
//    //@PreAuthorize("hasRole('DIVISION_OFFICER')")
//    public ResponseEntity<BlogPost> createBlogPost(@Valid @RequestBody BlogPost blogPost) {
//        BlogPost createdPost = blogPostService.createBlogPost(blogPost);
//        return ResponseEntity.status(201).body(createdPost);
//    }

//    // Publicly accessible blog posts with pagination
//    @GetMapping
//    public ResponseEntity<Page<BlogPost>> getBlogPosts(@RequestParam(defaultValue = "0") int page,
//                                                       @RequestParam(defaultValue = "10") int size) {
//        Page<BlogPost> posts = blogPostService.getBlogPosts(PageRequest.of(page, size));
//        return ResponseEntity.ok(posts);
//    }
//
//    // Farmer adds a comment
//    @PostMapping("/{postId}/comments")
//    //@PreAuthorize("hasRole('FARMER')")
//    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @Valid @RequestBody Comment comment) {
//        Comment createdComment = blogPostService.addComment(postId, comment);
//        return ResponseEntity.status(201).body(createdComment);
//    }
//
//    // Farmer adds a reaction
//    @PostMapping("/{postId}/reactions")
//    //@PreAuthorize("hasRole('FARMER')")
//    public ResponseEntity<Reaction> addReaction(@PathVariable Long postId, @Valid @RequestBody Reaction reaction) {
//        Reaction createdReaction = blogPostService.addReaction(postId, reaction);
//        return ResponseEntity.status(201).body(createdReaction);
//    }
}