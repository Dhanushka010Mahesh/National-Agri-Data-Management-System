package DM.SecurityJWT.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "district_id")
    private Long id; // Changed to Long for AUTO_INCREMENT

    private String name;

    @OneToMany(mappedBy = "district", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Division> divisions = new ArrayList<>();

    private int farmers;

    private int lands;

    private boolean liveStatus;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id_fk")
    private Address address;

    // Custom getter for JSON serialization to format ID as DIS_XXXX
//    @JsonProperty("id")
//    public String getFormattedId() {
//        return String.format("DIS_%04d", id);
//    }

    public void setDivisions(List<Division> divisions) {
        this.divisions = divisions != null ? divisions : new ArrayList<>();
        for (Division division : this.divisions) {
            if (division.getDistrict() != this) {
                division.setDistrict(this);
            }
        }
    }

    public void addDivision(Division division) {
        if (divisions == null) {
            divisions = new ArrayList<>();
        }
        if (!divisions.contains(division)) {
            divisions.add(division);
            if (division.getDistrict() != this) {
                division.setDistrict(this);
            }
        }
    }
}