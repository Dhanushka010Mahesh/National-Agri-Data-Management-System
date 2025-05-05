package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class PaddyLand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 10)
    private String landCode;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    @NonNull
    private Double landExtent; // In hectares

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paddy_land_type_id")
    private PaddyLandType type;

    @NonNull
    @Size(max = 20)
    private String irrigationType;

    @NonNull
    @Size(max = 20)
    private String status; // e.g., Pending, Approved, Active

    private String geoCoordinates;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = true)
    private Farmer farmer; // For farmer-land assignment
}