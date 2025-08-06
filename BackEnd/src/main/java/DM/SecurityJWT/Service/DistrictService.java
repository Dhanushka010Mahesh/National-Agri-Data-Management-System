package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.*;
import DM.SecurityJWT.Entity.*;
import DM.SecurityJWT.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DistrictService {
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private AuthRepository authRepository;
    @Autowired
    private PaddyLandRepository paddyLandRepository;
    @Autowired
    private FarmerRepository farmerRepository;
    private final DivisionRepository divisionRepository;
    private final DistrictOfficerRepository districtOfficerRepository;

    public DistrictService(PasswordEncoder passwordEncoder, DivisionRepository divisionRepository, DistrictOfficerRepository districtOfficerRepository) {
        this.passwordEncoder = passwordEncoder;
        this.divisionRepository = divisionRepository;
        this.districtOfficerRepository = districtOfficerRepository;
    }

    // Get all districts with liveStatus true
//    public List<DistrictRespondDTO> getAllDistricts() {
//        return districtRepository.findByStatus(Status.ACTIVE);
//    }

//    public long getDisableDistrictCount() {
//        return districtRepository.countByLiveStatusFalse();
//    }

//    public long getDisableDivisionCount() {
//        return divisionRepository.findAll().stream()
//                .filter(division -> !division.isLiveStatus())
//                .count();
//    }


    public Optional<District> districtsSelected(Long id) {
        return districtRepository.findById(id);
    }

    public List<DistrictOfficer> getAllDistrictOfficers() {
        return districtOfficerRepository.findAll();
    }

    private void validateDistrictName(String name) {
        if (districtRepository.existsByName(name)) {
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

    public RespondDTO createDistrict(String name, Address address){

        validateDistrictName(name);

        // Convert state string to Province enum if necessary
        if (address.getState() == null) {
            throw new IllegalArgumentException("State cannot be null");
        }
        // Ensure state is a Province enum (in case it's set as a string from DTO)
        if (!(address.getState() instanceof Province)) {
            address.setState(convertToProvince(address.getState().toString()));
        }

        // Save related entities first
        Address savedAddress = addressRepository.findByNumberAndStreetAndCityAndStateAndPostalCode(
                address.getNumber(), address.getStreet(), address.getCity(), (Province) address.getState(), address.getPostalCode()
        ).orElseGet(() -> addressRepository.save(address));

        District district=new District();
        district.setName(name);
        district.setStatus(Status.ACTIVE);
        district.setAddress(savedAddress);

        districtRepository.save(district);
        return new RespondDTO("New District Created with Id "+district.getId(),null);
    }


    public List<DistrictRespondDTO> getAllDistricts() {
        // Fetch active districts from the database
        List<District> districts = districtRepository.findByStatus(Status.ACTIVE);

        // Map districts to DistrictRespondDTO
        return districts.stream()
                .map(district -> {
                    DistrictRespondDTO respondDTO = new DistrictRespondDTO();
                    respondDTO.setId(district.getId());
                    respondDTO.setName(district.getName());
                    respondDTO.setStatus(district.getStatus());

                    // Map address to AddressRespondDTO
                    if (district.getAddress() != null) {
                        AddressRespondDTO addressDTO = new AddressRespondDTO();
                        addressDTO.setId(district.getAddress().getId());
                        addressDTO.setNumber(district.getAddress().getNumber());
                        addressDTO.setStreet(district.getAddress().getStreet());
                        addressDTO.setCity(district.getAddress().getCity());
                        addressDTO.setState(district.getAddress().getState());
                        addressDTO.setPostalCode(district.getAddress().getPostalCode());
                        respondDTO.setAddress(addressDTO);
                    }

                    // Map divisions to DivisionRespondDTO
                    List<DivisionRespondDTO> divisionDTOs = district.getDivisions().stream()
                            .map(division -> {
                                DivisionRespondDTO divisionDTO = new DivisionRespondDTO();
                                divisionDTO.setId(division.getId());
                                divisionDTO.setName(division.getName());
                                divisionDTO.setStatus(division.getStatus());

                                // Map division address
                                if (division.getAddress() != null) {
                                    AddressRespondDTO divisionAddressDTO = new AddressRespondDTO();
                                    divisionAddressDTO.setId(division.getAddress().getId());
                                    divisionAddressDTO.setNumber(division.getAddress().getNumber());
                                    divisionAddressDTO.setStreet(division.getAddress().getStreet());
                                    divisionAddressDTO.setCity(division.getAddress().getCity());
                                    divisionAddressDTO.setState(division.getAddress().getState());
                                    divisionAddressDTO.setPostalCode(division.getAddress().getPostalCode());
                                    divisionDTO.setAddress(divisionAddressDTO);
                                }

                                return divisionDTO;
                            })
                            .toList();
                    respondDTO.setDivisions(divisionDTOs);

                    return respondDTO;
                })
                .toList();
    }

    public List<PageDistrictsRespondDTO> getAllDistrictsPageData() {

        PageDistrictsRespondDTO respondDTO=new PageDistrictsRespondDTO();
        respondDTO.setLandsCount(paddyLandRepository.countByStatus(Status.PENDING));
        respondDTO.setFamersCount(authRepository.countByStatusAndRole(Status.PENDING,Role.FARMER));
        respondDTO.setDivisionsCount(divisionRepository.countByStatus(Status.ACTIVE));
        respondDTO.setDistrictsCount(districtRepository.countByStatus(Status.ACTIVE));
        List<District> districts = districtRepository.findByStatus(Status.ACTIVE);
        // Map districts to DistrictRespondDTO
        List<PageSingleDistrictDTO> districtDTO=districts.stream()
                .map(district -> {
                    PageSingleDistrictDTO singleDistrictDTO=new PageSingleDistrictDTO();

                    singleDistrictDTO.setDistrictId(district.getId());
                    singleDistrictDTO.setName(district.getName());
                    singleDistrictDTO.setLandsCount(paddyLandRepository.countByDistrictIdAndStatus(district.getId(),Status.ACTIVE));
                    singleDistrictDTO.setFarmersCount(authRepository.countByDistrictIdAndStatusAndRole(district.getId(),Status.ACTIVE,Role.FARMER));
                    singleDistrictDTO.setDivisionsCount(divisionRepository.countByDistrictIdAndStatus(district.getId(),Status.ACTIVE));

                    // Map divisions to DivisionRespondDTO
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

                    return singleDistrictDTO;
                })
                .toList();
        respondDTO.setDistricts(districtDTO);
        return List.of(respondDTO);

    }

//    public List<PageDistrictsRespondDTO> getAllDistrictsPageData() {
//        // Create a single PageDistrictsRespondDTO
//        PageDistrictsRespondDTO respondDTO = new PageDistrictsRespondDTO();
//
//        // Set aggregated counts
//        respondDTO.setLandsCount(paddyLandRepository.countByStatus(Status.ACTIVE));
//        respondDTO.setFamersCount(authRepository.countByStatusAndRole(Status.ACTIVE, Role.FARMER));
//        respondDTO.setDivisionsCount(authRepository.countByStatusAndRole(Status.ACTIVE, Role.DIVISION_OFFICER));
//        respondDTO.setDistrictsCount(authRepository.countByStatusAndRole(Status.ACTIVE, Role.DISTRICT_OFFICER));
//
//        // Fetch active districts
//        List<District> districts = districtRepository.findByStatus(Status.ACTIVE);
//
//        // Map districts to PageSingleDistrictDTO
//        List<PageSingleDistrictDTO> districtDTOs = districts.stream()
//                .map(district -> {
//                    PageSingleDistrictDTO singleDistrictDTO = new PageSingleDistrictDTO();
//                    singleDistrictDTO.setDistrictId(district.getId());
//                    singleDistrictDTO.setName(district.getName());
//                    singleDistrictDTO.setLandsCount(paddyLandRepository.countByDistrictIdAndStatus(district.getId(), Status.ACTIVE));
//                    singleDistrictDTO.setFamersCount(authRepository.countByDistrictIdAndStatusAndRole(district.getId(), Status.ACTIVE, Role.FARMER));
//                    singleDistrictDTO.setDivisionsCount(authRepository.countByDistrictIdAndStatusAndRole(district.getId(), Status.ACTIVE, Role.DIVISION_OFFICER));
//
//                    // Map divisions to PageSingleDivisionDTO
//                    List<PageSingleDivisionDTO> divisionsDTO = district.getDivisions().stream()
//                            .map(division -> {
//                                PageSingleDivisionDTO singleDivisionDTO = new PageSingleDivisionDTO();
//                                singleDivisionDTO.setDivisioId(division.getId());
//                                singleDivisionDTO.setName(division.getName());
//                                singleDivisionDTO.setLandsCount(paddyLandRepository.countByDistrictIdAndDivisionIdAndStatus(district.getId(), division.getId(), Status.ACTIVE));
//                                singleDivisionDTO.setFamersCount(farmerRepository.countByDistrictIdAndDivisionIdAndStatusAndRole(district.getId(), division.getId(), Status.ACTIVE, Role.FARMER));
//                                return singleDivisionDTO;
//                            })
//                            .toList();
//                    singleDistrictDTO.setDivisions(divisionsDTO);
//
//                    return singleDistrictDTO;
//                })
//                .toList();
//
//        // Set the districts list in the response DTO
//        respondDTO.setDistricts(districtDTOs);
//
//        // Return a list containing the single PageDistrictsRespondDTO
//        return List.of(respondDTO);
//    }
}


//
//    public List<District> getAllDistricts() {
//        return districtRepository.findAll();
//    }

//    public List<District> getAllDistrictss() {
//        return Arrays.asList(
//                new District("1", "Colombo", Arrays.asList(
//                        new Division("11", "Kolonnawa", new District("1", "Colombo", new ArrayList<>(), 35, 62), "2"),
//                        new Division("12", "Kaduwela", new District("1", "Colombo", new ArrayList<>(), 35, 62), null)
//                ), 35, 62),
//                new District("2", "Kandy", Arrays.asList(
//                        new Division("21", "Gangawata Korale", new District("1", "Colombo", new ArrayList<>(), 35, 62), null),
//                        new Division("22", "Harispattuwa", new District("1", "Colombo", new ArrayList<>(), 35, 62), null)
//                ), 42, 87),
//                new District("3", "Galle", Arrays.asList(
//                        new Division("31", "Habaraduwa", new District("1", "Colombo", new ArrayList<>(), 35, 62), null),
//                        new Division("41", "Talpe", new District("1", "Colombo", new ArrayList<>(), 35, 62), null),
//                        new Division("32", "Elpitiya", new District("1", "Colombo", new ArrayList<>(), 35, 62), null)
//                ), 78, 125),
//                new District("4", "Mathale", Arrays.asList(
//                        new Division("44", "Dabulle", new District("1", "Colombo", new ArrayList<>(), 35, 62), null),
//                        new Division("52", "Sigiriya", new District("1", "Colombo", new ArrayList<>(), 35, 62), null)
//                ), 100, 44)
//        );
//    }

////    // Mock data for testing or initialization
//@PostConstruct
//@Transactional
//public void initData() {
//    List<District> districts = Arrays.asList(
//            new District(null, "Colombo", new ArrayList<>(), 35, 62),
//            new District(null, "Kandy", new ArrayList<>(), 42, 87),
//            new District(null, "Galle", new ArrayList<>(), 78, 125),
//            new District(null, "Matale", new ArrayList<>(), 100, 44),
//            new District(null, "Kurunagala", new ArrayList<>(), 225, 108)
//    );
//
//    // Add divisions to each district
//    districts.get(0).addDivision(new Division(null, "Kolonnawa", districts.get(0), true));
//    districts.get(0).addDivision(new Division(null, "Kaduwela", districts.get(0), true));
//    districts.get(1).addDivision(new Division(null, "Gangawata Korale", districts.get(1), true));
//    districts.get(1).addDivision(new Division(null, "Harispattuwa", districts.get(1), true));
//    districts.get(2).addDivision(new Division(null, "Habaraduwa", districts.get(2), true));
//    districts.get(2).addDivision(new Division(null, "Talpe", districts.get(2), true));
//    districts.get(2).addDivision(new Division(null, "Elpitiya", districts.get(2), true));
//    districts.get(3).addDivision(new Division(null, "Dabulle", districts.get(3), true));
//    districts.get(3).addDivision(new Division(null, "Sigiriya", districts.get(3), false));
//    districts.get(3).addDivision(new Division(null, "Puththalama", districts.get(4), true));
//
//
//    // Save to database
//    districtRepository.saveAll(districts);
//}

//    public long getAllDistrictCount() {
//        return districtRepository.findAll().stream()
//                .filter(district -> district.isLiveStatus() == true)
//                .count();
//    }
