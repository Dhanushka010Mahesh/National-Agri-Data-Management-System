package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.DistrictOfficer;
import DM.SecurityJWT.Entity.DivisionOfficer;
import DM.SecurityJWT.Entity.Role;
import DM.SecurityJWT.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DistrictOfficerRepository extends JpaRepository<DistrictOfficer,Long> {
//
//    @Query("SELECT COUNT(d) FROM DistrictOfficer d WHERE d.districtId = :districtId AND d.divisionId = :divisionId")
//    Long countByDistrictIdAndDivisionId(String districtId, String divisionId);
//    @Query("SELECT COUNT(d) FROM DistrictOfficer d WHERE d.districtId = :districtId")
//    Long countByDistrictId(String districtId);


}
