package customer.sampleapp.entity;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class People_Api {
    private String UserName;
    private String FirstName;
    private String LastName;
    private List<PeopleEmail> people_Email;    
}
