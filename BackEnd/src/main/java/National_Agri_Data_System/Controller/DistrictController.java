package National_Agri_Data_System.Controller;

import National_Agri_Data_System.DTO.DistrictReportDTO;
import National_Agri_Data_System.Service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/district-reports")
public class DistrictController {

//    @Autowired
//    private DistrictService districtReportService;
//
//    // District officer views cultivation report (aggregate data)
//    @GetMapping("/{districtId}/cultivation")
//    //@PreAuthorize("hasRole('DISTRICT_OFFICER')")
//    public ResponseEntity<List<DistrictReportDTO>> getCultivationReport(@PathVariable Long districtId) {
//        List<DistrictReportDTO> report = districtReportService.getCultivationReport(districtId);
//        return ResponseEntity.ok(report);
//    }
//
//    // District officer views productivity report
//    @GetMapping("/{districtId}/productivity")
//    //@PreAuthorize("hasRole('DISTRICT_OFFICER')")
//    public ResponseEntity<List<DistrictReportDTO>> getProductivityReport(@PathVariable Long districtId) {
//        List<DistrictReportDTO> report = districtReportService.getProductivityReport(districtId);
//        return ResponseEntity.ok(report);
//    }
}
