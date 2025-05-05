package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.ApprovalRequest;
import National_Agri_Data_System.Entity.BlogPost;
import National_Agri_Data_System.Entity.DivisionOfficer;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    // Find blog posts by author (division officer)
    List<BlogPost> findByAuthor(DivisionOfficer author);

    // Find paginated blog posts
    Page<BlogPost> findAll(Pageable pageable);

    // Find recent blog posts
    Page<BlogPost> findByOrderByCreatedDateDesc(Pageable pageable);
}