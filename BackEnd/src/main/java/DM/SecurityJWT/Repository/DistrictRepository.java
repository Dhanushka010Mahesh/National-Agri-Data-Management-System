package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Long> {
    long countByLiveStatusFalse();

    List<District> findByLiveStatusTrue();

    long countByLiveStatusTrue();
}