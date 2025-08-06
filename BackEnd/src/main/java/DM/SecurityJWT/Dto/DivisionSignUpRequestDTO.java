package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.District;
import DM.SecurityJWT.Entity.Division;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DivisionSignUpRequestDTO {
    private String username;
    private String password;
    private String email;
    private String divisionOfficeName;
    private District district;
    private Division division;
}
