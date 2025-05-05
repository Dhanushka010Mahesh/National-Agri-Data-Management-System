package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.BlogPost;
import National_Agri_Data_System.Entity.Farmer;
import National_Agri_Data_System.Entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    // Find reactions by blog post
    List<Reaction> findByBlogPost(BlogPost blogPost);

    // Find reactions by farmer
    List<Reaction> findByFarmer(Farmer farmer);

    // Find reaction by blog post and farmer
    Optional<Reaction> findByBlogPostAndFarmer(BlogPost blogPost, Farmer farmer);
}