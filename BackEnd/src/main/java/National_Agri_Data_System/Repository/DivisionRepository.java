package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.DivisionOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DivisionRepository extends JpaRepository<DivisionOfficer, Long> {

//    // Find division officer by officer code
//    Optional<DivisionOfficer> findByOfficerCode(String officerCode);

//    // Find division officer by username (for authentication)
//    Optional<DivisionOfficer> findByUsername(String username);

//    // Find division officers by district
//    List<DivisionOfficer> findByDistrictId(Long districtId);
}