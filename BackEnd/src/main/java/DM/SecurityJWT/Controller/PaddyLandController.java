package DM.SecurityJWT.Controller;

import DM.SecurityJWT.Dto.PaddyLandCreateDTO;
import DM.SecurityJWT.Dto.RespondDTO;
import DM.SecurityJWT.Service.PaddyLandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8090/")
@RestController
@RequestMapping("/api/v1/lands")
public class PaddyLandController {

    private final PaddyLandService paddyLandService;

    public PaddyLandController(PaddyLandService paddyLandService) {
        this.paddyLandService = paddyLandService;
    }


    @PostMapping("/new")
    public ResponseEntity<RespondDTO> createPaddyLand(@RequestBody PaddyLandCreateDTO landDTO){
        RespondDTO land= paddyLandService.createPaddyLand(
                landDTO.getLandOwnerNIC(),
                landDTO.getLandOwnerName(),
                landDTO.getLandExtent(),
                landDTO.getIrrigationType(),
                landDTO.getGeoCoordinates(),
                landDTO.getAddress(),
                landDTO.getType(),
                landDTO.getDivision(),
                landDTO.getDistrict()
        );
        return ResponseEntity.ok(land);
    }
}
