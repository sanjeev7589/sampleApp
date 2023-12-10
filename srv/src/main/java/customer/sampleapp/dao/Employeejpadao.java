
package customer.sampleapp.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import customer.sampleapp.entity.Employeejpa;

public interface Employeejpadao
        extends JpaRepository<Employeejpa, Long>, JpaSpecificationExecutor<Employeejpa> {
}
