package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.*;
import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class AuthUsers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 50)
    private String username;

    @NonNull
    @Size(max = 100)
    private String password;

    @NonNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @NonNull
    @Size(max = 20)
    private String status; // e.g., Pending, Approved, Inactive
}