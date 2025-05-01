package org.example.backend.controller;

import org.example.backend.config.jwt.JwtUtil;
import org.example.backend.model.DTO.LoginAdminRequest;
import org.example.backend.model.DTO.LoginRequest;
import org.example.backend.model.DTO.LoginResponse;
import org.example.backend.model.DTO.RegisterDTO;
import org.example.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;

    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        String token=authService.login(loginRequest);
        return token;
    }

//    @PostMapping("/admin/login")
//    public ResponseEntity<?> loginAdmin(@RequestBody LoginAdminRequest loginAdminRequest) {
//        try {
////            LoginResponse loginResponse = authService.loginAdmin(loginAdminRequest);
//            return new ResponseEntity.ok();
//        } catch (RuntimeException e) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", e.getMessage());
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
        try {
            authService.Register(registerDTO);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Đăng ký thành công");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
