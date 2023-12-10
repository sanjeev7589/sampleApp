package customer.sampleapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.constraints.Email;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import customer.sampleapp.dao.People_Api_DAO;
import customer.sampleapp.entity.PeopleEmail;
import customer.sampleapp.entity.People_Api;
import customer.sampleapp.utils.AppConstants;

@Service
public class People_Api_Service {
    @Autowired
    private static People_Api_DAO people_Api_DAO;

    public List<People_Api> getPeople() throws Exception {
        Map<String, Object> jsonObj = People_Api_DAO.getODataReqByURL(
                AppConstants.People_name_space);
        try {
            JSONObject jsonObject = new JSONObject(jsonObj);
            JSONArray valueArray = (JSONArray) jsonObject.get("value");
            List<People_Api> peopleCollection = new ArrayList<People_Api>();
            for (Object obj : valueArray) {
                People_Api people_Api = new People_Api();
                JSONObject eachObj = (JSONObject) obj;
                people_Api
                        .setUserName(eachObj.isNull("UserName") ? ""
                                : eachObj.getString("UserName"));
                people_Api.setFirstName(eachObj.isNull("FirstName") ? ""
                        : eachObj.getString("FirstName"));
                people_Api.setLastName(eachObj.isNull("LastName") ? ""
                        : eachObj.getString("LastName"));

                JSONArray EmailArray = eachObj.getJSONArray("Emails");
                List<PeopleEmail> peopleEmail = new ArrayList<PeopleEmail>();
                for (Object email_Obj : EmailArray) {
                    PeopleEmail people_Api_Email = new PeopleEmail();
                    String eachEmailObj = (String) email_Obj;
                    people_Api_Email.setEmail(eachEmailObj);
                    peopleEmail.add(people_Api_Email);
                }
                people_Api.setPeople_Email(peopleEmail);
                peopleCollection.add(people_Api);
            }
            return peopleCollection;

        } catch (JSONException err) {
            throw err;
        }
    }
}
