package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.AuthUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<AuthUsers,String> {
    Optional<AuthUsers> findByUsername(String username);
}
