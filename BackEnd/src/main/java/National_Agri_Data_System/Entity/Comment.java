package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_post_id")
    private BlogPost blogPost;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id")
    private Farmer author;
    @NonNull
    private LocalDateTime createdDate;
}