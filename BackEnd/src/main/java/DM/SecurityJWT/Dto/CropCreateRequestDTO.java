package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.CropCategory;
import DM.SecurityJWT.Entity.Cultivate;
import jakarta.persistence.CascadeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CropCreateRequestDTO {
    private String name; // e.g., Samba, Leek, Tea
    private CropCategory category;
    private Integer growthDurationDays; //how many time go like 80 dayes
    private Double expectedYieldPerHectare; // In tons
}
