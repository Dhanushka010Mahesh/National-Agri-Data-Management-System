package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {

//    // Find farmer by NIC
//    Optional<Farmer> findByNic(String nic);
//
//    // Find farmer by username
//    Optional<Farmer> findByUsername(String username);
//
//    // Find farmers by status
//    List<Farmer> findByStatus(String status);
//
//    // Find farmers by district (via address)
//    @Query("SELECT f FROM Farmer f JOIN f.address a WHERE a.district.id = :districtId")
//    List<Farmer> findByDistrictId(Long districtId);
}
