package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.CropCategory;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SelectCropDTO {
    private Long id;
    private String name;
    private CropCategory category;
    private Integer growthDurationDays;
    private Double expectedYieldPerHectare;
}
