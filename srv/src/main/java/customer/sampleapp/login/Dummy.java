package customer.sampleapp.login;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class Dummy {
    private Long id;
    private String userName;
    private String name;
    private String roles;
    private String password;
    private String token;
}
