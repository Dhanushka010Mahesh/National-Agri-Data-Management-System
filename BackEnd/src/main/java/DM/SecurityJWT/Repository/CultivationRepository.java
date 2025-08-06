package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.Cultivate;
import DM.SecurityJWT.Entity.CultivateStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CultivationRepository extends JpaRepository<Cultivate,Long> {
    @Query("SELECT c FROM Cultivate c WHERE c.paddyLand.division.id = :divisionId")
    List<Cultivate> findByDivisionId(Long divisionId);

    @Query("SELECT COUNT(c) FROM Cultivate c WHERE c.crop.id = :cropId")
    long countByCropId(Long cropId);

    List<Cultivate> findByPaddyLandIdAndStatus(Long paddyLandId, CultivateStatus status);
}
