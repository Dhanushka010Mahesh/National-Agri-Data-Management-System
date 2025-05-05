package National_Agri_Data_System.Controller;

import National_Agri_Data_System.Entity.Farmer;
import National_Agri_Data_System.Entity.PaddyLand;
import National_Agri_Data_System.Repository.FarmerRepository;
import National_Agri_Data_System.Service.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/farmers")
@Validated
public class FarmerController {


    private final FarmerRepository farmerRepository;

    public FarmerController(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }


    @GetMapping("all")
    public List<Farmer> getFamerList(){
        return farmerRepository.findAll();
    }

//    @Autowired
//    private FarmerService farmerService;
//
//    @PostMapping("/create")
//    public ResponseEntity<Farmer> createFarmer(@Valid @RequestBody Farmer farmer) {
//        Farmer createdFarmer = farmerService.createFarmer(farmer);
//
//        return ResponseEntity.status(201).body(createdFarmer);
//    }
//
//    // Farmer views their profile (requires authentication)
//    @GetMapping("/currentFarmerGet")
//    //@PreAuthorize("hasRole('FARMER')")
//    public ResponseEntity<Farmer> getCurrentFarmer() {
//        Farmer farmer = farmerService.getCurrentFarmer();
//        return ResponseEntity.ok(farmer);
//    }
//
////    // Farmer views their approved paddy lands
////    @GetMapping("/me/paddy-lands")
////    //@PreAuthorize("hasRole('FARMER')")
////    public ResponseEntity<List<PaddyLand>> getFarmerPaddyLands() {
////        List<PaddyLand> paddyLands = farmerService.getFarmerPaddyLands();
////        return ResponseEntity.ok(paddyLands);
////    }
//
//    // Update farmer profile (e.g., mobile, address)
//    @PutMapping("/update")
//    //@PreAuthorize("hasRole('FARMER')")
//    public ResponseEntity<Farmer> updateFarmer(@Valid @RequestBody Farmer farmer) {
//        Farmer updatedFarmer = farmerService.updateFarmer(farmer);
//        return ResponseEntity.ok(updatedFarmer);
//    }
}