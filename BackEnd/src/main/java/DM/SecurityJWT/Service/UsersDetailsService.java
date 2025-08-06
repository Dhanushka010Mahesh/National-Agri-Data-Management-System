package DM.SecurityJWT.Service;

import DM.SecurityJWT.Entity.AuthUsers;
import DM.SecurityJWT.Repository.AuthRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UsersDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    /* override password encorder for our password encorded*/
   // private final PasswordEncoder passwordEncoder;
    private final AuthRepository authRepository;

    public UsersDetailsService( AuthRepository authRepository) {
        this.authRepository = authRepository;
        //this.passwordEncoder = passwordEncoder;
    }

    /* when user provide username and password check is it valid or not*/
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        AuthUsers loginUserData=authRepository.findByUsername(username).orElse(null);
        if(loginUserData==null) throw new UsernameNotFoundException("Not found farmer account");

        UserDetails user= User.builder()

                /*
                .username("admin")
                .password(passwordEncoder.encode("1234")) // before give password we need encord our password
                */
                .username(loginUserData.getUsername())
                .password(loginUserData.getPassword())

                .build();

        return user;
    }
}
