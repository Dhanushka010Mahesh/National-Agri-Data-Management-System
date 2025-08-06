package DM.SecurityJWT.Service;


import DM.SecurityJWT.Dto.RespondDTO;
import DM.SecurityJWT.Entity.DistrictOfficer;

public interface UsersService {
    RespondDTO createAccount(DistrictOfficer districtOfficer);
}
