package DM.SecurityJWT.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JWTServices {
    private final SecretKey secretKey;

    public JWTServices(){
        /* when create object using HmacSHA256 algorithm genarate new key for JWT token create needed after*/
        try {
            SecretKey k= KeyGenerator.getInstance("HmacSHA256")
                    .generateKey();
            secretKey= Keys.hmacShaKeyFor(k.getEncoded());
        }catch (Exception e){
            throw new RuntimeException();
        }
    }

    /* using secret key create JWT Token for need authentication */
    public String getJWTToken(String username, Map<String,Object> claims){
        return Jwts.builder()
                .claims(claims)

                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*15)) /* 15min will expire JWT Token key */
                .signWith(secretKey)

                .compact();
    }

    /* now we need validate token key. we need get subject username*/
    public String getUserName(String token){
        Claims data=getTokenData(token);
        if(data==null) return null;
        return data.getSubject();

    }

    public Object getFieldFromToken(String token,String key){
        Claims data=getTokenData(token);
        if(data==null) return null;
        return data.get(key);
    }

    private Claims getTokenData(String token){
        try {
            return Jwts
                    .parser()
                    .verifyWith(secretKey).build()
                    .parseSignedClaims(token)
                    .getPayload();
        }catch (Exception e){
            return null;
        }
    }
}
