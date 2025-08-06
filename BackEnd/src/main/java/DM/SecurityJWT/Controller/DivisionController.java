package DM.SecurityJWT.Controller;

import DM.SecurityJWT.Dto.*;
import DM.SecurityJWT.Entity.Division;
import DM.SecurityJWT.Service.DivisionService;
import DM.SecurityJWT.Service.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8090")
@RestController
@RequestMapping("/api/v1/divisions")
public class DivisionController {
    private final DivisionService divisionService;
    private final FarmerService farmerService;

    @Autowired
    public DivisionController(DivisionService divisionService, FarmerService farmerService) {
        this.divisionService = divisionService;
        this.farmerService = farmerService;
    }

//    @GetMapping("getAllDivisions/{id}")
//    public ResponseEntity<List<Division>> getAllDivisions(@PathVariable("id") Long districtId) {
//        if (districtId == null || districtId <= 0) {
//            return ResponseEntity.badRequest().build();
//        }
//        List<Division> divisions = divisionService.getAllDivisions(districtId);
//        return divisions.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(divisions);
//    }
//
//    @GetMapping("getAllLiveDisvisionCount/{id}")
//    public Long getAllLiveDisvisionCountfindByDistrictId(@PathVariable("id") Long districtId){
//        return divisionService.getAllLiveDisvisionCountfindByDistrictId(districtId);
//    }
//    @GetMapping("getAllLiveFarmerCount/{id}")
//    public Long getAllLiveFarmerCount(@PathVariable("id") Long districtId){
//        return farmerService.getAllLiveFarmerCount(districtId);
//    }
//    @GetMapping("getAllLiveLandCount/{id}")
//    public Long getAllLiveLandCount(@PathVariable("id") Long districtId){
//        return divisionService.getAllLiveLandCount(districtId);
//    }

    @PostMapping("/new")
    public ResponseEntity<RespondDTO> createDivision(@RequestBody DivisionCreateDTO divisionDTO){
        RespondDTO division=divisionService.createDivision(
                divisionDTO.getName(),
                divisionDTO.getDistrict(),
                divisionDTO.getAddress()
        );
        return ResponseEntity.ok(division);
    }

    @GetMapping("/get/{districtId}")
    public List<PageSingleDistrictDTO> getAllDistrictsPageData(@PathVariable Long districtId) {

        return divisionService.getAllDistrictsPageData(districtId);
    }
    @GetMapping("/get/{districtId}/{divisionId}")
    public PageSingleDivisionDTO getAllDivisionData(@PathVariable Long districtId,@PathVariable Long divisionId) {

        return divisionService.getAllDivisionData(districtId,divisionId);
    }

    @GetMapping("/getAll/{divisionId}")
    public AllSingleDivisionPageDTO getSingleDivisionData(@PathVariable Long divisionId) {

        return divisionService.getSingleDivisionData(divisionId);
    }
}
