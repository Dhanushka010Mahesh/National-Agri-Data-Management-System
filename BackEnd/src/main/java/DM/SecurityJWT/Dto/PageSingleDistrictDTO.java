package DM.SecurityJWT.Dto;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PageSingleDistrictDTO {
    private Long districtId;
    private String name;
    private Long divisionsCount;
    private Long farmersCount;
    private Long landsCount;
    private List<PageSingleDivisionDTO> divisions = new ArrayList<>();
}
