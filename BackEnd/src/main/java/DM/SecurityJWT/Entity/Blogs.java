package DM.SecurityJWT.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blogs {
    @Id
    private String id;
    private String title;
    private String content;
    private String imgURL;
    private String createdAt;
    private int likeCount;
    private int viewCount;
    //private DivisionOfficer author;
    //private Comment comment[];
}
