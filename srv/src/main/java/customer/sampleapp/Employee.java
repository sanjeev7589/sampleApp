
package customer.sampleapp;

import org.springframework.stereotype.Component;

import javax.persistence.Entity;

import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.persistence.ConstructorResult;
import javax.persistence.Id;



import javax.persistence.ColumnResult;
import lombok.Getter;
import lombok.Setter;

@SqlResultSetMapping(name = "employee", classes = @ConstructorResult(targetClass = Employee.class, columns = {
        @ColumnResult(name = "id", type = Long.class),
        @ColumnResult(name = "first_name", type = String.class),
        @ColumnResult(name = "gender", type = String.class),
}))

@Entity
@Component
@Getter
@Setter

@Table(name = "employee")
public class Employee {
    @Id
   private Long id;
   private String first_name;
   private String gender;
    public Employee(){

    }
    public Employee(Long id, String first_name,String gender)
    {
        this.id = id;
        this.first_name = first_name;
        this.gender = gender;
    }
}
