package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.District;
import National_Agri_Data_System.Entity.DistrictOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {

//    // Find district by code
//    Optional<District> findByDistrictCode(String districtCode);
//
//    // Find district by name
//    Optional<District> findByDistrictName(String districtName);
//
//    // Find district by name
//    Optional<District> findByUsername(String username);
//
//    // Find district officers by district
//    List<DistrictOfficer> findByDistrictId(Long districtId);
}