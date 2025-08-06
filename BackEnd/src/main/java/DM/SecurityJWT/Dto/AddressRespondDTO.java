package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Province;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class AddressRespondDTO {
    private Long id;
    private String number;
    private String street;
    private String city;
    private Province state;
    private String postalCode;
}
