package National_Agri_Data_System.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AuthSignInRequestDTO {
    private  String username;
    private  String password;
}
