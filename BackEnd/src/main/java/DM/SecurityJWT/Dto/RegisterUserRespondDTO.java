package DM.SecurityJWT.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RegisterUserRespondDTO {
    private String message;
    private  String error;
}
