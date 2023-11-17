package customer.sampleapp;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class Employee_Service {
     @Autowired
    private Employee_DAO EmployeeDAO;
    
    public Collection<Employee> getAllEmployees(){
        return EmployeeDAO.getAllEmployees();
    }
     @Autowired
    private Employeejpadao employeejpadao;
    public Collection<Employeejpa> getAllEmployeesjpa(){
        return employeejpadao.findAll();
    }
   
}
