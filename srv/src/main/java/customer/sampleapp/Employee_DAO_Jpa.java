package customer.sampleapp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
// import org.springframework.stereotype.Repository;
// @Repository
public interface Employee_DAO_Jpa  extends JpaRepository<Employee_Jpa, Long>, JpaSpecificationExecutor<Employee_Jpa>{
    
}
