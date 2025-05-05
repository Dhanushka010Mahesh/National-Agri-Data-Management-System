package DM.SecurityJWT.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthUsers {
    @Id
    private String id;
    private  String username;
    private  String password;
    private Role role;
    private String status;
    private String location;
}
