package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.CropCategory;
import DM.SecurityJWT.Entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CropGetRespondDTO {
    private String name;
    private CropCategory category;
    private Integer growthDurationDays;
    private Double expectedYieldPerHectare;
    private Status status;


}
