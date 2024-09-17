package customer.sampleapp.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserInfoService userInfoService;

    @GetMapping(value = "/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secured";
    }

    @PostMapping(value = "/add")
    public String addNewUser(@RequestBody UserInfo userInfo) {
       return userInfoService.addUser(userInfo);
    } 
    @GetMapping(value = "/user")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() {
        return "Welcome to User Profile";
    }

    @GetMapping(value = "/admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }

}

