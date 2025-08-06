package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Address;
import DM.SecurityJWT.Entity.District;
import DM.SecurityJWT.Entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DivisionCreateDTO {
    private String name;
    private District district;
    private Address address;
}
