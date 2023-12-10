package customer.sampleapp.entity;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeJobDetails {
    // private Long id;
    private String employment_type;
    private Date start_date;
    private Date end_date;
    private Integer emp_job_status;
    public EmployeeJobDetails( String employment_type, Date start_date, Date end_date, Integer emp_job_status) {
        
        this.employment_type = employment_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.emp_job_status = emp_job_status;
    }
  
}
