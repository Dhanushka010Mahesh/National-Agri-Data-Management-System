package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Dto.SelectCropDTO;
import DM.SecurityJWT.Entity.Crop;
import DM.SecurityJWT.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface CropRepository extends JpaRepository<Crop,Long> {

    List<SelectCropDTO> findByStatus(Status status);

    Arrays findAllByStatus(Status status);
}
