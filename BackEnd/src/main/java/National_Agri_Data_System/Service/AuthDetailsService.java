package National_Agri_Data_System.Service;

import National_Agri_Data_System.Entity.AuthUsers;
import National_Agri_Data_System.Entity.Farmer;
import National_Agri_Data_System.Repository.AuthRepository;
import National_Agri_Data_System.Repository.DistrictRepository;
import National_Agri_Data_System.Repository.DivisionRepository;
import National_Agri_Data_System.Repository.FarmerRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class AuthDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final AuthRepository authRepository;

    public AuthDetailsService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    /* when user provide username and password check is it valid or not*/
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        AuthUsers farmerData=authRepository.findByUsername(username).orElse(null);
        if(farmerData==null) throw new UsernameNotFoundException("Not found farmer account");

        UserDetails user= User.builder()

                /*
                .username("admin")
                .password(passwordEncoder.encode("1234")) // before give password we need encord our password
                */
                .username("admin")//farmerData.getUsername())
                .password("1234")//farmerData.getPassword())

                .build();

        return user;
    }
}