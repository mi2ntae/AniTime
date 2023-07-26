package com.moi.anitime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class AnitimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnitimeApplication.class, args);
	}

}
