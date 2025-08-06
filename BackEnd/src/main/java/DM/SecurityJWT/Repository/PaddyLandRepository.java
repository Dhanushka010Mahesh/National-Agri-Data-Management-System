package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Dto.SelectFarmerDTO;
import DM.SecurityJWT.Dto.SelectPaddyLandDTO;
import DM.SecurityJWT.Entity.PaddyLand;
import DM.SecurityJWT.Entity.Role;
import DM.SecurityJWT.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaddyLandRepository extends JpaRepository<PaddyLand,Long> {
    @Query("SELECT COUNT(a.id) FROM PaddyLand a WHERE a.status = :status")
    Long countByStatus(Status status);
    @Query("SELECT COUNT(a.id) FROM PaddyLand a WHERE a.district.id = :districtId AND a.status = :status")
    Long countByDistrictIdAndStatus(Long districtId, Status status);
    @Query("SELECT COUNT(f.id) FROM PaddyLand f WHERE f.district.id = :districtId AND f.division.id = :divisionId AND f.status = :status")
    Long countByDistrictIdAndDivisionIdAndStatus(@Param("districtId") Long districtId, @Param("divisionId") Long divisionId, Status status);

    List<PaddyLand> findByDivisionId(Long divisionId);

    @Query("SELECT COUNT(p) FROM PaddyLand p WHERE p.id IN (SELECT c.paddyLand.id FROM Cultivate c WHERE c.crop.id = :cropId)")
    Object countByCropId(Long id);

    List<SelectPaddyLandDTO> findByDivisionIdAndStatus(Long divisionId, Status status);
}
