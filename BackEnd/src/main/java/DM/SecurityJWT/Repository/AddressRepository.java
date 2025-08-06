package DM.SecurityJWT.Repository;

import DM.SecurityJWT.Entity.Address;
import DM.SecurityJWT.Entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByNumberAndStreetAndCityAndStateAndPostalCode(
            String number, String street, String city, Province state, String postalCode);
}