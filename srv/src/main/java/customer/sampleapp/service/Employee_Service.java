package customer.sampleapp.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import customer.sampleapp.dao.Employee_DAO;
import customer.sampleapp.dao.Employeejpadao;
import customer.sampleapp.entity.Employee;
import customer.sampleapp.entity.Employeejpa;

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
