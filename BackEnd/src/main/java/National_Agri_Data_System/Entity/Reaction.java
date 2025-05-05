package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 20)//runtime validation
    @Column(length = 25) //database level validation
    private String type; // e.g., Like, Heart
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_post_id")
    private BlogPost blogPost;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id")
    private Farmer farmer;
    @NonNull
    private LocalDateTime createdDate;
}