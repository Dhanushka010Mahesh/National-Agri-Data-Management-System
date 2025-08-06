package DM.SecurityJWT.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GetBlogsRespondDTO {
    private Long id;
    private String title;
    private String content;
    private String imgURL;
    private LocalDateTime createdAt;
    private String creator;


}
