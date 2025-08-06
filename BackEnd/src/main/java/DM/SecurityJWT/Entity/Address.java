package DM.SecurityJWT.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;

    private String street;

    private String city;

    @Enumerated(EnumType.STRING)
    private Province state;

    private String postalCode;


    public Address(String number, String street, String city) {
        this.number=number;
        this.city=city;
        this.street=street;
    }

    public Address(String s) {

    }
}