package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CultivationCreateDTO {

    private Farmer farmerId;
    private PaddyLand paddyLandId;
    private Crop cropId;

    private Double cultivationExtent;

//    @JsonFormat(pattern = "yyyy-M-d")
    private LocalDate startDate;
//    private LocalDate endDate;
//    private CultivateStatus status;
    private Double yieldAmount;

    private Season season;


}
