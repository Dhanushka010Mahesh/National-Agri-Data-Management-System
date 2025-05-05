package National_Agri_Data_System.Controller;

import National_Agri_Data_System.DTO.AuthSignInRequestDTO;
import National_Agri_Data_System.DTO.AuthSignInRespondDTO;
import National_Agri_Data_System.Entity.AuthUsers;
import National_Agri_Data_System.Service.AuthService;
import National_Agri_Data_System.Service.JWTServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

//    private final JWTServices jwtServices;
//    private final AuthService farmerService;
//
//    public AuthController(JWTServices jwtServices, AuthService farmerService) {
//        this.jwtServices = jwtServices;
//        this.farmerService = farmerService;
//    }
//
//    @GetMapping("/getName")
//    public String getName(@RequestParam String token){
//        return jwtServices.getUserName(token);
//    }
//
////    @GetMapping("/username")
////    public String getUserName(@RequestParam String token){
////        return jwtServices.getUserName(token);
////    }
//
////    @PostMapping("/signin")
////    public ResponseEntity<AuthSignInRespondDTO> signin(@RequestBody AuthSignInRequestDTO loginRequest){
////        //return ResponseEntity.ok(farmerService.signIn(loginRequest));
////        AuthSignInRespondDTO res=farmerService.signIn(loginRequest);
////        if(res.getError()!=null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
////
////        return ResponseEntity.status(HttpStatus.OK).body(res);
////    }

}