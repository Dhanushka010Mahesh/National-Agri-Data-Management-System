package DM.SecurityJWT.Dto;

import lombok.Data;

@Data
public class BlogRequestDTO {
    private String title;
    private String content;
    private String imgURL;
    private String creator;
//    private int likeCount;
//    private int viewCount;
}
