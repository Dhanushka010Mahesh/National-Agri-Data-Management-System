package DM.SecurityJWT.Controller;

import DM.SecurityJWT.Entity.District;
import DM.SecurityJWT.Service.DistrictService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8090/")
@RestController
@RequestMapping("/api/v1/district")
public class DistrictController {


    private final DistrictService districtService;

    public DistrictController(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping("/getAllDistricts")
    public List<District> getAllDistricts() {
        return districtService.getAllDistricts();
    }

    @GetMapping("/getDisableDistrictCount")
    public long getDistrictCountWithOfficer() {
        return districtService.getDisableDistrictCount();
    }

    @GetMapping("/getDisableDivisionCount")
    public long getDivisionCountWithOfficer() {
        return districtService.getDisableDivisionCount();
    }

    @GetMapping("/getAllLiveDistrictCount")
    public long getDistrictCountWithoutOfficer() {
        return districtService.getAllDistrictCount();
    }

    @GetMapping("/getAllLiveDivisionCount")
    public long getDivisionCountWithoutOfficer() {
        return districtService.getAllDivisionCount();
    }

    @GetMapping("/districtSelected/{id}")
    public Optional<District> getDistrictsWithOfficerDivisions(@PathVariable("id") Long district_Id) {
        return districtService.districtsSelected(district_Id);
    }
}