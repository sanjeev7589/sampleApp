package customer.sampleapp.dao;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import customer.sampleapp.utils.ODataServiceUtils;

@Component
public class People_Api_DAO {
    @Autowired
    private static ODataServiceUtils oDataServiceUtils;

    public static Map<String, Object> getODataReqByURL(String serviceUrl) throws Exception {
        return ODataServiceUtils.getODataReqByURL(serviceUrl);
    }

}
