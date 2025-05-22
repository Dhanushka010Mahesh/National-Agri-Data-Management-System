package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.LoginRequestDTO;
import DM.SecurityJWT.Dto.LoginResponedDTO;
import DM.SecurityJWT.Dto.RegisterUserRequestDTO;
import DM.SecurityJWT.Dto.RegisterUserRespondDTO;
import DM.SecurityJWT.Entity.AuthUsers;

import java.util.List;

public interface AuthServices {
    List<AuthUsers> getAllFarmer();
    AuthUsers createNewFarmer(AuthUsers authUsers);
    AuthUsers createNewFarmer2(RegisterUserRequestDTO authUsers);
    LoginResponedDTO signIn(LoginRequestDTO loginRequest);
    RegisterUserRespondDTO signUp(RegisterUserRequestDTO req);
    RegisterUserRespondDTO updateUser(String userName,RegisterUserRequestDTO userData);
}
