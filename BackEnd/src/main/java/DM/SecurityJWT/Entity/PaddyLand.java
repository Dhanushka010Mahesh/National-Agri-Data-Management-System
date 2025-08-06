package DM.SecurityJWT.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class PaddyLand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String landOwnerNIC;
    private String landOwnerName;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id_fk")
    private Address address;

    @NonNull
    private Double landExtent; // In hectares

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paddy_land_type_id_fk")
    private PaddyLandType type;

    @NonNull
//    @Size(max = 20)
    private String irrigationType;

    @NonNull
//    @Size(max = 20)
    @Enumerated(EnumType.STRING)
    private Status status; // e.g., Pending, Approved, Active

    private String geoCoordinates;

    @ManyToOne
    @JoinColumn(name = "farmer_id_fk")
    @JsonBackReference
    private Farmer farmer;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime registrationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_id_fk")
    private Division division;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id_fk")
    private District district;

    @OneToMany(mappedBy = "paddyLand",cascade = CascadeType.ALL)
    private List<Cultivate> cultivates;


}
