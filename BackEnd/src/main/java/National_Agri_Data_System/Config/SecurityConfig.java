package National_Agri_Data_System.Config;

import National_Agri_Data_System.Filter.JWTFilter;
import National_Agri_Data_System.Repository.AuthRepository;
import National_Agri_Data_System.Repository.DistrictRepository;
import National_Agri_Data_System.Repository.DivisionRepository;
import National_Agri_Data_System.Repository.FarmerRepository;
import National_Agri_Data_System.Service.AuthDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    private final AuthRepository authRepository;
//    private final JWTFilter jwtFilter;
//
//    public SecurityConfig(AuthRepository authRepository, JWTFilter jwtFilter) {
//        this.authRepository = authRepository;
//        this.jwtFilter = jwtFilter;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
//        /* default security changes do */
//        /* Bean is like object. spring boot project when run create Bean , we edit that Bean all changes effect project execute*/
//        return httpSecurity
//                /* csrf disable */
//                .csrf(c->c.disable())
//                .sessionManagement(s->s
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//
//                /* some authentication disable-permit( give path in patterns) and anather all do like usualy  */
//                .authorizeHttpRequests(r->r
//                        .requestMatchers("/api/v1/auth/getName").permitAll()
//                        .anyRequest().authenticated()
//                )
//
//                /* before authentication process we need edit filter and set it to program. after do anther filter usualy */
//                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
//
//                /* if not give  this line automatically assign default one */
//                .authenticationProvider(authenticationProvider())
//                /* give encorde algorithm , username , password   */
//
//                //.httpBasic(Customizer.withDefaults()) /* basic auth usaly do  */
//                .build();
//
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder(12);
//    }
//
//    /* dao is a basic authentication method*/
//    @Bean
//    public DaoAuthenticationProvider authenticationProvider(){
//        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
//
//        /*we create custom pasword encorder and user details set provider*/
//        provider.setUserDetailsService(usersDetailsService());
//        provider.setPasswordEncoder(passwordEncoder());
//
//        return provider;
//    }
//
//    @Bean
//    public AuthDetailsService usersDetailsService(){
//        return new AuthDetailsService(authRepository);
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
//        return configuration.getAuthenticationManager();
//    }

}