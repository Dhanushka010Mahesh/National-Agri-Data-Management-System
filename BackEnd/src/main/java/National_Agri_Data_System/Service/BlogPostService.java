package National_Agri_Data_System.Service;

import National_Agri_Data_System.Entity.BlogPost;
import National_Agri_Data_System.Entity.Comment;
import National_Agri_Data_System.Entity.Farmer;
import National_Agri_Data_System.Entity.Reaction;
import National_Agri_Data_System.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class BlogPostService {

//    @Autowired
//    private BlogPostRepository blogPostRepository;
//
//    @Autowired
//    private FarmerRepository farmerRepository;
//
//    @Autowired
//    private CommentRepository commentRepository;
//
//    @Autowired
//    private ReactionRepository reactionRepository;
//
//    @Autowired
//    private DivisionRepository divisionOfficerRepository;
//
//    // Create a blog post
//    @Transactional
//    public BlogPost createBlogPost(BlogPost blogPost) {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        System.out.println(username);
//        blogPost.setAuthor(divisionOfficerRepository.findByUsername(username)
//                .orElseThrow(() -> new IllegalArgumentException("Division officer not found")));
//        blogPost.setCreatedDate(LocalDateTime.now());
//        return blogPostRepository.save(blogPost);
//    }

//    // Get paginated blog posts
//    @Transactional(readOnly = true)
//    public Page<BlogPost> getBlogPosts(Pageable pageable) {
//        return blogPostRepository.findAll(pageable);
//    }
//
//    // Add a comment to a blog post
//    @Transactional
//    public Comment addComment(Long postId, Comment comment) {
//        BlogPost blogPost = blogPostRepository.findById(postId)
//                .orElseThrow(() -> new IllegalArgumentException("Blog post not found"));
//        comment.setBlogPost(blogPost);
//        comment.setAuthor(getCurrentFarmer());
//        comment.setCreatedDate(LocalDateTime.now());
//        return commentRepository.save(comment);
//    }
//
//    // Add a reaction to a blog post
//    @Transactional
//    public Reaction addReaction(Long postId, Reaction reaction) {
//        BlogPost blogPost = blogPostRepository.findById(postId)
//                .orElseThrow(() -> new IllegalArgumentException("Blog post not found"));
//        reaction.setBlogPost(blogPost);
//        reaction.setFarmer(getCurrentFarmer());
//        reaction.setCreatedDate(LocalDateTime.now());
//        return reactionRepository.save(reaction);
//    }
//
//    // Helper method to get current farmer
//    private Farmer getCurrentFarmer() {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        return farmerRepository.findByUsername(username)
//                .orElseThrow(() -> new IllegalArgumentException("Farmer not found"));
//    }
}