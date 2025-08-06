package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.Division;
import DM.SecurityJWT.Entity.Role;
import DM.SecurityJWT.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DivisionRepository extends JpaRepository<Division, Long> {
    boolean existsByName(String name);

    Long countByStatus(Status status);

    Long countByDistrictIdAndStatus(Long id, Status status);

    Optional<Division> findByDistrictIdAndId(Long districtId, Long id);
//    Optional<Division> findByDistrictIdAndDivisionId(Long districtId, Long divisionId);
//    long countByLiveStatusTrue();
//
//
//    @Query("SELECT COUNT(d) FROM Division d WHERE d.liveStatus = true AND d.district.id = :districtId")
//    long countByLiveStatusTrue(@Param("districtId") Long districtId);
//
//    @Query("SELECT d FROM Division d WHERE d.district.id = :districtId AND d.liveStatus = true")
//    List<Division> findAllByDistrictId(Long districtId);
}