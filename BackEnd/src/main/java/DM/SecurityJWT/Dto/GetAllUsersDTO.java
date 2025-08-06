package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Role;
import DM.SecurityJWT.Entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetAllUsersDTO {
    protected   String username;
    private Role role;
    private String email;
    private Status status;
    private String districtName;
}
