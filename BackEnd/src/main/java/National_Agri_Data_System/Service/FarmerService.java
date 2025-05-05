package National_Agri_Data_System.Service;

import National_Agri_Data_System.Entity.ApprovalRequest;
import National_Agri_Data_System.Entity.DivisionOfficer;
import National_Agri_Data_System.Entity.Farmer;
import National_Agri_Data_System.Entity.PaddyLand;
import National_Agri_Data_System.Repository.ApprovalRepository;
import National_Agri_Data_System.Repository.DivisionRepository;
import National_Agri_Data_System.Repository.FarmerRepository;
import National_Agri_Data_System.Repository.PaddyLandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FarmerService {

//    @Autowired
//    private FarmerRepository farmerRepository;
//
//    @Autowired
//    private ApprovalRepository approvalRequestRepository;
//
//    @Autowired
//    private PaddyLandRepository paddyLandRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private DivisionRepository divisionRepository;
//
//    // Create a farmer account (triggers approval request)
//    @Transactional
//    public Farmer createFarmer(Farmer farmer) {
////        farmer.setPassword(passwordEncoder.encode(farmer.getPassword()));
////        farmer.setStatus("Pending");
////        farmer.setRegistrationDate(LocalDateTime.now());
////        Farmer savedFarmer = farmerRepository.save(farmer);
////
////        ApprovalRequest request = new ApprovalRequest();
////        request.setType("FarmerAccount");
////        request.setFarmer(savedFarmer);
////        request.setDivisionOfficer(getDefaultDivisionOfficer()); // Logic to assign officer
////        request.setRequestDate(LocalDateTime.now());
////        request.setStatus("Pending");
////        approvalRequestRepository.save(request);
//
//        return farmerRepository.save(farmer);//savedFarmer;
//    }
//
//    // Get current farmer
//    @Transactional(readOnly = true)
//    public Farmer getCurrentFarmer() {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        return farmerRepository.findByUsername(username)
//                .orElseThrow(() -> new IllegalArgumentException("Farmer not found"));
//    }
//
//    // Get farmer's approved paddy lands
////    @Transactional(readOnly = true)
////    public List<PaddyLand> getFarmerPaddyLands() {
////        Farmer farmer = getCurrentFarmer();
////        return paddyLandRepository.findByFarmerIdAndStatus(farmer.getId(), "Approved");
////    }
//
//    // Update farmer profile
//    @Transactional
//    public Farmer updateFarmer(Farmer farmer) {
//        Farmer existing = getCurrentFarmer();
//        existing.setName(farmer.getName());
//        existing.setMobile(farmer.getMobile());
//        existing.setAddress(farmer.getAddress());
//        return farmerRepository.save(existing);
//    }
//
//    // Placeholder for assigning default division officer
//    private DivisionOfficer getDefaultDivisionOfficer() {
//        // Implement logic to assign a division officer (e.g., based on district)
//        return divisionRepository.findById(1L)
//                .orElseThrow(() -> new IllegalArgumentException("Division officer not found"));
//    }
}