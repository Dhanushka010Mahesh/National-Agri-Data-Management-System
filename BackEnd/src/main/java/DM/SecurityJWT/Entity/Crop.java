package DM.SecurityJWT.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
//@RequiredArgsConstructor
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @NonNull
//    @Size(max = 50)
    private String name; // e.g., Samba, Leek, Tea
    @Enumerated(EnumType.STRING)
    private CropCategory category;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Integer growthDurationDays; //how many time go like 80 dayes
    private Double expectedYieldPerHectare; // In tons

    @OneToMany(mappedBy = "crop",cascade = CascadeType.ALL)
    private List<Cultivate> cultivates;
}
