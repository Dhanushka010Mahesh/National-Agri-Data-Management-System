package National_Agri_Data_System.Service;

import National_Agri_Data_System.DTO.DistrictReportDTO;
import National_Agri_Data_System.Repository.CultivationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DistrictService {

//    @Autowired
//    private CultivationRepository cultivationRepository;
//
//    // Get cultivation report for a district
//    @Transactional(readOnly = true)
//    public List<DistrictReportDTO> getCultivationReport(Long districtId) {
//        List<Object[]> results = cultivationRepository.findCultivationReportByDistrict(districtId);
//        return results.stream().map(result -> new DistrictReportDTO(
//                (String) result[0], // districtName
//                (String) result[1], // cropCategory
//                ((Number) result[2]).doubleValue(), // totalExtent
//                ((Number) result[3]).doubleValue()  // totalExpectedYield
//        )).collect(Collectors.toList());
//    }
//
//    // Get productivity report for a district
//    @Transactional(readOnly = true)
//    public List<DistrictReportDTO> getProductivityReport(Long districtId) {
//        List<Object[]> results = cultivationRepository.findProductivityReportByDistrict(districtId);
//        return results.stream().map(result -> new DistrictReportDTO(
//                (String) result[0], // districtName
//                (String) result[1], // cropCategory
//                ((Number) result[2]).doubleValue(), // totalExtent
//                ((Number) result[3]).doubleValue()  // totalExpectedYield
//        )).collect(Collectors.toList());
//    }
}