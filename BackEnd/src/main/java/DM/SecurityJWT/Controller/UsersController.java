package DM.SecurityJWT.Controller;

import DM.SecurityJWT.Dto.*;
import DM.SecurityJWT.Entity.Farmer;
import DM.SecurityJWT.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8090")
@RestController
@RequestMapping("/api/v1/users")
public class UsersController {

    private final AuthService authService;
    @Autowired
    private FarmerService farmerService;

    public UsersController(AuthService authService) {
        this.authService=authService;
    }


    @PostMapping("/signin")
    public ResponseEntity<LoginResponedDTO> signin(@RequestBody LoginRequestDTO loginRequest){
        //return ResponseEntity.ok(farmerService.signIn(loginRequest));
        LoginResponedDTO res=authService.signIn(loginRequest);
        if(res.getError()!=null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }


    @PostMapping("/farmer")
    public ResponseEntity<RespondDTO> createFarmerAccount(@RequestBody FarmerSignUpRequestDTO farmerDTO) {

        RespondDTO farmer = authService.createFarmerAccount(
                farmerDTO.getUsername(),
                farmerDTO.getPassword(),
                farmerDTO.getEmail(),
                farmerDTO.getFullName(),
                farmerDTO.getNic(),
                farmerDTO.getMobileNumber(),
                farmerDTO.getDivision(),
                farmerDTO.getDistrict(),
                farmerDTO.getAddress(), // Pass AddressDTO directly
                farmerDTO.getBank()
        );
        return ResponseEntity.ok(farmer);
    }

    @GetMapping("/farmer/count")
    public Long getCountFarmers(){
        return authService.getCountFarmers();
    }

    @GetMapping("/farmer/count/{districtId}")
    public Long getCountFarmers(@PathVariable Long districtId){
        return authService.getCountFarmers(districtId);
    }

    @GetMapping("/farmer/count/{districtId}/{divisionId}")
    public Long getCountFarmers(@PathVariable Long districtId,@PathVariable Long divisionId){
        return authService.getCountFarmers(districtId,divisionId);
    }


    @PostMapping("/division-officer")
    public ResponseEntity<RespondDTO> createDivisionAccount(@RequestBody DivisionSignUpRequestDTO divisionOfficerDTO) {

        RespondDTO response = authService.createDivisionAccount(
                divisionOfficerDTO.getUsername(),
                divisionOfficerDTO.getPassword(),
                divisionOfficerDTO.getEmail(),
                divisionOfficerDTO.getDivisionOfficeName(),
                divisionOfficerDTO.getDistrict(),
                divisionOfficerDTO.getDivision()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/division-officer/count")
    public Long getCountDivisionOfficers(){
        return authService.getCountDivisionOfficers();
    }

    @GetMapping("/division-officer/count/{districtId}")
    public Long getCountDivisionOfficers(@PathVariable Long districtId){
        return authService.getCountDivisionOfficers(districtId);
    }

    @GetMapping("/division-officer/count/{districtId}/{divisionId}")
    public Long getCountDivisionOfficers(@PathVariable String districtId,@PathVariable String divisionId){
        return authService.getCountDivisionOfficers(districtId,divisionId);
    }

    @PostMapping("/district-officer")
    public ResponseEntity createDistrictAccount(@RequestBody DistrictSignUpRequestDTO districtOfficerDTO){

        RespondDTO officer = authService.createDistrictAccount(
                districtOfficerDTO.getUsername(),
                districtOfficerDTO.getPassword(),
                districtOfficerDTO.getEmail(),
                districtOfficerDTO.getDistrictOfficeName(),
                districtOfficerDTO.getDistrict()
        );
        return ResponseEntity.ok(officer);
    }


    @GetMapping("/district-officer/count")
    public Long getCountDistrictOfficers(){
        return authService.getCountDistrictOfficers();
    }

    @GetMapping("/district-officer/count/{districtId}")
    public Long getCountDistrictOfficers(@PathVariable Long districtId){
        return authService.getCountDistrictOfficers(districtId);
    }

    @PostMapping("/agriculture-officer")
    public ResponseEntity createAgricultureAccount(@RequestBody AgricultureSignUpRequestDTO agricultureOfficerDTO){

        RespondDTO officer = authService.createAgricultureAccount(
                agricultureOfficerDTO.getUsername(),
                agricultureOfficerDTO.getPassword(),
                agricultureOfficerDTO.getEmail(),
                agricultureOfficerDTO.getContactInfo()
        );
        return ResponseEntity.ok(officer);
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<GetAllUsersDTO>> getAllUsers(){
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @GetMapping("/farmer-profile/{id}")
    public Optional<GetFarmerByIdProfileDTO> getProfileData(@PathVariable Long id){
        return farmerService.getProfileData(id);
    }

//    @GetMapping("/active-farmers/{id}")
//    public ResponseEntity<List<FarmersActiveInactiveRespondDTO>> getActiveFarmers(@PathVariable Long id){
//        return ResponseEntity.ok(farmerService.getActiveFarmers(id));
//    }
//    @GetMapping("/inActive-farmers/{id}")
//    public ResponseEntity<List<FarmersActiveInactiveDTO>> getInActiveFarmers(@PathVariable Long id){
//        return ResponseEntity.ok(farmerService.getInActiveFarmers(id));
//    }
}
//
//    @GetMapping("/username")
//    public String getUserName(@RequestParam String token){
//        return jwtServices.getUserName(token);
//    }

//    @GetMapping("/getAllFarmers")
//    public List<Farmer> getAllFarmers(){
//        return farmerService.getAllFarmer();
//    }
//    @GetMapping("/getAllDivisionOfficers")
//    public List<DivisionOfficer> getAllDivisionOfficers(){
//        return divisionService.getAllDivisionOfficers();
//    }
//    @GetMapping("/getAllDistrictOfficers")
//    public List<DistrictOfficer> getAllDistrictOfficers(){
//        return districtService.getAllDistrictOfficers();
//    }
//

//@PostMapping("/signup")
//public ResponseEntity<RegisterUserRespondDTO> signup(@RequestBody RegisterUserRequestDTO registerRequest){
//    System.out.println(
//            "hi" );
//    RegisterUserRespondDTO res=userService.signUp(registerRequest);
//    if(res.getError()!=null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
//
//    return ResponseEntity.status(HttpStatus.OK).body(res);
//}