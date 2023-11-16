package customer.sampleapp.config;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.cloud.config.java.AbstractCloudConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.zaxxer.hikari.HikariDataSource;
@Configuration
@Profile("cloud")
public class CloudDatabaseConfig extends AbstractCloudConfig{
	String url = "jdbc:sap://da77a3f3-de43-484e-82a9-606d75db0b77.hana.trial-us10.hanacloud.ondemand.com:443?encrypt=true&validateCertificate=true&currentschema=SAMPLEAPP_HDI_DB_1";
	String user = "SAMPLEAPP_HDI_DB_1_C4NTGHOO2BAMIBRCNLKAYA861_RT";
	String password = "Je30TIr9Fdk8eluc2JVQA8mgSRlrQfTJ_JAmxgXscI8TB8aZLT8AJ3jbHKWhxRFeS0zEb_uztTRVhMZOylZ1Z3DGoqgIwTA-2z6Ezz_tOVVmJoIbObtY5QYMjtQ3vAkA";
    // @Bean
	// public DataSource dataSource(@Value("${han.url}")final String url,
	// 		@Value("${hana.user}")final String user,
	// 		@Value("${hana.password}")final String password) {

	// 	return DataSourceBuilder.create()
	// 			.type(HikariDataSource.class)
	// 			.driverClassName(com.sap.db.jdbc.Driver.class.getName())
	// 			.url(url)
	// 			.username(user)
	// 			.password(password)
	// 			.build();	
	// }
	public DataSource dataSource() {
		return DataSourceBuilder.create()
				.type(HikariDataSource.class)
				.driverClassName(com.sap.db.jdbc.Driver.class.getName())
				.url(url)
				.username(user)
				.password(password)
				.build();	
	}
}
// package customer.sampleapp.config;

// import java.sql.Connection;
// import java.sql.DriverManager;
// import java.sql.SQLException;

// import org.springframework.stereotype.Component;

// @Component
// public class CloudDatabaseConfig {
//     public static void main(String[] args) {
//         try {
//             // Load the SAP HANA JDBC driver class

//             // Define the connection parameters
//             String url = "jdbc:sap://da77a3f3-de43-484e-82a9-606d75db0b77.hana.trial-us10.hanacloud.ondemand.com:443?encrypt=true&validateCertificate=true&currentschema=SAMPLEAPP_HDI_DB_1";
//             String user = "SAMPLEAPP_HDI_DB_1_C4NTGHOO2BAMIBRCNLKAYA861_RT";
//             String password = "Je30TIr9Fdk8eluc2JVQA8mgSRlrQfTJ_JAmxgXscI8TB8aZLT8AJ3jbHKWhxRFeS0zEb_uztTRVhMZOylZ1Z3DGoqgIwTA-2z6Ezz_tOVVmJoIbObtY5QYMjtQ3vAkA";
//             Class.forName("com.sap.db.jdbc.Driver");
//             // Establish a connection to the SAP HANA database
//             Connection connection = DriverManager.getConnection(url, user, password);

//             // Use the connection for database operations
//             // ...

//             // Close the connection when done
//             connection.close();
//         } catch (ClassNotFoundException | SQLException e) {
//             e.printStackTrace();
//         }
//     }
// }
