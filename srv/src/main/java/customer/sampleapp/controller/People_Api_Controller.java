package customer.sampleapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import customer.sampleapp.entity.People_Api;
import customer.sampleapp.service.People_Api_Service;

@RestController
@RequestMapping(value = "/People")
public class People_Api_Controller {
    @Autowired People_Api_Service people_Api_Service;
    @RequestMapping(value = "")
    public ResponseEntity<?> getPeople()
            throws Throwable {
        try {
            List<People_Api> res = people_Api_Service.getPeople();
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception ex) {
            throw ex;
        }
    }
}
