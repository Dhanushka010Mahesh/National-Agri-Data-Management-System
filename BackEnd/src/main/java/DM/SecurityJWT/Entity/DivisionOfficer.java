package DM.SecurityJWT.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@DiscriminatorValue("DIVISION_OFFICER")
@Entity
@AllArgsConstructor
@Data
@PrimaryKeyJoinColumn(name = "id")
@NoArgsConstructor
public class DivisionOfficer extends AuthUsers{
    private String divisionOfficeName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_id_fk")
    private Division division;
}
