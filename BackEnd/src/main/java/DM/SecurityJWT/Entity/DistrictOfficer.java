package DM.SecurityJWT.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@DiscriminatorValue("DISTRICT_OFFICER")
@Entity
@AllArgsConstructor
@Data
@PrimaryKeyJoinColumn(name = "id")
@NoArgsConstructor
public class DistrictOfficer extends AuthUsers{
    private String districtOfficeName;
}
