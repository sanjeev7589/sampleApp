package customer.sampleapp.utils;

import java.io.InputStream;
import java.net.URI;
import java.util.Map;

import org.apache.olingo.client.api.ODataClient;
import org.apache.olingo.client.api.communication.ODataClientErrorException;
import org.apache.olingo.client.api.communication.request.retrieve.ODataRawRequest;
import org.apache.olingo.client.api.communication.request.retrieve.ODataValueRequest;
import org.apache.olingo.client.api.communication.response.ODataResponse;
import org.apache.olingo.client.api.uri.QueryOption;
import org.apache.olingo.client.core.ODataClientFactory;
import org.apache.olingo.client.core.http.BasicAuthHttpClientFactory;
import org.apache.olingo.commons.api.format.ContentType;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ODataServiceUtils {

     public static Map<String, Object> getODataReqByURL(String serviceUrl) throws Exception {
        ODataClient client = ODataClientFactory.getClient();
        if (!serviceUrl.isEmpty()) {
            try {
                URI entitySetURI = client.newURIBuilder(serviceUrl)
                        .addQueryOption(QueryOption.FORMAT, "json")
                        .build();
                // Create the request
                ODataRawRequest request = client.getRetrieveRequestFactory().getRawRequest(entitySetURI);
                request.addCustomHeader("Accept", "*/*");
                // Execute the request
                ODataResponse response = request.execute();
                InputStream inStream = response.getRawResponse();
                ObjectMapper mapper = new ObjectMapper();
                Map<String, Object> jsonMap = mapper.readValue(inStream, Map.class);

                return jsonMap;
            } catch (ODataClientErrorException ex) {
                System.out.println("Error: " + ex.getMessage());
                throw ex;
            } catch (Exception e) {
                e.printStackTrace();
                throw e;
            }

        }
        return null;
    }
}
