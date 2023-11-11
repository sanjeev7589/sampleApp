package customer.sampleapp;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Component
@Repository
@Transactional
public class Employee_DAO {
    @PersistenceContext
    private EntityManager entityManager;

    public Collection<Employee> getAllEmployees() {
        try {
 List<Employee> results = new ArrayList<Employee>();
            if (entityManager != null) {
                // Use the entityManager here...
                  StoredProcedureQuery spEmployees = entityManager
                    .createStoredProcedureQuery("get_All_Employees", "employee");
            spEmployees.execute();
            @SuppressWarnings("unchecked")
            List<Employee> tempResults = spEmployees.getResultList();
            results.addAll(tempResults);
            } 
            // else {
            //     // Log or handle the case when entityManager is null...
                
            // }

           return results;
        } catch (Exception exception) {
            throw exception;
        }
    }
}
