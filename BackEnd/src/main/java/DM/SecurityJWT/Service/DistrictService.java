package DM.SecurityJWT.Service;

import DM.SecurityJWT.Entity.District;
import DM.SecurityJWT.Entity.Division;
import DM.SecurityJWT.Repository.DistrictRepository;
import DM.SecurityJWT.Repository.DivisionRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistrictService {

    private final DistrictRepository districtRepository;
    private final DivisionRepository divisionRepository;

    public DistrictService(DistrictRepository districtRepository, DivisionRepository divisionRepository) {
        this.districtRepository = districtRepository;
        this.divisionRepository = divisionRepository;
    }
//
//    public List<District> getAllDistricts() {
//        return districtRepository.findAll();
//    }

//    public List<District> getAllDistrictss() {
//        return Arrays.asList(
//                new District("1", "Colombo", Arrays.asList(
//                        new Division("11", "Kolonnawa", new District("1", "Colombo", new ArrayList<>(), 35, 62), "2"),
//                        new Division("12", "Kaduwela", new District("1", "Colombo", new ArrayList<>(), 35, 62), null)
//                ), 35, 62),
//                new District("2", "Kandy", Arrays.asList(
//                        new Division("21", "Gangawata Korale", new District("1", "Colombo", new ArrayList<>(), 35, 62), null),
//                        new Division("22", "Harispattuwa", new District("1", "Colombo", new ArrayList<>(), 35, 62), null)
//                ), 42, 87),
//                new District("3", "Galle", Arrays.asList(
//                        new Division("31", "Habaraduwa", new District("1", "Colombo", new ArrayList<>(), 35, 62), null),
//                        new Division("41", "Talpe", new District("1", "Colombo", new ArrayList<>(), 35, 62), null),
//                        new Division("32", "Elpitiya", new District("1", "Colombo", new ArrayList<>(), 35, 62), null)
//                ), 78, 125),
//                new District("4", "Mathale", Arrays.asList(
//                        new Division("44", "Dabulle", new District("1", "Colombo", new ArrayList<>(), 35, 62), null),
//                        new Division("52", "Sigiriya", new District("1", "Colombo", new ArrayList<>(), 35, 62), null)
//                ), 100, 44)
//        );
//    }

////    // Mock data for testing or initialization
//@PostConstruct
//@Transactional
//public void initData() {
//    List<District> districts = Arrays.asList(
//            new District(null, "Colombo", new ArrayList<>(), 35, 62),
//            new District(null, "Kandy", new ArrayList<>(), 42, 87),
//            new District(null, "Galle", new ArrayList<>(), 78, 125),
//            new District(null, "Matale", new ArrayList<>(), 100, 44),
//            new District(null, "Kurunagala", new ArrayList<>(), 225, 108)
//    );
//
//    // Add divisions to each district
//    districts.get(0).addDivision(new Division(null, "Kolonnawa", districts.get(0), true));
//    districts.get(0).addDivision(new Division(null, "Kaduwela", districts.get(0), true));
//    districts.get(1).addDivision(new Division(null, "Gangawata Korale", districts.get(1), true));
//    districts.get(1).addDivision(new Division(null, "Harispattuwa", districts.get(1), true));
//    districts.get(2).addDivision(new Division(null, "Habaraduwa", districts.get(2), true));
//    districts.get(2).addDivision(new Division(null, "Talpe", districts.get(2), true));
//    districts.get(2).addDivision(new Division(null, "Elpitiya", districts.get(2), true));
//    districts.get(3).addDivision(new Division(null, "Dabulle", districts.get(3), true));
//    districts.get(3).addDivision(new Division(null, "Sigiriya", districts.get(3), false));
//    districts.get(3).addDivision(new Division(null, "Puththalama", districts.get(4), true));
//
//
//    // Save to database
//    districtRepository.saveAll(districts);
//}



    // Get all districts with liveStatus true
    public List<District> getAllDistricts() {
        return districtRepository.findByLiveStatusTrue();
    }
//    public List<District> getAllDistricts() {
//        return districtRepository.findAll().stream()
//                .filter(District::isLiveStatus)
//                .toList();
//    }

    public long getDisableDistrictCount() {
        return districtRepository.countByLiveStatusFalse();
    }

    public long getDisableDivisionCount() {
        return divisionRepository.findAll().stream()
                .filter(division -> !division.isLiveStatus())
                .count();
    }

    public long getAllDistrictCount() {
        return districtRepository.countByLiveStatusTrue();
    }
//    public long getAllDistrictCount() {
//        return districtRepository.findAll().stream()
//                .filter(district -> district.isLiveStatus() == true)
//                .count();
//    }

    public long getAllDivisionCount() {
        return divisionRepository.countByLiveStatusTrue();
    }


    public Optional<District> districtsSelected(Long id) {
        return districtRepository.findById(id);
    }
}