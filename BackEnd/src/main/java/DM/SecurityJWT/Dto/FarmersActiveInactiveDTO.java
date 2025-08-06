package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Address;
import DM.SecurityJWT.Entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FarmersActiveInactiveDTO {
    protected String username;
    private String nic;
    private String mobileNumber;
    private Address address;
    private Status status;
}
