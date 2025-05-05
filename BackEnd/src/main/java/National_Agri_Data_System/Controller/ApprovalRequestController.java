package National_Agri_Data_System.Controller;

import National_Agri_Data_System.Entity.ApprovalRequest;
import National_Agri_Data_System.Service.ApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/approval-requests")
@Validated
public class ApprovalRequestController {

//    @Autowired
//    private ApprovalService approvalRequestService;
//
//    // Division officer views pending requests
//    @GetMapping("/division")
//    //@PreAuthorize("hasRole('DIVISION_OFFICER')")
//    public ResponseEntity<List<ApprovalRequest>> getDivisionPendingRequests() {
//        List<ApprovalRequest> requests = approvalRequestService.getDivisionPendingRequests();
//        return ResponseEntity.ok(requests);
//    }
//
//    // District officer views pending requests
//    @GetMapping("/district")
//    //@PreAuthorize("hasRole('DISTRICT_OFFICER')")
//    public ResponseEntity<List<ApprovalRequest>> getDistrictPendingRequests() {
//        List<ApprovalRequest> requests = approvalRequestService.getDistrictPendingRequests();
//        return ResponseEntity.ok(requests);
//    }
//
//    // Officer approves or rejects a request
//    @PutMapping("/{id}/approve")
//    //@PreAuthorize("hasAnyRole('DIVISION_OFFICER', 'DISTRICT_OFFICER')")
//    public ResponseEntity<ApprovalRequest> approveRequest(@PathVariable Long id, @RequestParam String status) {
//        ApprovalRequest updatedRequest = approvalRequestService.approveRequest(id, status);
//        return ResponseEntity.ok(updatedRequest);
//    }
}