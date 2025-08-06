package DM.SecurityJWT.Dto;

import DM.SecurityJWT.Entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaddyLandCreateDTO {
    private String landOwnerNIC;
    private String landOwnerName;
    private Address address;
    private Double landExtent;
    private PaddyLandType type;
    private String irrigationType; // "3-Rainfed","Canal",3-Minor,2-Minor
//    private Status status;
    private String geoCoordinates; // "latitude: 7.8731, longitude: 80.7718"
//    private Farmer farmer;
    private Division division;
    private District district;
//    private LocalDateTime registrationDate;
}
