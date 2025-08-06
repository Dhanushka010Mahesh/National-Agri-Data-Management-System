package DM.SecurityJWT.Controller;

import DM.SecurityJWT.Dto.CropCreateRequestDTO;
import DM.SecurityJWT.Dto.CropGetRespondDTO;
import DM.SecurityJWT.Dto.RespondDTO;
import DM.SecurityJWT.Entity.CropCategory;
import DM.SecurityJWT.Service.CropService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8090")
@RestController
@RequestMapping("/api/v1/crops")
public class CropController {

    private final CropService cropService;

    public CropController(CropService cropService) {
        this.cropService = cropService;
    }



    //this method came error.
    @PostMapping("/new")
    public ResponseEntity<RespondDTO> createNewCrop(@RequestBody CropCreateRequestDTO dto){

        RespondDTO respondDTO=cropService.createCrop(
                dto.getName(),
                (CropCategory) dto.getCategory(),
                dto.getGrowthDurationDays(),
                dto.getExpectedYieldPerHectare()
        );
        return ResponseEntity.ok(respondDTO);
    }

    @GetMapping("/get")
    public ResponseEntity<List<CropGetRespondDTO>> getAllCrops() {

        return ResponseEntity.ok(cropService.getAllCrops());
    }


}
