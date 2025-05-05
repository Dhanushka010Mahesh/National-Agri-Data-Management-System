package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Farmer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(min = 10, max = 12)
    private String nic;

    @NonNull
    @Size(max = 50)
    private String name;

    @NonNull
    @Size(max = 15)
    private String mobile;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_account_id")
    private BankAccount bankAccount;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime registrationDate;

    @NonNull
    @Size(max = 20)
    private String status; // e.g., Pending, Approved

    @NonNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auth_users_id", nullable = false)
    private AuthUsers loginDetails;
}