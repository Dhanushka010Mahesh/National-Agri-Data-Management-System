package DM.SecurityJWT.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
//@RequiredArgsConstructor
public class Cultivate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    private CultivateStatus status;
    private Double yieldAmount;
    private Double cultivationExtent;
    @Enumerated(EnumType.STRING)
    private Season season;

    @ManyToOne
    @JoinColumn(name = "farmer_id_fk")
    private Farmer farmer;

    @ManyToOne
    @JoinColumn(name = "paddyLand_id_fk")
    private PaddyLand paddyLand;

    @ManyToOne
    @JoinColumn(name = "crop_id_fk")
    private Crop crop;

}
