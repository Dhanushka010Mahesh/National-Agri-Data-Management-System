package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmerSignUpRequestDTO {
    private String username;
    private String password;
    private String email;
    private String fullName;
    private String nic;
    private String mobileNumber;
    private Division division;
    private District district;
    private Address address;
    private Bank bank;
}
