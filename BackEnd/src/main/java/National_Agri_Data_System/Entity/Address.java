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
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 10)
    private String houseNumber;
    @NonNull
    @Size(max = 100)
    private String street;
    @NonNull
    @Size(max = 50)
    private String city;
    @NonNull
    @Size(max = 50)
    private String state;
    @Size(max = 10)
    private String postalCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;
}
