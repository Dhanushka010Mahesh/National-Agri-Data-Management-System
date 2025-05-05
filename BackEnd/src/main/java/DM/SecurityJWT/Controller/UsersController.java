package DM.SecurityJWT.Controller;

import DM.SecurityJWT.Dto.LoginRequestDTO;
import DM.SecurityJWT.Dto.LoginResponedDTO;
import DM.SecurityJWT.Dto.RegisterUserRequestDTO;
import DM.SecurityJWT.Dto.RegisterUserRespondDTO;
import DM.SecurityJWT.Entity.AuthUsers;
import DM.SecurityJWT.Service.UsersService;
import DM.SecurityJWT.Service.JWTServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UsersController {

    private final JWTServices jwtServices;
    private final UsersService userService;

    public UsersController(JWTServices jwtServices, UsersService farmerService) {
        this.jwtServices = jwtServices;
        this.userService=farmerService;
    }

    @GetMapping("/getAllUsers")
    public List<AuthUsers> getAllUsers(){
        return userService.getAllFarmer();
    }
    @PostMapping("/createNewUser")
    public AuthUsers createNewUser(@RequestBody AuthUsers user){
        return userService.createNewFarmer(user);
    }

    @GetMapping("/username")
    public String getUserName(@RequestParam String token){
        return jwtServices.getUserName(token);
    }

    @PostMapping("/signin")
    public ResponseEntity<LoginResponedDTO> signin(@RequestBody LoginRequestDTO loginRequest){
        //return ResponseEntity.ok(farmerService.signIn(loginRequest));
        LoginResponedDTO res=userService.signIn(loginRequest);
        if(res.getError()!=null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/signup")
    public ResponseEntity<RegisterUserRespondDTO> signup(@RequestBody RegisterUserRequestDTO registerRequest){
        System.out.println(
                "hi" );
        RegisterUserRespondDTO res=userService.signUp(registerRequest);
        if(res.getError()!=null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
