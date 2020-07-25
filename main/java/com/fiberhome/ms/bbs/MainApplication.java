package com.fiberhome.ms.bbs;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;

import com.fiberhome.smartms.boot.SmartMsApp;

@EnableDiscoveryClient
@EnableFeignClients
@SpringBootApplication
//@EnableScheduling
public class MainApplication {
    public static void main(String[] args) {
        SmartMsApp.run(MainApplication.class, args);
    }
}
