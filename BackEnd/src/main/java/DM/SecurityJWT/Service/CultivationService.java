package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.CultivationCreateDTO;
import DM.SecurityJWT.Dto.RespondDTO;
import DM.SecurityJWT.Entity.*;
import DM.SecurityJWT.Repository.CropRepository;
import DM.SecurityJWT.Repository.CultivationRepository;
import DM.SecurityJWT.Repository.FarmerRepository;
import DM.SecurityJWT.Repository.PaddyLandRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class CultivationService {

    @Autowired
    private CultivationRepository cultivationRepository;
    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private PaddyLandRepository paddyLandRepository;

//    @Transactional
//    public Cultivate createCultivation(CultivationCreateDTO dto) {
//        Cultivate cultivate = new Cultivate();
//        cultivate.setStartDate(dto.getStartDate());
//        cultivate.setEndDate(dto.getEndDate());
//        cultivate.setStatus(dto.getStatus());
//        cultivate.setYieldAmount(dto.getYieldAmount());
//        cultivate.setCultivationExtent(dto.getCultivationExtent());
//        cultivate.setSeason(dto.getSeason());
//        cultivate.setFarmer(dto.getFarmerId());
//        cultivate.setPaddyLand(dto.getPaddyLandId());
//        cultivate.setCrop(dto.getCropId());
//        return cultivationRepository.save(cultivate);
//    }


   // @Transactional
//    public Cultivate addCultivationToFarmer(Long farmerId, CultivationCreateDTO dto) {
//        Farmer farmer = farmerRepository.findById(farmerId)
//                .orElseThrow(() -> new RuntimeException("Farmer not found with id: " + farmerId));
//        Cultivate cultivate = new Cultivate();
//        cultivate.setStartDate(dto.getStartDate());
//        cultivate.setEndDate(dto.getEndDate());
//        cultivate.setStatus(dto.getStatus());
//        cultivate.setYieldAmount(dto.getYieldAmount());
//        cultivate.setCultivationExtent(dto.getCultivationExtent());
//        cultivate.setSeason(dto.getSeason());
//        cultivate.setFarmer(farmer);
//        cultivate.setPaddyLand(dto.getPaddyLandId());
//        cultivate.setCrop(dto.getCropId());
//        cultivate = cultivationRepository.save(cultivate);
////        farmer.getCultivates().add(cultivate);
//        return cultivate;
//    }

    public RespondDTO addCultivatione(CultivationCreateDTO createDTO){
        Farmer farmerId = farmerRepository.findById(createDTO.getFarmerId().getId())
                .orElseThrow(() -> new IllegalArgumentException("Farmer with ID " + createDTO.getFarmerId().getId() + " not found"));
        PaddyLand paddyLandId = paddyLandRepository.findById(createDTO.getPaddyLandId().getId())
                .orElseThrow(() -> new IllegalArgumentException("Paddy land with ID " + createDTO.getPaddyLandId().getId() + " not found"));
        Crop cropId = cropRepository.findById(createDTO.getCropId().getId())
                .orElseThrow(() -> new IllegalArgumentException("Crop with ID " + createDTO.getCropId().getId() + " not found"));


        double landExtend=paddyLandId.getLandExtent();
        double requestedExtent = createDTO.getCultivationExtent();
        System.out.println(landExtend + " > "+ requestedExtent);
        if (requestedExtent > landExtend) {
            throw new IllegalArgumentException("Requested cultivation extent (" + requestedExtent + ") exceeds paddy land extent (" + landExtend + ")");
        }
        List<Cultivate> existingCultivations = cultivationRepository.findByPaddyLandIdAndStatus(paddyLandId.getId(), CultivateStatus.ONGOING);
        if (!existingCultivations.isEmpty()) {
            throw new IllegalArgumentException("Paddy land is already under an ongoing cultivation");
        }
        LocalDate startDate = createDTO.getStartDate();
        LocalDate endDate = startDate.plusDays(cropId.getGrowthDurationDays());

        Season season=null;
        if (createDTO.getSeason()==Season.MAHA){
         season=Season.MAHA;
        } else if (createDTO.getSeason() == Season.YALA) {
            season=Season.YALA;
        }
        else{
            season=Season.ALL_YEAR;
        }

        Cultivate cultivate = new Cultivate();
        cultivate.setStartDate(startDate);
        cultivate.setEndDate(endDate);
        cultivate.setYieldAmount(createDTO.getYieldAmount());
        cultivate.setCultivationExtent(createDTO.getCultivationExtent());
        cultivate.setSeason(season);
        cultivate.setStatus(CultivateStatus.ONGOING);
        cultivate.setFarmer(farmerId);
        cultivate.setPaddyLand(paddyLandId);
        cultivate.setCrop(cropId);
        cultivationRepository.save(cultivate);
        return  new RespondDTO("Add new cultivation with those ID "+cropId.getId() +" "+farmerId.getId()+" "+paddyLandId.getId(),null);
    }



//
//    @Transactional
//    public Cultivate createCultivation(Cultivate cultivation) throws Exception {
//
//        Optional<Farmer> farmerOpt = farmerRepository.findById(cultivation.getFarmer().getId());
//        if (!farmerOpt.isPresent()) {
//            throw new IllegalArgumentException("Farmer with ID " + cultivation.getFarmer().getId() + " not found");
//        }
//
//        // Validate Crop existence
//        if (cultivation.getCrop() == null || cultivation.getCrop().getId() == null) {
//            throw new IllegalArgumentException("Crop ID is required");
//        }
//        Optional<Crop> cropOpt = cropRepository.findById(cultivation.getCrop().getId());
//        if (!cropOpt.isPresent()) {
//            throw new IllegalArgumentException("Crop with ID " + cultivation.getCrop().getId() + " not found");
//        }
//
//        // Validate PaddyLand existence and available area
//        if (cultivation.getPaddyLand() == null || cultivation.getPaddyLand().getId() == null) {
//            throw new IllegalArgumentException("PaddyLand ID is required");
//        }
//        Optional<PaddyLand> paddyLandOpt = paddyLandRepository.findById(cultivation.getPaddyLand().getId());
//        if (!paddyLandOpt.isPresent()) {
//            throw new IllegalArgumentException("PaddyLand with ID " + cultivation.getPaddyLand().getId() + " not found");
//        }
//
//        PaddyLand paddyLand = paddyLandOpt.get();
//        // Calculate total used area for this paddy land from active cultivations
//        Double usedArea = cultivationRepository.findByPaddyLandAndStatusNot(paddyLand, CultivateStatus.COMPLETED)
//                .stream()
//                .mapToDouble(Cultivate::getCultivationExtent)
//                .sum();
//
//        // Assuming PaddyLand has a totalArea field
//        Double availableArea = paddyLand.getTotalArea() - usedArea;
//        if (cultivation.getCultivationExtent() > availableArea) {
//            throw new IllegalArgumentException("Requested cultivation extent (" + cultivation.getCultivationExtent() +
//                    " hectares) exceeds available area (" + availableArea + " hectares) for PaddyLand ID " +
//                    cultivation.getPaddyLand().getId());
//        }
//
//        // Set validated entities
//        cultivation.setFarmer(farmerOpt.get());
//        cultivation.setCrop(cropOpt.get());
//        cultivation.setPaddyLand(paddyLandOpt.get());
//
//        // Save the cultivation
//        return cultivationRepository.save(cultivation);
//    }
//
//    // Search methods for frontend autocomplete
//    public List<Farmer> searchFarmers(String query) {
//        return farmerRepository.findByNameContainingIgnoreCase(query);
//    }
//
//    public List<Crop> searchCrops(String query) {
//        return cropRepository.findByNameContainingIgnoreCase(query);
//    }
//
//    public List<PaddyLand> searchPaddyLands(String query) {
//        return paddyLandRepository.findByNameContainingIgnoreCase(query);
//    }
}
