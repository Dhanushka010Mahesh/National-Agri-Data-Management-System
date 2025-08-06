package DM.SecurityJWT.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RespondDTO {
    private String message;
    private  String error;
}
