package National_Agri_Data_System.DTO;



public class DistrictReportDTO {
    private String districtName;
    private String cropCategory;
    private Double totalExtent;
    private Double totalExpectedYield;

    public DistrictReportDTO(String districtName, String cropCategory, Double totalExtent, Double totalExpectedYield) {
        this.districtName = districtName;
        this.cropCategory = cropCategory;
        this.totalExtent = totalExtent;
        this.totalExpectedYield = totalExpectedYield;
    }

    // Getters and setters
}