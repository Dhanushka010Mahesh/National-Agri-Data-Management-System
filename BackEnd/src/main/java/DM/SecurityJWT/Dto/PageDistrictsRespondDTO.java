package DM.SecurityJWT.Dto;

import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
public class PageDistrictsRespondDTO {
    private Long districtsCount;
    private Long divisionsCount;
    private Long famersCount;
    private Long landsCount;
    private List<PageSingleDistrictDTO> districts = new ArrayList<>();
}

