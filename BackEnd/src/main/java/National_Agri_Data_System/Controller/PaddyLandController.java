package National_Agri_Data_System.Controller;

import National_Agri_Data_System.Entity.PaddyLand;
import National_Agri_Data_System.Service.PaddyLandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/paddy-lands")
@Validated
public class PaddyLandController {
//
//    @Autowired
//    private PaddyLandService paddyLandService;
//
//    // Division officer creates a paddy land (triggers approval request)
//    @PostMapping
//    //@PreAuthorize("hasRole('DIVISION_OFFICER')")
//    public ResponseEntity<PaddyLand> createPaddyLand(@Valid @RequestBody PaddyLand paddyLand) {
//        PaddyLand createdPaddyLand = paddyLandService.createPaddyLand(paddyLand);
//        return ResponseEntity.status(201).body(createdPaddyLand);
//    }
//
//    // Division officer assigns a farmer to a paddy land (triggers approval request)
//    @PostMapping("/{paddyLandId}/assign-farmer/{farmerId}")
//    //@PreAuthorize("hasRole('DIVISION_OFFICER')")
//    public ResponseEntity<Void> assignFarmerToPaddyLand(@PathVariable Long paddyLandId, @PathVariable Long farmerId) {
//        paddyLandService.assignFarmerToPaddyLand(paddyLandId, farmerId);
//        return ResponseEntity.status(204).build();
//    }
}