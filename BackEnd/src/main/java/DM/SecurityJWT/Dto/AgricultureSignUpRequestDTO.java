package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.District;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgricultureSignUpRequestDTO {
    private String username;
    private String password;
    private String email;
    private String contactInfo;
}
