package National_Agri_Data_System.Repository;

import National_Agri_Data_System.Entity.Cultivation;
import National_Agri_Data_System.Entity.Farmer;
import National_Agri_Data_System.Entity.PaddyLand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CultivationRepository extends JpaRepository<Cultivation, Long> {

    // Find cultivations by farmer
    List<Cultivation> findByFarmer(Farmer farmer);

    // Find cultivations by paddy land
    List<Cultivation> findByPaddyLand(PaddyLand paddyLand);

    // Find active cultivations
    List<Cultivation> findByStatus(String status);

    // Custom query for district cultivation report
    @Query("SELECT d.districtName, cc.name, SUM(c.cultivationExtent), SUM(c.expectedYield) " +
            "FROM Cultivation c JOIN c.paddyLand p JOIN p.address a JOIN a.district d " +
            "JOIN c.crop cr JOIN cr.category cc WHERE d.id = :districtId GROUP BY d.id, cc.id")
    List<Object[]> findCultivationReportByDistrict(Long districtId);

    // Custom query for district productivity report
    @Query("SELECT d.districtName, cc.name, SUM(c.cultivationExtent), SUM(c.expectedYield) " +
            "FROM Cultivation c JOIN c.paddyLand p JOIN p.address a JOIN a.district d " +
            "JOIN c.crop cr JOIN cr.category cc WHERE d.id = :districtId AND c.status = 'Harvested' " +
            "GROUP BY d.id, cc.id")
    List<Object[]> findProductivityReportByDistrict(Long districtId);
}