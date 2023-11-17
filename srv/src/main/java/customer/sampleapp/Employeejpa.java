
package customer.sampleapp;

import java.util.Date;

import javax.persistence.*;

import org.springframework.stereotype.Component;
import java.sql.Timestamp;  

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "employee")
@Entity
public class Employeejpa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "gender")
    private String gender;

    @Column(name = "marital_status")
    private String marital_status;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "created_by")
    private Long created_by;

    @Column(name = "created_on")
    private Timestamp created_on;

    @Column(name = "modified_by")
    private Long modified_by;

    @Column(name = "modified_on")
    private Timestamp modified_on;

    @Column(name = "status")
    private Integer status;
}
