package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class DivisionOfficer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 10)
    private String officerCode;

    @NonNull
    @Size(max = 50)
    private String name;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;

    @NonNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auth_users_id", nullable = false)
    private AuthUsers loginDetails;
}