package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.*;
import DM.SecurityJWT.Entity.*;
import DM.SecurityJWT.Repository.DistrictRepository;
import DM.SecurityJWT.Repository.DivisionRepository;
import DM.SecurityJWT.Repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FarmerService{

    private final PasswordEncoder passwordEncoder;
    @Autowired
    private FarmerRepository farmerRepository;
    private final DistrictRepository districtRepository;
    private final DivisionRepository divisionRepository;

    public FarmerService(PasswordEncoder passwordEncoder, DistrictRepository districtRepository, DivisionRepository divisionRepository) {
        this.passwordEncoder = passwordEncoder;
        this.districtRepository = districtRepository;
        this.divisionRepository = divisionRepository;
    }

//    public Long getAllLiveFarmerCount(Long districtId){
//        return farmerRepository.countByStatus(Status.ACTIVE, Role.FARMER,districtId);
//    }

    public Farmer save(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    public List<Farmer> getAllFarmer() {
        return farmerRepository.findAll();
    }

    public List<SelectFarmerDTO> farmerGetActive(Long divisionId) {
        List<SelectFarmerDTO> farmers = farmerRepository.findByDivisionIdAndStatus(divisionId, Status.PENDING);
        return farmers.stream()
                .map(farmer -> new SelectFarmerDTO(
                        farmer.getId(),
                        farmer.getNic()))
                .collect(Collectors.toList());
    }

    public Optional<GetFarmerByIdProfileDTO> getProfileData(Long id) {
        return farmerRepository.findById(id)
                .map(blog -> new GetFarmerByIdProfileDTO(
                        blog.getId(),
                        blog.getFullName(),
                        blog.getNic(),
                        blog.getMobileNumber()
//                        blog.getAddress()
                ));
    }



//    public List<FarmersActiveInactiveRespondDTO> getActiveFarmers(Long divisionId) {
//        return farmerRepository.findByDivisionIdAndStatusD(divisionId, Status.ACTIVE).stream()
//                .map(dto -> new FarmersActiveInactiveRespondDTO(
//                        dto.getUsername(),
//                        dto.getNic(),
//                        dto.getMobileNumber(),
//                        dto.getAddress() != null
//                                ? new Address(
//                                dto.getAddress().getCity()
//                                : null,
//                        dto.getStatus()
//                ))
//                .collect(Collectors.toList());
//    }
//
//    public List<FarmersActiveInactiveDTO> getInActiveFarmers(Long divisionId) {
//        return farmerRepository.findByDivisionIdAndStatusD(divisionId, Status.PENDING).stream()
//                .map(dto -> new FarmersActiveInactiveDTO(
//                        dto.getUsername(),
//                        dto.getNic(),
//                        dto.getMobileNumber(),
//                        dto.getAddress() != null
//                                ? new Address(
//                                dto.getAddress().getNumber(),
//                                dto.getAddress().getStreet(),
//                                dto.getAddress().getCity()).toString()
//                                : null,
//                        dto.getStatus()
//                ))
//                .collect(Collectors.toList());
//    }
//    public RegisterUserRespondDTO createFarmerAccount(FarmerSignUpRequestDTO farmer){
//        if(isUserEnable(farmer.getUsername())) return new RegisterUserRespondDTO("Farmer already exsist in the database",null);
//
//        farmer.setPassword(passwordEncoder.encode(farmer.getPassword()));
//        var userData=farmerRepository.save(farmer);
//        if(userData.getId()==null) return new RegisterUserRespondDTO("system error",null);
//
//        return new RegisterUserRespondDTO(String.format("farmer register at %s",userData.getId()),null);
//    }


//    public RegisterUserRespondDTO createFarmerAccount(FarmerSignUpRequestDTO farmerDTO) {
//        if (isUserEnable(farmerDTO.getUsername())) {
//            return new RegisterUserRespondDTO("Farmer already exists in the database", null);
//        }
//
//        // Create and map the Farmer entity
//        Farmer farmer = new Farmer();
//        farmer.setId(farmerDTO.getId());
//        farmer.setUsername(farmerDTO.getUsername());
//        farmer.setPassword(passwordEncoder.encode(farmerDTO.getPassword()));
//        farmer.setRole(farmerDTO.getRole());
//        farmer.setStatus(farmerDTO.getStatus());
//        farmer.setEmail(farmerDTO.getEmail());
//        farmer.setFullName(farmerDTO.getFullName());
//        farmer.setNic(farmerDTO.getNic());
//        farmer.setMobileNumber(farmerDTO.getMobileNumber());
//
//        // Assuming you fetch district and division from DB using their IDs
//        District district = districtRepository.findById(farmerDTO.getDistrictId())
//                .orElseThrow(() -> new RuntimeException("Invalid district ID"));
//        Division division = divisionRepository.findById(farmerDTO.getDivisionId())
//                .orElseThrow(() -> new RuntimeException("Invalid division ID"));
//
//        farmer.setDistrict(district);
//        farmer.setDivision(division);
//
//        // Save entity
//        Farmer savedFarmer = farmerRepository.save(farmer);
//        if (savedFarmer.getId() == null) {
//            return new RegisterUserRespondDTO("System error", null);
//        }
//
//        return new RegisterUserRespondDTO(
//                String.format("Farmer registered with ID %s", savedFarmer.getId()),
//                savedFarmer.getId()
//        );
//    }

}

//public AuthUsers createNewFarmer(RegisterUserRequestDTO authUsers) {
//    AuthUsers farmer1=new AuthUsers(authUsers.getId(),
//            authUsers.getUsername(), passwordEncoder.encode(authUsers.getPassword()),authUsers.getRole(), authUsers.getStatus(),new District());
//
//    return farmerRepository.save(farmer1);
//}
//public RegisterUserRespondDTO signUp(RegisterUserRequestDTO req) {
//    if(isUserEnable(req.getUsername())) return new RegisterUserRespondDTO("Farmer already exsist in the database",null);
//
//    var userData=this.createNewFarmer2(req);
//    if(userData.getId()==null) return new RegisterUserRespondDTO("system error",null);
//
//    return new RegisterUserRespondDTO(String.format("user register at %s",userData.getId()),null);
//}
