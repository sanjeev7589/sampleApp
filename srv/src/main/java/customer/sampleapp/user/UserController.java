package customer.sampleapp.user;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth")
public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping(value = "/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secured";
    }

    @PostMapping(value = "/add")
    public String addNewUser(@RequestBody UserInfo userInfo) {
        AuthRequest req = new AuthRequest();
        req.setUsername(userInfo.getName());
        req.setPassword(userInfo.getPassword());
        service.addUser(userInfo);
        return authenticateAndGetToken(req);
    }

    @GetMapping(value = "/get")
    public Optional<UserInfo> getUser(@RequestBody UserInfo userInfo) {
        return service.getUser(userInfo);
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

    @PostMapping(value = "/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request");
        }
    }

}

