package DM.SecurityJWT.Dto;

import lombok.Data;

@Data
public class PageSingleDivisionDTO {
    private Long divisionId;
    private String name;
    private Long farmersCount;
    private Long landsCount;
}