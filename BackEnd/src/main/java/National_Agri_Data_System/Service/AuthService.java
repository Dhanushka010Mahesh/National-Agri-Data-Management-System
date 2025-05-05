package National_Agri_Data_System.Service;

import National_Agri_Data_System.DTO.AuthSignInRequestDTO;
import National_Agri_Data_System.DTO.AuthSignInRespondDTO;
import National_Agri_Data_System.Entity.AuthUsers;
import National_Agri_Data_System.Repository.AuthRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthService {

//    private final AuthRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final AuthenticationManager authenticationManager;
//    private final JWTServices jwtServices;
//
//    public AuthService(AuthRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTServices jwtServices) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.authenticationManager = authenticationManager;
//        this.jwtServices = jwtServices;
//    }
//
////    public AuthSignInRespondDTO signIn(AuthSignInRequestDTO loginRequest){
////
////        try{
////            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
////        }catch (Exception e){
////            return new AuthSignInRespondDTO(null,"Error","user not found",null);
////        }
////
////        /* this get using database */
////        Map<String,Object> claims=new HashMap<>();
////        claims.put("role","user");
////        claims.put("email","Dhanushka.Jayarathna01@gmail.com");
////
////        String token=jwtServices.getJWTToken(loginRequest.getUsername(),claims);
////
////        System.out.println(jwtServices.getFieldFromToken(token,"email"));
////
////        return  new AuthSignInRespondDTO(token,"token get seccuessfully" ,null, LocalDateTime.now());
////
////    }
//
//
//
//    private Boolean isFarmerEnable(String username){
//        return userRepository.findByUsername(username).isPresent();
//    }
}