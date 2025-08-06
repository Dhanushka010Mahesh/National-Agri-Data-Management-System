package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Address;
import DM.SecurityJWT.Entity.Division;
import DM.SecurityJWT.Entity.Status;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DistrictRespondDTO {
    private Long id;
    private String name;
    private List<DivisionRespondDTO> divisions = new ArrayList<>();
    private Status status;
    private AddressRespondDTO address;
}
