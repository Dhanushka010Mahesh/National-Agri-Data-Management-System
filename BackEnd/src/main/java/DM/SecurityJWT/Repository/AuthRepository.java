package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.AuthUsers;
import DM.SecurityJWT.Entity.Role;
import DM.SecurityJWT.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<AuthUsers,Long> {

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<AuthUsers> findByUsername(String username);
//count
//    select count(id) from auth_users a where status='ACTIVE' and role='FARMER';
@Query("SELECT COUNT(a.id) FROM AuthUsers a WHERE a.status = :status AND a.role = :role")
Long countByStatusAndRole(Status status, Role role);
//    select count(id) from auth_users a where a.district_id_fk=1 and status='ACTIVE' and role='FARMER';
//@Query("SELECT COUNT(a.id) FROM AuthUsers a WHERE a.district.id = :districtId AND a.status = :status AND a.role = :role")
@Query("SELECT COUNT(a.id) FROM AuthUsers a WHERE a.district.id = :districtId AND a.status = :status AND a.role = :role")
Long countByDistrictIdAndStatusAndRole(@Param("districtId") Long districtId, Status status, Role role);

//    select count(f.id) from auth_users a,farmer f where a.district_id_fk=1 and f.division_id_fk=5 and status='PENDING' and  and role='FARMER';
//@Query("SELECT COUNT(a.id) FROM AuthUsers a JOIN a.DistrictOfficer f WHERE a.districtId = :districtId AND f.divisionId = :divisionId AND a.status = :status AND a.role = :role")

//    @Query("SELECT COUNT(a.id) FROM AuthUsers a WHERE a.district.id = :districtId AND a.division.id = :divisionId AND a.status = :status AND a.role = :role")
//    Long countByDistrictIdAndDivisionIdAndStatusAndRole(@Param("districtId") Long districtId, @Param("divisionId") Long divisionId, Status status, Role role);
}



//    @Query("SELECT au FROM AuthUsers au WHERE au.username = :username AND TYPE(au) = AuthUsers")