package DM.SecurityJWT.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class LoginResponedDTO {
    private String token;
    private String message;
    private String error;
    private LocalDateTime time;
}
