package DM.SecurityJWT.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blogs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String imgURL;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDateTime createdAt;
    private String creator;
    private int likeCount;
    private int viewCount;
    //private DivisionOfficer author;
    //private Comment comment[];
}
