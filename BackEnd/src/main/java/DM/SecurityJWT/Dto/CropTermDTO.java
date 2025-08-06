package DM.SecurityJWT.Dto;

import lombok.Data;

@Data
public class CropTermDTO {
    private Long cropId;
    private String name;
    private Long farmerCount;
    private Long landCount;
    private Long cultivateCount;

    public CropTermDTO(Long id, String name, long l, long l1, long l2) {
    }
}
