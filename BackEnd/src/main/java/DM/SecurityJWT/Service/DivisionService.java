package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.*;
import DM.SecurityJWT.Entity.*;
import DM.SecurityJWT.Repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DivisionService {

    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private PaddyLandRepository paddyLandRepository;
    @Autowired
    private AuthRepository authRepository;
    @Autowired
    private FarmerRepository farmerRepository;
    @Autowired
    private CultivationRepository cultivationRepository;
    private final DivisionOfficerRepository divisionOfficerRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DivisionService(PasswordEncoder passwordEncoder,DivisionOfficerRepository divisionOfficerRepository) {
        this.passwordEncoder = passwordEncoder;
        this.divisionOfficerRepository = divisionOfficerRepository;
    }

    public List<DivisionOfficer> getAllDivisionOfficers() {
        return divisionOfficerRepository.findAll();
    }

    public Division save(Division division) {
        return divisionRepository.save(division);
    }

    public DivisionOfficer createDivisionAccount(DivisionOfficer divisionOfficer){
        divisionOfficer.setPassword(passwordEncoder.encode(divisionOfficer.getPassword()));
        return divisionOfficerRepository.save(divisionOfficer);
    }

    private void validateDistrictName(String name) {
        if (divisionRepository.existsByName(name)) {
            throw new IllegalArgumentException("Username already exists");
        }
    }
    private Province convertToProvince(String state) {
        if (state == null) {
            throw new IllegalArgumentException("State cannot be null");
        }
        // Handle string input to match Province enum (e.g., "Central Province" -> "CentralProvince")
        String normalizedState = state.replace(" ", "");
        try {
            return Province.valueOf(normalizedState);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid state: " + state + ". Must be one of: " +
                    String.join(", ", Province.getProvinceNames()));
        }
    }


    public RespondDTO createDivision(String name,District district, Address address){

        validateDistrictName(name);

        // Convert state string to Province enum if necessary
        if (address.getState() == null) {
            throw new IllegalArgumentException("State cannot be null");
        }
        // Ensure state is a Province enum (in case it's set as a string from DTO)
        if (!(address.getState() instanceof Province)) {
            address.setState(convertToProvince(address.getState().toString()));
        }

        District savedDistrict = districtRepository.findById(district.getId())
                .orElseThrow(() -> new IllegalArgumentException("District not found with id: " + district.getId()));


        // Save related entities first
        Address savedAddress = addressRepository.findByNumberAndStreetAndCityAndStateAndPostalCode(
                address.getNumber(), address.getStreet(), address.getCity(), (Province) address.getState(), address.getPostalCode()
        ).orElseGet(() -> addressRepository.save(address));

        Division division=new Division();
        division.setName(name);
        division.setStatus(Status.ACTIVE);
        division.setDistrict(savedDistrict);
        division.setAddress(savedAddress);

        divisionRepository.save(division);
        return new RespondDTO("New Division Created with Id "+division.getId(),null);
    }

    public List<PageSingleDistrictDTO> getAllDistrictsPageData(Long districtId) {
        // Validate districtId
        if (districtId == null || districtId <= 0) {
            throw new IllegalArgumentException("District ID must be a positive number");
        }

        // Fetch district
        District district = districtRepository.findById(districtId)
                .orElseThrow(() -> new IllegalArgumentException("District not found with ID: " + districtId));

        // Create DTO
        PageSingleDistrictDTO singleDistrictDTO = new PageSingleDistrictDTO();
        singleDistrictDTO.setDistrictId(district.getId());
        singleDistrictDTO.setName(district.getName());
        singleDistrictDTO.setLandsCount(paddyLandRepository.countByDistrictIdAndStatus(districtId, Status.ACTIVE));
        singleDistrictDTO.setFarmersCount(authRepository.countByDistrictIdAndStatusAndRole(districtId, Status.ACTIVE, Role.FARMER));
        singleDistrictDTO.setDivisionsCount(divisionRepository.countByDistrictIdAndStatus(districtId, Status.ACTIVE));

        // Map divisions to PageSingleDivisionDTO
//        List<PageSingleDivisionDTO> divisionsDTO = (district.getDivisions() != null ? district.getDivisions() : Collections.emptyList())
        List<PageSingleDivisionDTO> divisionsDTO = district.getDivisions().stream()
                .map(division -> {
                    PageSingleDivisionDTO singleDivisionDTO = new PageSingleDivisionDTO();
                    singleDivisionDTO.setDivisionId(division.getId());
                    singleDivisionDTO.setName(division.getName());
                    singleDivisionDTO.setLandsCount(paddyLandRepository.countByDistrictIdAndDivisionIdAndStatus(district.getId(),division.getId(),Status.ACTIVE));
                    singleDivisionDTO.setFarmersCount(farmerRepository.countByDistrictIdAndDivisionIdAndStatusAndRole(district.getId(),division.getId(),Status.ACTIVE,Role.FARMER));

                    return singleDivisionDTO;
                })
                .toList();
        singleDistrictDTO.setDivisions(divisionsDTO);


        return List.of(singleDistrictDTO);
    }

    public PageSingleDivisionDTO getAllDivisionData(Long districtId, Long divisionId) {
        if (districtId == null || divisionId == null || districtId <= 0 || divisionId <= 0) {
            throw new IllegalArgumentException("District ID and Division Id must be a positive number");
        }

        // Fetch division
        Division division = divisionRepository.findByDistrictIdAndId(districtId, divisionId)
                .orElseThrow(() -> new IllegalArgumentException("Division not found with District ID: " + districtId + " and Division ID: " + divisionId));

        PageSingleDivisionDTO divisionsDTO = new PageSingleDivisionDTO();
        divisionsDTO.setDivisionId(division.getId());
        divisionsDTO.setName(division.getName());
        divisionsDTO.setLandsCount(paddyLandRepository.countByDistrictIdAndDivisionIdAndStatus(districtId, divisionId, Status.ACTIVE));
        divisionsDTO.setFarmersCount(farmerRepository.countByDistrictIdAndDivisionIdAndStatusAndRole(districtId, divisionId, Status.ACTIVE, Role.FARMER));
        return divisionsDTO;
    }

    //this method want change status alive
    @Transactional
    public AllSingleDivisionPageDTO getSingleDivisionData(Long divisionId) {
        AllSingleDivisionPageDTO dto = new AllSingleDivisionPageDTO();
        Division division = divisionRepository.findById(divisionId)
                .orElseThrow(() -> new RuntimeException("Division not found with id: " + divisionId));

        dto.setDivisionId(divisionId);
        dto.setName(division.getName());

        // Count farmers, lands, and cultivations
        List<Farmer> farmers = farmerRepository.findByDivisionId(divisionId);
        dto.setFarmersCount((long) farmers.size());

        List<PaddyLand> lands = paddyLandRepository.findByDivisionId(divisionId);
        dto.setLandsCount((long) lands.size());

        List<Cultivate> cultivates = cultivationRepository.findByDivisionId(divisionId);
        dto.setCultivateCount((long) cultivates.size());

        // Group cultivations by crop category
        List<CropTermDTO> riceFarming = cultivates.stream()
                .filter(c -> c.getCrop().getCategory() == CropCategory.RICE_FARMING)
                .map(c -> new CropTermDTO(c.getCrop().getId(), c.getCrop().getName(),
                        (long) farmerRepository.countByCropId(c.getCrop().getId()),
                        (long) paddyLandRepository.countByCropId(c.getCrop().getId()),
                        (long) cultivationRepository.countByCropId(c.getCrop().getId())))
                .collect(Collectors.toList());

        List<CropTermDTO> vegetables = cultivates.stream()
                .filter(c -> c.getCrop().getCategory() == CropCategory.VEGETABLES)
                .map(c -> new CropTermDTO(c.getCrop().getId(), c.getCrop().getName(),
                        (long) farmerRepository.countByCropId(c.getCrop().getId()),
                        (long) paddyLandRepository.countByCropId(c.getCrop().getId()),
                        (long) cultivationRepository.countByCropId(c.getCrop().getId())))
                .collect(Collectors.toList());

        List<CropTermDTO> longTerm = cultivates.stream()
                .filter(c -> c.getCrop().getCategory() == CropCategory.LONG_TERM)
                .map(c -> new CropTermDTO(c.getCrop().getId(), c.getCrop().getName(),
                        (long) farmerRepository.countByCropId(c.getCrop().getId()),
                        (long) paddyLandRepository.countByCropId(c.getCrop().getId()),
                        (long) cultivationRepository.countByCropId(c.getCrop().getId())))
                .collect(Collectors.toList());

        dto.setRiceFarming(riceFarming);
        dto.setVegetablesFarming(vegetables);
        dto.setLongTermCrop(longTerm);

        return dto;
    }
}
