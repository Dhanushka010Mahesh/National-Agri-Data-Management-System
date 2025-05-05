package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Cultivation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id")
    private Farmer farmer;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paddy_land_id")
    private PaddyLand paddyLand;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id")
    private Crop crop; // Replaced cropType
    @NonNull
    private LocalDateTime date;
    @NonNull
    private Double cultivationExtent; // In hectares
    private Double expectedYield; // In tons
    @NonNull
    @Size(max = 10)
    private String season; // e.g., Yala, Maha
    @NonNull
    @Size(max = 20)
    private String status; // e.g., Ongoing, Harvested
}