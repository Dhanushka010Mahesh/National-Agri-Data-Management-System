package DM.SecurityJWT.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//@DiscriminatorValue("FARMER")
@Entity
@AllArgsConstructor
@Data
@PrimaryKeyJoinColumn(name = "id")
@NoArgsConstructor
public class Farmer extends AuthUsers{
    private String fullName;
    private String nic;
    private String mobileNumber;
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime registrationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_id_fk")
    private Division division;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id_fk")
    private Address address;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_id_fk")
    private Bank bank;

    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PaddyLand> paddyLands = new ArrayList<>();

    @OneToMany(mappedBy = "farmer",cascade = CascadeType.ALL)
    private List<Cultivate> cultivates;
}
