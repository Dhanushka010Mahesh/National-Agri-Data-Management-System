package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 50)
    private String name; // e.g., Samba, Leek, Tea
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private CropCategory category;
    private Integer growthDurationDays;
    private Double expectedYieldPerHectare; // In tons
}