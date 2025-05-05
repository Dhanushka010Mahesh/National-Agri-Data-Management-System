package National_Agri_Data_System.Service;

import National_Agri_Data_System.Entity.Cultivation;
import National_Agri_Data_System.Entity.Farmer;
import National_Agri_Data_System.Repository.CultivationRepository;
import National_Agri_Data_System.Repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class CultivationService {

//    @Autowired
//    private CultivationRepository cultivationRepository;
//
//    @Autowired
//    private FarmerRepository farmerRepository;
//
//    // Division officer initiates a cultivation session
//    @Transactional
//    public Cultivation initiateCultivation(Cultivation cultivation) {
//        cultivation.setDate(LocalDateTime.now());
//        cultivation.setStatus("Ongoing");
//        return cultivationRepository.save(cultivation);
//    }
//
//    // Farmer updates cultivation details
//    @Transactional
//    public Cultivation updateCultivation(Long id, Cultivation cultivation) {
//        Cultivation existing = cultivationRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Cultivation not found"));
//
//        // Verify farmer owns the cultivation
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        Farmer farmer = farmerRepository.findByUsername(username)
//                .orElseThrow(() -> new IllegalArgumentException("Farmer not found"));
//        if (!existing.getFarmer().getId().equals(farmer.getId())) {
//            throw new AccessDeniedException("You can only update your own cultivations");
//        }
//
//        // Update allowed fields
//        existing.setCultivationExtent(cultivation.getCultivationExtent());
//        existing.setExpectedYield(cultivation.getExpectedYield());
//        existing.setStatus(cultivation.getStatus());
//        return cultivationRepository.save(existing);
//    }
}