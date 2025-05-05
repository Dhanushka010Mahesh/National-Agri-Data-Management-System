package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.ApprovalRequest;
import National_Agri_Data_System.Entity.DistrictOfficer;
import National_Agri_Data_System.Entity.DivisionOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ApprovalRepository extends JpaRepository<ApprovalRequest, Long> {

    // Find pending requests for a specific division officer
    List<ApprovalRequest> findByDivisionOfficerAndStatus(DivisionOfficer divisionOfficer, String status);

    // Find pending requests for a specific district officer
    List<ApprovalRequest> findByDistrictOfficerAndStatus(DistrictOfficer districtOfficer, String status);

    // Find requests by type and status
    List<ApprovalRequest> findByTypeAndStatus(String type, String status);

    // Find requests by farmer and status
    List<ApprovalRequest> findByFarmerIdAndStatus(Long farmerId, String status);

    // Custom query for pending requests by division officer ID
    @Query("SELECT ar FROM ApprovalRequest ar WHERE ar.divisionOfficer.id = :divisionOfficerId AND ar.status = 'Pending'")
    List<ApprovalRequest> findPendingByDivisionOfficerId(Long divisionOfficerId);

    // Custom query for pending requests by district officer ID
    @Query("SELECT ar FROM ApprovalRequest ar WHERE ar.districtOfficer.id = :districtOfficerId AND ar.status = 'Pending'")
    List<ApprovalRequest> findPendingByDistrictOfficerId(Long districtOfficerId);
}