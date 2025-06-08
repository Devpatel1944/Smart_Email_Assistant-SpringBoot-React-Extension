package com.emailAssistant.Controller;

import com.emailAssistant.Entites.EmailRequest;
import com.emailAssistant.Service.EmailGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response =emailGeneratorService.generateEmailReplay(emailRequest);
        return ResponseEntity.ok(response);
    }
}
