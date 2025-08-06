package DM.SecurityJWT.Config;

import DM.SecurityJWT.Filter.JWTFilter;
import DM.SecurityJWT.Repository.AuthRepository;
import DM.SecurityJWT.Service.UsersDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
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

    private final AuthRepository authRepository;
    private final JWTFilter jwtFilter;

    public SecurityConfig(AuthRepository authRepository, JWTFilter jwtFilter) {
        this.authRepository = authRepository;
        this.jwtFilter = jwtFilter;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        /* default security changes do */
        /* Bean is like object. spring boot project when run create Bean , we edit that Bean all changes effect project execute*/
        return httpSecurity
                /* csrf disable */
                .csrf(c->c.disable())
                .sessionManagement(s->s
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                /* some authentication disable-permit( give path in patterns) and anather all do like usualy  */
                .authorizeHttpRequests(r->r
                        .requestMatchers("/api/v1/users/**","/api/v1/lands/**","/api/v1/crops/**","/api/v1/district/**","/api/v1/blogs/get/**","/api/v1/divisions/**","/api/v1/cultivation/**").permitAll()
                        .anyRequest().authenticated()
                )

                /* before authentication process we need edit filter and set it to program. after do anther filter usualy */
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                /* if not give  this line automatically assign default one */
                .authenticationProvider(authenticationProvider())
                /* give encorde algorithm , username , password   */

                //.httpBasic(Customizer.withDefaults()) /* basic auth usaly do  */
                .build();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(12);
    }

    /* dao is a basic authentication method*/
    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();

        /*we create custom pasword encorder and user details set provider*/
        provider.setUserDetailsService(usersDetailsService());
        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public UsersDetailsService usersDetailsService(){
        return new UsersDetailsService(authRepository);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }

}
