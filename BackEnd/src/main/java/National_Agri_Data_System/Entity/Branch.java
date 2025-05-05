package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 10)
    private String branchCode;
    @NonNull
    @Size(max = 50)
    private String branchName;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;
}
