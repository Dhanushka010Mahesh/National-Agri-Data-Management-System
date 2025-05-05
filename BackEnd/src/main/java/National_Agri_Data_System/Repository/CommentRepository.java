package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.BlogPost;
import National_Agri_Data_System.Entity.Comment;
import National_Agri_Data_System.Entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Find comments by blog post
    List<Comment> findByBlogPost(BlogPost blogPost);

    // Find comments by farmer
    List<Comment> findByAuthor(Farmer author);

    // Find comments for a blog post ordered by date
    List<Comment> findByBlogPostOrderByCreatedDateDesc(BlogPost blogPost);
}