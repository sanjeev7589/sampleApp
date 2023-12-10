
package customer.sampleapp.entity;

import java.util.Date;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@SqlResultSetMapping(name = "employee_mapping_all", classes = @ConstructorResult(targetClass = Employee.class, columns = {
        @ColumnResult(name = "first_name", type = String.class),
        @ColumnResult(name = "gender", type = String.class),
        @ColumnResult(name = "marital_status", type = String.class),
        @ColumnResult(name = "dob", type = Date.class),
        @ColumnResult(name = "mobile", type = String.class),
        @ColumnResult(name = "mobile", type = String.class),
        @ColumnResult(name = "emp_created_by", type = Long.class),
        @ColumnResult(name = "emp_created_on", type = Date.class),
        @ColumnResult(name = "emp_modified_by", type = Long.class),
        @ColumnResult(name = "emp_modified_on", type = Date.class),
        @ColumnResult(name = "emp_status", type = Integer.class),
        @ColumnResult(name = "employment_type", type = String.class),
        @ColumnResult(name = "start_date", type = Date.class),
        @ColumnResult(name = "end_date", type = Date.class),
        @ColumnResult(name = "emp_job_status", type = Integer.class)
}))

@SqlResultSetMapping(name = "employee_mapping", classes = @ConstructorResult(targetClass = Employee.class, columns = {
        @ColumnResult(name = "id", type = Long.class),
        @ColumnResult(name = "first_name", type = String.class),
        @ColumnResult(name = "gender", type = String.class),
        @ColumnResult(name = "mobile", type = String.class),
}))

@Entity
@Getter
@Setter
public class Employee {
    @Id
    private Long id;
    private String first_name;
    private String gender;
    private String marital_status;
    private Date dob;
    private String email;
    private String mobile;
    private Long created_by;
    private Date created_on;
    private Long modified_by;
    private Date modified_on;
    private Integer status;
    private Long emp_created_by;
    private Date emp_created_on;
    private Long emp_modified_by;
    private Integer emp_status;
    private String employment_type;
    private Date start_date;
    private Date end_date;
    private Integer emp_job_status;

    public Employee(String first_name, String gender, String marital_status, Date dob, String mobile,
            Long emp_created_by,
            Date emp_created_on, Long emp_modified_by, Date emp_modified_on, Integer emp_status, String employment_type,
            Date start_date,
            Date end_date, Integer emp_job_status) {
        this.first_name = first_name;
        this.gender = gender;
        this.marital_status = marital_status;
        this.dob = dob;
        this.mobile = mobile;
        this.emp_created_by = emp_created_by;
        this.emp_created_on = emp_created_on;
        this.emp_modified_by = emp_modified_by;
        this.emp_status = emp_status;
        this.employment_type = employment_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.emp_job_status = emp_job_status;
    }

    public Employee(Long id, String first_name, String gender, String marital_status, Date dob, String email,
            String mobile, Long created_by, Date created_on, Long modified_by, Date modified_on, Integer status) {
        this.id = id;
        this.first_name = first_name;
        this.gender = gender;
        this.marital_status = marital_status;
        this.dob = dob;
        this.email = email;
        this.mobile = mobile;
        this.created_by = created_by;
        this.created_on = created_on;
        this.modified_by = modified_by;
        this.modified_on = modified_on;
        this.status = status;
    }

    public Employee(Long id, String first_name, String gender, String mobile) {
        this.id = id;
        this.first_name = first_name;
        this.gender = gender;
        this.mobile = mobile;
    }
}
