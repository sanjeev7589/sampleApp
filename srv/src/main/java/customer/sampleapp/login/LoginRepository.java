package customer.sampleapp.login;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LoginRepository extends JpaRepository<Login,Long> {

    Optional<Login> findByName(String username);

    Login findByNameAndPassword(String name, String password);

}
