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
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 200)
    private String title;
    @NonNull
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_officer_id")
    private DivisionOfficer author;
    @NonNull
    private LocalDateTime createdDate;
}