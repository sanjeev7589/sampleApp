
package customer.sampleapp;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;

import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.persistence.ConstructorResult;
import javax.persistence.Id;
import javax.persistence.EntityResult;
import javax.persistence.FieldResult;

import java.security.Timestamp;
import java.sql.Time;
import java.util.Date;
import javax.persistence.ColumnResult;
import lombok.Getter;
import lombok.Setter;


@JsonIgnoreProperties(ignoreUnknown = true)
@SqlResultSetMapping(name = "employee_mapping", classes =
@ConstructorResult(targetClass = Employee.class, columns = {
@ColumnResult(name = "id", type = Long.class),
@ColumnResult(name = "first_name", type = String.class),
@ColumnResult(name = "gender", type = String.class),
@ColumnResult(name = "mobile", type = String.class),
}))

// @SqlResultSetMapping(name = "employee_mapping", entities = {
//         @EntityResult(entityClass = Employee.class, fields = {
//                 @FieldResult(name = "id", column = "id"),
//                 @FieldResult(name = "first_name", column = "first_name"),
//                 @FieldResult(name = "gender", column = "gender"),
//                 @FieldResult(name = "marital_status", column = "marital_status"),
//                 @FieldResult(name = "dob", column = "dob"),
//                 @FieldResult(name = "email", column = "email"),
//                 @FieldResult(name = "mobile", column = "mobile"),
//                 @FieldResult(name = "created_by", column = "created_by"),
//                 @FieldResult(name = "created_on", column = "created_on"),
//                 @FieldResult(name = "modified_by", column = "modified_by"),
//                 @FieldResult(name = "modified_on", column = "modified_on"),
//                 @FieldResult(name = "status", column = "status"),
//         })
// })
@Entity
@Getter
@Setter
public class Employee {
    @Id
    private Long id;
    private String first_name;
    private String gender;
//     private String marital_status;
//     private Date dob;
//     private String email;
    private String mobile;
//     private Long created_by;
//     private Date created_on;
//     private Long modified_by;
//     private Date modified_on;
//     private Integer status;


    public Employee(){

    }
    public Employee(Long id, String first_name,String gender,String mobile)
    {
    this.id = id;
    this.first_name = first_name;
    this.gender = gender;
    this.mobile = mobile;
    }
}
