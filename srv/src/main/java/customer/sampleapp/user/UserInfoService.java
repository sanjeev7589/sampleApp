package customer.sampleapp.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserInfo> userDetail = repository.findByName(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found &quot" + username));
    }

    public String addUser(UserInfo userInfo) {
        userInfo.setToken(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        // Authentication authentication = authenticationManager.authenticate(
        //         new UsernamePasswordAuthenticationToken(userInfo.getName(), userInfo.getPassword()));
        // if (authentication.isAuthenticated()) {
        //     return jwtService.generateToken(userInfo.getName());
        // } else {
        //     throw new UsernameNotFoundException("invalid user request");
        // }
        return "User Added Successfully";
    }

    // public Optional<UserInfo> getUser(UserInfo userInfo) {
    // return repository.findByName(userInfo.getName());
    // }
    public Optional<UserInfo> getUser(UserInfo userInfo) {
        return repository.findByNameAndPassword(userInfo.getName(), userInfo.getPassword());
    }

}
