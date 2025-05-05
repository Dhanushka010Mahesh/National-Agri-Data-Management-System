package National_Agri_Data_System.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class AuthSignInRespondDTO {
    private String token;
    private String message;
    private String error;
    private LocalDateTime time;
}
