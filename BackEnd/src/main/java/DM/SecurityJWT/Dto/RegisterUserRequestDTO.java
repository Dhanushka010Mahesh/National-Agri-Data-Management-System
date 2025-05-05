package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RegisterUserRequestDTO {
    private String id;
    private  String username;
    private  String password;
    private Role role;
    private String status;
    private String location;
}
