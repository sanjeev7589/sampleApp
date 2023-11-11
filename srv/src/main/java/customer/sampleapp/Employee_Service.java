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
    private Employee_DAO_Jpa employee_DAO_Jpa;
    public Collection<Employee_Jpa> getAllEmployeesjpa(){
        return employee_DAO_Jpa.findAll();
    }
}
