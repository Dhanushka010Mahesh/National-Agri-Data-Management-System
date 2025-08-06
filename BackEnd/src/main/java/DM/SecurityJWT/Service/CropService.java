package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.CropCreateRequestDTO;
import DM.SecurityJWT.Dto.CropGetRespondDTO;
import DM.SecurityJWT.Dto.RespondDTO;
import DM.SecurityJWT.Dto.SelectCropDTO;
import DM.SecurityJWT.Entity.Crop;
import DM.SecurityJWT.Entity.CropCategory;
import DM.SecurityJWT.Entity.Status;
import DM.SecurityJWT.Repository.CropRepository;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CropService {

    private final CropRepository cropRepository;

    public CropService(CropRepository cropRepository) {
        this.cropRepository = cropRepository;
    }

    @Transactional
    public RespondDTO createCrop( String name, CropCategory category, Integer growDurationDates, Double expectedYieldPerHectare) {
        Crop crop = new Crop();
        crop.setName(name);
        crop.setCategory(category);
        crop.setStatus(Status.ACTIVE);
        crop.setGrowthDurationDays(growDurationDates);
        crop.setExpectedYieldPerHectare(expectedYieldPerHectare);
        cropRepository.save(crop);

        return new RespondDTO("created with Id "+crop.getId(),null);
    }


    public List<CropGetRespondDTO> getAllCrops() {
        return cropRepository.findAll().stream()
                .map(crop -> new CropGetRespondDTO(
                        crop.getName(),
                        crop.getCategory(),
                        crop.getGrowthDurationDays(),
                        crop.getExpectedYieldPerHectare(),
                        crop.getStatus()
                ))
                .collect(Collectors.toList());
    }

    public List<SelectCropDTO> cropGetActive() {
        List<SelectCropDTO> crops = cropRepository.findByStatus(Status.ACTIVE);
        return crops.stream()
                .map(crop -> new SelectCropDTO(
                        crop.getId(),
                        crop.getName(),
                        crop.getCategory(),
                        crop.getGrowthDurationDays(),
                        crop.getExpectedYieldPerHectare()))
                .collect(Collectors.toList());
    }
}
