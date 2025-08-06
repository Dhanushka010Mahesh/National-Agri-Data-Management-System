package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Dto.FarmersActiveInactiveDTO;
import DM.SecurityJWT.Dto.SelectFarmerDTO;
import DM.SecurityJWT.Entity.AuthUsers;
import DM.SecurityJWT.Entity.Farmer;
import DM.SecurityJWT.Entity.Role;
import DM.SecurityJWT.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
//    @Query("SELECT COUNT(a.id) FROM AuthUsers a JOIN a.farmer f WHERE a.districtIdFk = :districtId AND f.divisionIdFk = :divisionId AND a.status = :status AND a.role = :role")
//    Long countByDistrictIdAndDivisionId(String districtId, String divisionId, Status status, Role role);
@Query("SELECT COUNT(f.id) FROM Farmer f WHERE f.district.id = :districtId AND f.division.id = :divisionId AND f.status = :status AND f.role = :role")
Long countByDistrictIdAndDivisionIdAndStatusAndRole(@Param("districtId") Long districtId, @Param("divisionId") Long divisionId, Status status, Role role);

    List<Farmer> findByDivisionId(Long divisionId);

    @Query("SELECT COUNT(f) FROM Farmer f WHERE f.id IN (SELECT c.farmer.id FROM Cultivate c WHERE c.crop.id = :cropId)")
    Object countByCropId(Long id);
    @Query("SELECT new DM.SecurityJWT.Dto.SelectFarmerDTO(f.id, f.nic) " +
            "FROM Farmer f WHERE f.division.id = :divisionId AND f.status = :status")
    List<SelectFarmerDTO> findByDivisionIdAndStatus(@Param("divisionId") Long divisionId, @Param("status") Status status);

    @Query("SELECT new DM.SecurityJWT.Dto.FarmersActiveInactiveDTO(f.username, f.nic, f.mobileNumber, f.address, f.status) " +
            "FROM Farmer f WHERE f.division.id = :divisionId AND f.status = :status")
    List<FarmersActiveInactiveDTO> findByDivisionIdAndStatusD(@Param("divisionId") Long divisionId, @Param("status") Status status);

    Arrays findByStatus(Status status);
}
//    Optional<AuthUsers> findByUsername(String username);
//    @Query("SELECT COUNT(f) FROM Farmer f WHERE f.status = :status AND f.role = :role AND f.division.id = :divisionId")
//    Long countByStatus(Status status, Role role, Long districtId);
