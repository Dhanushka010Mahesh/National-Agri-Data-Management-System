package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.PaddyLandCreateDTO;
import DM.SecurityJWT.Dto.RespondDTO;
import DM.SecurityJWT.Dto.SelectFarmerDTO;
import DM.SecurityJWT.Dto.SelectPaddyLandDTO;
import DM.SecurityJWT.Entity.*;
import DM.SecurityJWT.Repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaddyLandService {

    @Autowired
    private PaddyLandRepository paddyLandRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private PaddyLandTypeRepository paddyLandTypeRepository;


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

    public RespondDTO createPaddyLand(String landOwnerNIC,String landOwnerName,Double landExtent,String irrigationType,String geoCoordinates,Address address,PaddyLandType type,Division division,District district) {

        // Convert state string to Province enum if necessary
        if (address.getState() == null) {
            throw new IllegalArgumentException("State cannot be null");
        }
        // Ensure state is a Province enum (in case it's set as a string from DTO)
        if (!(address.getState() instanceof Province)) {
            address.setState(convertToProvince(address.getState().toString()));
        }

        Address savedAddress = addressRepository.findByNumberAndStreetAndCityAndStateAndPostalCode(
                address.getNumber(), address.getStreet(), address.getCity(), (Province) address.getState(), address.getPostalCode()
        ).orElseGet(() -> addressRepository.save(address));

        PaddyLandType savedType = paddyLandTypeRepository.findByTypeNameAndSoilType(type.getTypeName(),type.getSoilType())
                .orElseGet(() -> paddyLandTypeRepository.save(type));

        Division savedDivision = divisionRepository.findById(division.getId())
                .orElseThrow(() -> new IllegalArgumentException("Division not found with id: " + division.getId()));

        District savedDistrict = districtRepository.findById(district.getId())
                .orElseThrow(() -> new IllegalArgumentException("District not found with id: " + district.getId()));

        PaddyLand land=new PaddyLand();
        land.setLandOwnerNIC(landOwnerNIC);
        land.setLandOwnerName(landOwnerName);
        land.setLandExtent(landExtent);
        land.setIrrigationType(irrigationType);
        land.setGeoCoordinates(geoCoordinates);
        land.setAddress(savedAddress);
        land.setRegistrationDate(LocalDateTime.now());
        land.setType(savedType);
        land.setStatus(Status.PENDING);
        land.setDivision(savedDivision);
        land.setDistrict(savedDistrict);


        paddyLandRepository.save(land);
        return new RespondDTO("New Land create with Id "+land.getId(),null);
    }

    public List<SelectPaddyLandDTO> paddyLandGetActive(Long divisionId) {
        List<SelectPaddyLandDTO> paddyLands = paddyLandRepository.findByDivisionIdAndStatus(divisionId, Status.PENDING);
        return paddyLands.stream()
                .map(paddyLand -> new SelectPaddyLandDTO(
                        paddyLand.getId(),
                        paddyLand.getLandExtent(),
                        paddyLand.getLandOwnerNIC()))
                .collect(Collectors.toList());
    }

//    @Transactional
//    public PaddyLand createPaddyLand(PaddyLandCreateDTO dto) {
//        PaddyLand paddyLand = new PaddyLand();
//        paddyLand.setLandOwnerNIC(dto.getLandOwnerNIC());
//        paddyLand.setLandOwnerName(dto.getLandOwnerName());
//        paddyLand.setAddress(dto.getAddress());
//        paddyLand.setLandExtent(dto.getLandExtent());
//        paddyLand.setType(dto.getType());
//        paddyLand.setIrrigationType(dto.getIrrigationType());
//        paddyLand.setGeoCoordinates(dto.getGeoCoordinates());
//        paddyLand.setDivision(dto.getDivision());
//        paddyLand.setDistrict(dto.getDistrict());
//        paddyLand.setStatus(Status.PENDING); // Default status
//        return paddyLandRepository.save(paddyLand);
//    }
}
