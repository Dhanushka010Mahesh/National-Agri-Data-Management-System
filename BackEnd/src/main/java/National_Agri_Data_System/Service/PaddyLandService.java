package National_Agri_Data_System.Service;

import National_Agri_Data_System.Entity.*;
import National_Agri_Data_System.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaddyLandService {

//    @Autowired
//    private PaddyLandRepository paddyLandRepository;
//
//    @Autowired
//    private ApprovalRepository approvalRequestRepository;
//
//    @Autowired
//    private FarmerRepository farmerRepository;
//
//    @Autowired
//    private DistrictRepository districtRepository;
//
//    @Autowired
//    private DivisionRepository divisionRepository;
//
//    // Create a paddy land (triggers approval request)
//    @Transactional
//    public PaddyLand createPaddyLand(PaddyLand paddyLand) {
//        paddyLand.setStatus("Pending");
//        PaddyLand savedPaddyLand = paddyLandRepository.save(paddyLand);
//
//        ApprovalRequest request = new ApprovalRequest();
//        request.setType("PaddyLand");
//        request.setPaddyLand(savedPaddyLand);
//        request.setDivisionOfficer(getCurrentDivisionOfficer());
//        request.setDistrictOfficer(getDefaultDistrictOfficer(savedPaddyLand));
//        request.setRequestDate(LocalDateTime.now());
//        request.setStatus("Pending");
//        approvalRequestRepository.save(request);
//
//        return savedPaddyLand;
//    }
//
//    // Assign a farmer to a paddy land (triggers approval request)
//    @Transactional
//    public void assignFarmerToPaddyLand(Long paddyLandId, Long farmerId) {
//        PaddyLand paddyLand = paddyLandRepository.findById(paddyLandId)
//                .orElseThrow(() -> new IllegalArgumentException("Paddy land not found"));
//        Farmer farmer = farmerRepository.findById(farmerId)
//                .orElseThrow(() -> new IllegalArgumentException("Farmer not found"));
//
//        ApprovalRequest request = new ApprovalRequest();
//        request.setType("FarmerLandAssignment");
//        request.setFarmer(farmer);
//        request.setPaddyLand(paddyLand);
//        request.setDivisionOfficer(getCurrentDivisionOfficer());
//        request.setDistrictOfficer(getDefaultDistrictOfficer(paddyLand));
//        request.setRequestDate(LocalDateTime.now());
//        request.setStatus("Pending");
//        approvalRequestRepository.save(request);
//    }
//
//    // Get current division officer
//    private DivisionOfficer getCurrentDivisionOfficer() {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        return divisionRepository.findByUsername(username)
//                .orElseThrow(() -> new IllegalArgumentException("Division officer not found"));
//    }
//
//    // Get default district officer based on paddy land's district
//    private DistrictOfficer getDefaultDistrictOfficer(PaddyLand paddyLand) {
//        Long districtId = paddyLand.getAddress().getDistrict().getId();
//        List<DistrictOfficer> officers = districtRepository.findByDistrictId(districtId);
//        if (officers.isEmpty()) {
//            throw new IllegalArgumentException("No district officer found for district ID: " + districtId);
//        }
//        // Return the first officer (or implement logic to select based on workload, etc.)
//        return officers.get(0);
//    }
}