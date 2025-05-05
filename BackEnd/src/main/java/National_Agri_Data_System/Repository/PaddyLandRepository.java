package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.PaddyLand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaddyLandRepository extends JpaRepository<PaddyLand, Long> {

    // Find paddy lands by status
    List<PaddyLand> findByStatus(String status);

    // Find paddy lands by farmer and status
    @Query("SELECT p FROM PaddyLand p JOIN ApprovalRequest ar ON p.id = ar.paddyLand.id " +
            "WHERE ar.farmer.id = :farmerId AND ar.status = :status")
    List<PaddyLand> findByFarmerIdAndStatus(Long farmerId, String status);

    // Find paddy lands by district
    @Query("SELECT p FROM PaddyLand p JOIN p.address a WHERE a.district.id = :districtId")
    List<PaddyLand> findByDistrictId(Long districtId);
}