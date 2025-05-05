package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.LoginRequestDTO;
import DM.SecurityJWT.Dto.LoginResponedDTO;
import DM.SecurityJWT.Dto.RegisterUserRequestDTO;
import DM.SecurityJWT.Dto.RegisterUserRespondDTO;
import DM.SecurityJWT.Entity.AuthUsers;
import DM.SecurityJWT.Repository.UsersRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UsersService {


    private final UsersRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTServices jwtServices;

    public UsersService(UsersRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTServices jwtServices) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtServices = jwtServices;
    }

    public List<AuthUsers> getAllFarmer(){
        return userRepository.findAll();
    }

    public AuthUsers createNewFarmer(AuthUsers authUsers){
         /*Farmer farmer1=new Farmer(farmer.getId(),
                 farmer.getName(),farmer.getMobile(), farmer.getBankNumber(),farmer.getUsername(),
                 passwordEncoder.encode(farmer.getPassword()), farmer.getLocation());
           return userRepository.save(farmer1); */
        authUsers.setPassword(passwordEncoder.encode(authUsers.getPassword()));
        AuthUsers farmer2=authUsers;
        return userRepository.save(farmer2);
    }

    public AuthUsers createNewFarmer2(RegisterUserRequestDTO authUsers){
        AuthUsers farmer1=new AuthUsers(authUsers.getId(),
                authUsers.getUsername(), passwordEncoder.encode(authUsers.getPassword()),authUsers.getRole(), authUsers.getStatus(),authUsers.getLocation());
        return userRepository.save(farmer1);
    }

    public LoginResponedDTO signIn(LoginRequestDTO loginRequest){
        Boolean farmerPresent=isFarmerEnable(loginRequest.getUsername());
        if(!farmerPresent){
            return new LoginResponedDTO(null,"Error","invalid username",null);
        }

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        }catch (Exception e){
            return new LoginResponedDTO(null,"Error","user not found",null);
        }

        /* this get using database */
        Map<String,Object> claims=new HashMap<>();
        claims.put("role","user");
        claims.put("email","Dhanushka.Jayarathna01@gmail.com");

        String token=jwtServices.getJWTToken(loginRequest.getUsername(),claims);

        System.out.println(jwtServices.getFieldFromToken(token,"email"));

        return  new LoginResponedDTO(token,"token get seccuessfully" ,null,LocalDateTime.now());

    }

    public RegisterUserRespondDTO signUp(RegisterUserRequestDTO req){
        if(isFarmerEnable(req.getUsername())) return new RegisterUserRespondDTO("Farmer already exsist in the database",null);

        var userData=this.createNewFarmer2(req);
        if(userData.getId()==null) return new RegisterUserRespondDTO("system error",null);

        return new RegisterUserRespondDTO(String.format("user register at %s",userData.getId()),null);
    }

    private Boolean isFarmerEnable(String username){
        return userRepository.findByUsername(username).isPresent();
    }
}
