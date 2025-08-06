package DM.SecurityJWT.Filter;

import DM.SecurityJWT.Entity.AuthUsers;
import DM.SecurityJWT.Repository.AuthRepository;
import DM.SecurityJWT.Service.JWTServices;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter { /* every request this filter executes*/

    private final JWTServices jwtServices;
    private final AuthRepository authRepository;

    public JWTFilter(JWTServices jwtServices,  AuthRepository authRepository) {
        this.jwtServices = jwtServices;
        this.authRepository = authRepository;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization=request.getHeader("Authorization");
        if(authorization==null){
            filterChain.doFilter(request,response);
            return;
        }

        /* check our token have or not. token srart with Bearer or any word. if yes token is have. we can validate it */
        if(!authorization.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        /* come token sample = Bearer 78shabd7d....*/
        /* so we get only token. so space have create array. first index Bearer and secound index is token */
        String jwt_token=authorization.split(" ")[1];
        /* using token get username */
        String username=jwtServices.getUserName(jwt_token);

        /* if user give invalid token username will null , if null do usual execution */
        if(username == null) {
            filterChain.doFilter(request,response);
            return;
        }

        /* if come here is mean we have correct token and username. now we can check username our database have valid or not*/
        AuthUsers loginUserData=authRepository.findByUsername(username).orElse(null);

        /* this mean token username not have database. */
        if(loginUserData == null) {
            filterChain.doFilter(request,response);
            return;
        }

        /* check already athentication . if not authentication yet we next do this class some oparation */
        if(SecurityContextHolder.getContext().getAuthentication()!=null) {
            filterChain.doFilter(request,response);
            return;
        }

        UserDetails userDetails= User.builder()
                        .username(loginUserData.getUsername())
                                .password(loginUserData.getPassword())
                                        .build();
        /* this SecurityContextHolder create some token down using some details */
        UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

        /* after not inaf this token. this token now used  user data only. so more security used user Ip address etc .. */
        token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        /* now create token give SecurityContextHolder for authentication  */
        SecurityContextHolder.getContext().setAuthentication(token);

        System.out.println(jwt_token);

        /* continuesly do after filters */
        filterChain.doFilter(request,response);
    }
}
