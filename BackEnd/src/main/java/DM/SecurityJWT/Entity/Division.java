package DM.SecurityJWT.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Division {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "division_id")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id_fk")
    @JsonBackReference
    private District district;
    @Enumerated(EnumType.STRING)
    private Status status;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id_fk")
    private Address address;

    public void setDistrict(District district) {
        this.district = district;
        if (district != null && !district.getDivisions().contains(this)) {
            district.getDivisions().add(this);
        }
    }

    //    private boolean liveStatus; // Maps to BIT in MySQL

    //    private int lands;
//    private int farmers;

//    // Custom getter for JSON serialization to format ID as DIV_XXXX
//    @JsonProperty("id")
//    public String getFormattedId() {
//        return String.format("DIV_%04d", id);
//    }

//    // Custom getter for district_id_fk
//    @JsonProperty("districtId")
//    public String getDistrictId() {
//        return district != null ? String.format("DIS_%04d", district.getId()) : null;
//    }
}