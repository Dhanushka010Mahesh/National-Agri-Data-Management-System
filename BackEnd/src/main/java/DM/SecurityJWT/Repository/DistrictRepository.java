package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Dto.DistrictRespondDTO;
import DM.SecurityJWT.Entity.District;
import DM.SecurityJWT.Entity.Role;
import DM.SecurityJWT.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Long> {
//    long countByLiveStatusFalse();

//    long countByLiveStatusTrue();

    boolean existsByName(String name);

    List<District> findByStatus(Status status);

    Long countByStatus(Status status);

//    @Query("SELECT a FROM District a WHERE a.status = :status")
//    List<DistrictRespondDTO> findByStatus(Status status);
}