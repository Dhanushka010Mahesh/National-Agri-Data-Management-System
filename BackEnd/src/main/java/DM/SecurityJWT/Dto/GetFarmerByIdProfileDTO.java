package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Address;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetFarmerByIdProfileDTO {
    private Long id;
    private String fullName;
    private String nic;
    private String mobileNumber;
//    private Address address;
}
