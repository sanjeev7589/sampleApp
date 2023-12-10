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
import org.apache.olingo.commons.api.format.ContentType;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ODataServiceUtils {
    public static ODataResponse getOData(String url, String endPointMethod) throws Exception {
        if (!url.isEmpty()) {
            try {

                ODataClient client = ODataClientFactory.getClient();
                URI connURI = client.newURIBuilder(url).appendEntitySetSegment(endPointMethod).build();
                ODataRawRequest req = client.getRetrieveRequestFactory().getRawRequest(connURI);
                req.addCustomHeader("Accept", "*/*");
                req.setFormat("application/json");
                ODataResponse res = req.execute();
                return res;
            } catch (Exception ex) {
                return null;
                // throw new Exception(fetchError);
            }
        }
        return null;
    }

    public Long getCount(String serviceUrl, String entitySet) {
        ODataClient client = ODataClientFactory.getClient();
        try {

         

            URI entitySetURI = client.newURIBuilder(serviceUrl).appendEntitySetSegment(entitySet).count().build();
            // Create the request
            ODataValueRequest request = client.getRetrieveRequestFactory().getValueRequest(entitySetURI);
            request.addCustomHeader("Accept", "*/*");
            request.setFormat(ContentType.TEXT_PLAIN);
            return Long.valueOf(request.execute().getBody().asPrimitive().toString());
        } catch (ODataClientErrorException ex) {
            System.out.println("Error: " + ex.getMessage());
            throw ex;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public Map<String, Object> getODataReq(String serviceUrl, String entitySet) throws Exception {
        ODataClient client = ODataClientFactory.getClient();
        if (!serviceUrl.isEmpty()) {
            try {

               

                URI entitySetURI = client.newURIBuilder(serviceUrl).appendEntitySetSegment(entitySet)
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
