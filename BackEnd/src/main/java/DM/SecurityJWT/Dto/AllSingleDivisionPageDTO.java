package DM.SecurityJWT.Dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AllSingleDivisionPageDTO {
    private Long divisionId;
    private String name;
    private Long farmersCount;
    private Long landsCount;
    private Long cultivateCount;
    private List<CropTermDTO> vegetablesFarming = new ArrayList<>();
    private List<CropTermDTO> riceFarming = new ArrayList<>();
    private List<CropTermDTO> longTermCrop = new ArrayList<>();
}
