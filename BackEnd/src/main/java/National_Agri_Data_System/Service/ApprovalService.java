package National_Agri_Data_System.Service;

import National_Agri_Data_System.Entity.ApprovalRequest;
import National_Agri_Data_System.Entity.Farmer;
import National_Agri_Data_System.Entity.PaddyLand;
import National_Agri_Data_System.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApprovalService {

//    @Autowired
//    private ApprovalRepository approvalRequestRepository;
//
//    @Autowired
//    private FarmerRepository farmerRepository;
//
//    @Autowired
//    private PaddyLandRepository paddyLandRepository;
//
//    @Autowired
//    private DistrictRepository districtRepository;
//
//    @Autowired
//    private DivisionRepository divisionRepository;
//
//    // Get pending requests for a division officer
//    @Transactional(readOnly = true)
//    public List<ApprovalRequest> getDivisionPendingRequests() {
//        Long divisionOfficerId = getCurrentDivisionOfficerId();
//        return approvalRequestRepository.findPendingByDivisionOfficerId(divisionOfficerId);
//    }
//
//    // Get pending requests for a district officer
//    @Transactional(readOnly = true)
//    public List<ApprovalRequest> getDistrictPendingRequests() {
//        Long districtOfficerId = getCurrentDistrictOfficerId();
//        return approvalRequestRepository.findPendingByDistrictOfficerId(districtOfficerId);
//    }
//
//    // Approve or reject a request
//    @Transactional
//    public ApprovalRequest approveRequest(Long requestId, String status) {
//        ApprovalRequest request = approvalRequestRepository.findById(requestId)
//                .orElseThrow(() -> new IllegalArgumentException("Approval request not found"));
//
//        // Validate officer permissions
//        Long currentOfficerId = getCurrentOfficerId(request.getType());
//        if ("FarmerAccount".equals(request.getType()) && !request.getDivisionOfficer().getId().equals(currentOfficerId)) {
//            throw new AccessDeniedException("Only the assigned division officer can approve this request");
//        }
//        if (("PaddyLand".equals(request.getType()) || "FarmerLandAssignment".equals(request.getType())) &&
//                !request.getDistrictOfficer().getId().equals(currentOfficerId)) {
//            throw new AccessDeniedException("Only the assigned district officer can approve this request");
//        }
//
//        // Validate status
//        if (!"Approved".equals(status) && !"Rejected".equals(status)) {
//            throw new IllegalArgumentException("Status must be 'Approved' or 'Rejected'");
//        }
//
//        request.setStatus(status);
//
//        // Update related entities based on approval
//        if ("Approved".equals(status)) {
//            if ("FarmerAccount".equals(request.getType())) {
//                Farmer farmer = request.getFarmer();
//                farmer.setStatus("Approved");
//                farmerRepository.save(farmer);
//            } else if ("PaddyLand".equals(request.getType())) {
//                PaddyLand paddyLand = request.getPaddyLand();
//                paddyLand.setStatus("Approved");
//                paddyLandRepository.save(paddyLand);
//            } else if ("FarmerLandAssignment".equals(request.getType())) {
//                  System.out.println("not hadle this line 81 approalService");
////                PaddyLand paddyLand = request.getPaddyLand();
////                Farmer farmer = request.getFarmer();
////                paddyLand.setFarmer(farmer); // Assuming a relationship field in PaddyLand
////                paddyLand.setStatus("Approved");
////                paddyLandRepository.save(paddyLand);
//            }
//        }
//
//        return approvalRequestRepository.save(request);
//    }
//
//    // Helper method to get current officer ID based on request type
//    private Long getCurrentOfficerId(String requestType) {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        if ("FarmerAccount".equals(requestType)) {
//            return divisionRepository.findByUsername(username)
//                    .orElseThrow(() -> new IllegalArgumentException("Division officer not found"))
//                    .getId();
//        } else {
//            return districtRepository.findByUsername(username)
//                    .orElseThrow(() -> new IllegalArgumentException("District officer not found"))
//                    .getId();
//        }
//    }
//
//    // Helper method to get current division officer ID
//    private Long getCurrentDivisionOfficerId() {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        return divisionRepository.findByUsername(username)
//                .orElseThrow(() -> new IllegalArgumentException("Division officer not found"))
//                .getId();
//    }
//
//    // Helper method to get current district officer ID
//    private Long getCurrentDistrictOfficerId() {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        return districtRepository.findByUsername(username)
//                .orElseThrow(() -> new IllegalArgumentException("District officer not found"))
//                .getId();
//    }
}