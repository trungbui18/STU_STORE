package org.example.backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.config.jwt.JwtUtil;
import org.example.backend.model.DTO.*;
import org.example.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
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
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            LoginResponse loginResponse = authService.login(loginRequest);
            ResponseCookie cookie = ResponseCookie.from("refreshToken", loginResponse.getRefreshToken())
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<TokenResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        try {
            return ResponseEntity.ok(authService.refreshAccessToken(request));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

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
