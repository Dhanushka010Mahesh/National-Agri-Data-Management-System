package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.Division;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DivisionRepository extends JpaRepository<Division, Long> {
    long countByLiveStatusTrue();
}