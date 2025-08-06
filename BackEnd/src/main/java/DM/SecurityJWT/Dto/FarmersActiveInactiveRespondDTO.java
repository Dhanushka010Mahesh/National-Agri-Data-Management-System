package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Address;
import DM.SecurityJWT.Entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FarmersActiveInactiveRespondDTO {
    protected String username;
    private String nic;
    private String mobileNumber;
    private String address;
    private Status status;
}
