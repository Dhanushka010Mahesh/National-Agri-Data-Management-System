package National_Agri_Data_System.Controller;

import National_Agri_Data_System.Entity.Cultivation;
import National_Agri_Data_System.Service.CultivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/cultivations")
@Validated
public class CultivationController {

//    @Autowired
//    private CultivationService cultivationService;
//
//    // Division officer initiates a cultivation session
//    @PostMapping("/initiate")
//    //@PreAuthorize("hasRole('DIVISION_OFFICER')")
//    public ResponseEntity<Cultivation> initiateCultivation(@Valid @RequestBody Cultivation cultivation) {
//        Cultivation initiatedCultivation = cultivationService.initiateCultivation(cultivation);
//        return ResponseEntity.status(201).body(initiatedCultivation);
//    }
//
//    // Farmer updates cultivation details (if session is active)
//    @PutMapping("/{id}")
//    //@PreAuthorize("hasRole('FARMER')")
//    public ResponseEntity<Cultivation> updateCultivation(@PathVariable Long id, @Valid @RequestBody Cultivation cultivation) {
//        Cultivation updatedCultivation = cultivationService.updateCultivation(id, cultivation);
//        return ResponseEntity.ok(updatedCultivation);
//    }
}