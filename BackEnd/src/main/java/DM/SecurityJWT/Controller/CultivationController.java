package DM.SecurityJWT.Controller;


import DM.SecurityJWT.Dto.*;
import DM.SecurityJWT.Entity.Cultivate;
import DM.SecurityJWT.Service.CropService;
import DM.SecurityJWT.Service.CultivationService;
import DM.SecurityJWT.Service.FarmerService;
import DM.SecurityJWT.Service.PaddyLandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8090/")
@RestController
@RequestMapping("/api/v1/cultivation")
public class CultivationController {

    @Autowired
    private CultivationService cultivationService;
    @Autowired
    private FarmerService farmerService;
    @Autowired
    private PaddyLandService paddyLandService;
    @Autowired
    private CropService cropService;

//    @PostMapping("/add")
//    public ResponseEntity<RespondDTO> createNewCultivation(@RequestBody CultivationCreateDTO addCultivation){
//        RespondDTO respond=cultivationService.createNewCultivation(addCultivation);
////                addCultivation.getStartDate(),
//////                addCultivation.getEndDate(),
////                addCultivation.getYieldAmount(),
////                addCultivation.getCultivationExtent(),
////                addCultivation.getSeason(),
////                addCultivation.getFarmerId(),
////                addCultivation.getPaddyLandId(),
////                addCultivation.getCropId()
////        );
//        return ResponseEntity.ok(respond);
//    }


    @PostMapping("/add")
    public ResponseEntity<RespondDTO> addCultivatione(@RequestBody CultivationCreateDTO createDTO){

        RespondDTO respondDTO=cultivationService.addCultivatione(createDTO);
        return ResponseEntity.ok(respondDTO);
    }

    @GetMapping("/farmerGet/{divisionId}")
    public List<SelectFarmerDTO> getFarmers(@PathVariable Long divisionId){
        return farmerService.farmerGetActive(divisionId);
    }
    @GetMapping("/paddyLandGet/{divisionId}")
    public List<SelectPaddyLandDTO> getPaddyLands(@PathVariable Long divisionId){
        return paddyLandService.paddyLandGetActive(divisionId);
    }
    @GetMapping("/cropGet")
    public List<SelectCropDTO> getCrop(){
        return cropService.cropGetActive();
    }
//@PostMapping("add")
//public ResponseEntity<?> createCultivation(@RequestBody CultivationCreateDTO cultivateDTO) {
//    try {
//        Cultivate createdCultivation = cultivationService.createNewCultivation(cultivateDTO);
//        Map<String, Object> response = new HashMap<>();
//        response.put("message", "Cultivation created successfully");
//        response.put("cultivation", createdCultivation);
//        return ResponseEntity.ok(response);
//    } catch (IllegalArgumentException e) {
//        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
//    } catch (Exception e) {
//        return ResponseEntity.internalServerError().body(Map.of("error", "An unexpected error occurred"));
//    }
//}

}
