package customer.sampleapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public  class Hello {

    @GetMapping("")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}
