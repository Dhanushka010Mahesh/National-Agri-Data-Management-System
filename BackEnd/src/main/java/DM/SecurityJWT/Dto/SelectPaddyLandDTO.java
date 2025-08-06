package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.Farmer;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SelectPaddyLandDTO {
    private Long id;
    private Double landExtent;
    private String landOwnerNIC;
}
