package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.AuthUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<AuthUsers,String> {
    Optional<AuthUsers> findByUsername(String username);
}
