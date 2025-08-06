package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.DivisionOfficer;
import DM.SecurityJWT.Entity.Role;
import DM.SecurityJWT.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DivisionOfficerRepository  extends JpaRepository<DivisionOfficer,Long> {
    @Query("SELECT COUNT(f.id) FROM DivisionOfficer f WHERE f.district.id = :districtId AND f.division.id = :divisionId AND f.status = :status AND f.role = :role")
    Long countByDistrictIdAndDivisionIdAndStatusAndRole(@Param("districtId") String districtId, @Param("divisionId") String divisionId, Status status, Role role);

}
