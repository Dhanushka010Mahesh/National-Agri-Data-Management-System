package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Address;
import DM.SecurityJWT.Entity.Status;
import lombok.Data;

@Data
public class DivisionRespondDTO {
    private Long id;
    private String name;
    private Status status;
    private AddressRespondDTO address;
}
