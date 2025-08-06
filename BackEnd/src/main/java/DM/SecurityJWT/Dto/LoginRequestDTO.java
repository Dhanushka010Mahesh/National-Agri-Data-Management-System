package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Role;
import DM.SecurityJWT.Entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginRequestDTO {
    private  String username;
    private  String password;
    private Role role;
}
