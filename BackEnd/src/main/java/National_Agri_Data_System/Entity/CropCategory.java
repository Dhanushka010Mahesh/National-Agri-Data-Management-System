package National_Agri_Data_System.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class CropCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 50)
    private String name; // e.g., Rice Farming, Vegetables, Long-Term Crops
}
