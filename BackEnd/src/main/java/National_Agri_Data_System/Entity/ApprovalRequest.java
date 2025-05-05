package National_Agri_Data_System.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ApprovalRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 20)
    private String type; // e.g., FarmerAccount, PaddyLand, FarmerLandAssignment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = true)
    private Farmer farmer; // For account/land assignment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paddy_land_id", nullable = true)
    private PaddyLand paddyLand; // For land/land assignment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_officer_id")
    private DivisionOfficer divisionOfficer;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_officer_id", nullable = true)
    private DistrictOfficer districtOfficer; // Nullable for initial requests
    @NonNull
    private LocalDateTime requestDate;
    @NonNull
    @Size(max = 20)
    private String status; // e.g., Pending, Approved, Rejected
}