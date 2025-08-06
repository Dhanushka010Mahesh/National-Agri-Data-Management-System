package DM.SecurityJWT.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@Data
@PrimaryKeyJoinColumn(name = "id")
@NoArgsConstructor
public class AgricultureOfficer extends AuthUsers {
    private String contactInfo;
}
