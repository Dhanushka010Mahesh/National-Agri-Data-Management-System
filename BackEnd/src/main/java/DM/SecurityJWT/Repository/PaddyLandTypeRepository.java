package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.Address;
import DM.SecurityJWT.Entity.PaddyLandType;
import DM.SecurityJWT.Entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaddyLandTypeRepository extends JpaRepository<PaddyLandType,Long> {
    Optional<PaddyLandType> findByTypeNameAndSoilType(String typeName, String soilType);
}
