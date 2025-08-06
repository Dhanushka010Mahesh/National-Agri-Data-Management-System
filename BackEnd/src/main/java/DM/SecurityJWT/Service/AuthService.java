package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.*;
import DM.SecurityJWT.Entity.*;
import DM.SecurityJWT.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthService {

    //user login validation must create


    @Autowired
    private AuthRepository authRepository;
    @Autowired
    private FarmerRepository farmerRepository;
    @Autowired
    private DivisionOfficerRepository divisionOfficerRepository;
    @Autowired
    private DistrictOfficerRepository districtOfficerRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private BankRepository bankRepository;
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private AgricultureOfficerRepository agricultureOfficerRepository;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTServices jwtServices;

    public AuthService(PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTServices jwtServices) {
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtServices = jwtServices;
    }

    public LoginResponedDTO signIn(LoginRequestDTO loginRequest) {

        Boolean farmerPresent = isUserEnable(loginRequest.getUsername());
        if (!farmerPresent) {
            return new LoginResponedDTO(null, "Error", "invalid username", null);
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
        } catch (Exception e) {
            return new LoginResponedDTO(null, "Error", "user not found", null);
        }

        // Fetch user from database
        AuthUsers user = authRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create claims map from database data
        Map<String, Object> claims = new HashMap<>();
        claims.put("Id", user.getId().toString());
        claims.put("userName", user instanceof Farmer ? ((Farmer)user).getFullName() : user.getUsername());
        claims.put("role", user.getRole().name());
        claims.put("status", user.getStatus().name());
        claims.put("email", user.getEmail());
        if (!(user instanceof AgricultureOfficer)) {
            claims.put("districtId", user.getDistrict() != null && user.getDistrict().getId() != null ? user.getDistrict().getId().toString() : "all");
        }
        if (user instanceof DivisionOfficer) {
            DivisionOfficer divisionOfficer = (DivisionOfficer) user;
            claims.put("divisionId", divisionOfficer.getDivision().getId());
        }

        String token = jwtServices.getJWTToken(loginRequest.getUsername(), claims);

        System.out.println(jwtServices.getFieldFromToken(token, "role"));

        return new LoginResponedDTO(token, "token get successfully", null, LocalDateTime.now());
    }

    protected Boolean isUserEnable(String username) {
        return authRepository.findByUsername(username).isPresent();
    }


    private void validateUserInput(String username, String email) {
        if (authRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (authRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
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


    public RespondDTO createFarmerAccount(String username, String password, String email, String fullName,
                                          String nic, String mobileNumber, Division division, District district,
                                          Address address, Bank bank) {
        validateUserInput(username, email);

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

        Bank savedBank = bankRepository.findByAccountNumberAndBankName(bank.getAccountNumber(), bank.getBankName())
                .orElseGet(() -> bankRepository.save(bank));

        Division savedDivision = divisionRepository.findById(division.getId())
                .orElseThrow(() -> new IllegalArgumentException("Division not found with id: " + division.getId()));

        District savedDistrict = districtRepository.findById(district.getId())
                .orElseThrow(() -> new IllegalArgumentException("District not found with id: " + district.getId()));

        Farmer farmer = new Farmer();
        farmer.setUsername(username);
        farmer.setPassword(passwordEncoder.encode(password));
        farmer.setEmail(email);
        farmer.setRole(Role.FARMER);
        farmer.setStatus(Status.PENDING);
        farmer.setDistrict(savedDistrict);
        farmer.setFullName(fullName);
        farmer.setNic(nic);
        farmer.setMobileNumber(mobileNumber);
        farmer.setDivision(savedDivision);
        farmer.setAddress(savedAddress);
        farmer.setBank(savedBank);
        farmer.setRegistrationDate(LocalDateTime.now());

        farmerRepository.save(farmer);
        return new RespondDTO("Farmer Account Created with Id " + farmer.getId(), null);
    }

    public RespondDTO createDivisionAccount(String username, String password, String email,
                                            String divisionOfficeName, District district, Division division) {
        validateUserInput(username, email);

        District savedDistrict = districtRepository.findById(district.getId())
                .orElseThrow(() -> new IllegalArgumentException("District not found with id: " + district.getId()));
        Division savedDivision = divisionRepository.findById(division.getId())
                .orElseThrow(() -> new IllegalArgumentException("Division not found with id: " + division.getId()));

        DivisionOfficer officer = new DivisionOfficer();
        officer.setUsername(username);
        officer.setPassword(passwordEncoder.encode(password));
        officer.setEmail(email);
        officer.setRole(Role.DIVISION_OFFICER);
        officer.setStatus(Status.ACTIVE);
        officer.setDistrict(savedDistrict);
        officer.setDivisionOfficeName(divisionOfficeName);
        officer.setDivision(savedDivision);

        divisionOfficerRepository.save(officer);
        return new RespondDTO("Division Account Created with Id " + officer.getId(), null);
    }

    public RespondDTO createDistrictAccount(String username, String password, String email,
                                            String districtOfficeName, District district) {

        validateUserInput(username, email);
        District savedDistrict = districtRepository.findById(district.getId())
                .orElseThrow(() -> new IllegalArgumentException("District not found with id: " + district.getId()));

        DistrictOfficer officer = new DistrictOfficer();
        officer.setUsername(username);
        officer.setPassword(passwordEncoder.encode(password));
        officer.setEmail(email);
        officer.setRole(Role.DISTRICT_OFFICER);
        officer.setStatus(Status.ACTIVE);
        officer.setDistrict(savedDistrict);
        officer.setDistrictOfficeName(districtOfficeName);

        districtOfficerRepository.save(officer);
        return new RespondDTO("District Account Created with Id " + officer.getId(), null);
    }


    public Long getCountFarmers(){
        return authRepository.countByStatusAndRole(Status.ACTIVE,Role.FARMER);
    }

    public Long getCountFarmers(Long districtId){
        return authRepository.countByDistrictIdAndStatusAndRole(districtId,Status.ACTIVE,Role.FARMER);
    }

    public Long getCountFarmers(Long districtId,Long divisionId){
        return farmerRepository.countByDistrictIdAndDivisionIdAndStatusAndRole(districtId,divisionId,Status.ACTIVE,Role.FARMER);
    }

    public Long getCountDivisionOfficers(){
        return authRepository.countByStatusAndRole(Status.ACTIVE,Role.DIVISION_OFFICER);
    }


    public Long getCountDivisionOfficers(Long districtId){
        return authRepository.countByDistrictIdAndStatusAndRole(districtId,Status.ACTIVE,Role.DIVISION_OFFICER);
    }


    public Long getCountDivisionOfficers(String districtId, String divisionId){
        return divisionOfficerRepository.countByDistrictIdAndDivisionIdAndStatusAndRole(districtId,divisionId,Status.ACTIVE,Role.DIVISION_OFFICER);
    }


    public Long getCountDistrictOfficers(){
        return authRepository.countByStatusAndRole(Status.ACTIVE,Role.DISTRICT_OFFICER);
    }


    public Long getCountDistrictOfficers(Long districtId){
        return authRepository.countByDistrictIdAndStatusAndRole(districtId,Status.ACTIVE,Role.DISTRICT_OFFICER);
    }


    public RespondDTO createAgricultureAccount(String username, String password, String email,  String contactInfo) {
        validateUserInput(username, email);

        AgricultureOfficer officer = new AgricultureOfficer();
        officer.setUsername(username);
        officer.setPassword(passwordEncoder.encode(password));
        officer.setEmail(email);
        officer.setRole(Role.AGRICULTURE_OFFICER);
        officer.setStatus(Status.ACTIVE);
        officer.setContactInfo(contactInfo);

        agricultureOfficerRepository.save(officer);
        return new RespondDTO("Agriculture Account Created with Id " + officer.getId(), null);
    }

    public List<GetAllUsersDTO> getAllUsers() {
        return  authRepository.findAll().stream()
                .map(authUsers -> new GetAllUsersDTO(
                        authUsers.getUsername(),
                        authUsers.getRole(),
                        authUsers.getEmail(),
                        authUsers.getStatus(),
                        authUsers.getDistrict() != null ? authUsers.getDistrict().getName() : "Sri Lanka"
                )).collect(Collectors.toList());
    }


}


//    public AuthUsers createNewFarmer(AuthUsers authUsers){
//         /*Farmer farmer1=new Farmer(farmer.getId(),
//                 farmer.getName(),farmer.getMobile(), farmer.getBankNumber(),farmer.getUsername(),
//                 passwordEncoder.encode(farmer.getPassword()), farmer.getLocation());
//           return userRepository.save(farmer1); */
//        authUsers.setPassword(passwordEncoder.encode(authUsers.getPassword()));
//        AuthUsers farmer2=authUsers;
//        return userRepository.save(farmer2);
//    }



//    public LoginResponedDTO signIn(LoginRequestDTO loginRequest) {
//        System.out.println("ok");
//        Boolean farmerPresent = isUserEnable(loginRequest.getUsername());
//        System.out.println("yes");
//        if (!farmerPresent) {
//            return new LoginResponedDTO(null, "Error", "invalid username", null);
//        }
//
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//        } catch (Exception e) {
//            return new LoginResponedDTO(null, "Error", "user not found", null);
//        }
//
//        /* this get using database */
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("Id", "U0001");
//        claims.put("userName", "Dhanushka");
//        claims.put("role", "FARMER");
//        claims.put("status", "Active");
//        claims.put("email", "Dhanushka.Jayarathna01@gmail.com");
//
//        String token = jwtServices.getJWTToken(loginRequest.getUsername(), claims);
//
//        System.out.println(jwtServices.getFieldFromToken(token, "email"));
//
//        return new LoginResponedDTO(token, "token get seccuessfully", null, LocalDateTime.now());
//
//    }
