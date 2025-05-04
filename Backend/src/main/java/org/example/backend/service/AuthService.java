package org.example.backend.service;

import org.example.backend.config.jwt.JwtUtil;
import org.example.backend.model.Account;
import org.example.backend.model.DTO.*;
import org.example.backend.model.Profile;
import org.example.backend.model.Role;
import org.example.backend.repository.AccountRepository;
import org.example.backend.repository.ProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@Service
public class AuthService {

    private AuthenticationManager authenticationManager;
    private AccountRepository accountRepository;
    private JwtUtil jwtUtil;
    private ProfileRepository profileRepository;
    private PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, AccountRepository accountRepository, JwtUtil jwtUtil, ProfileRepository profileRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.accountRepository = accountRepository;
        this.jwtUtil = jwtUtil;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Account account = accountRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Account not found"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), account.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        String role = account.getRole().toString();
        String accessToken=jwtUtil.generateToken(loginRequest.getEmail(), role);
        String refreshToken=jwtUtil.generateRefreshToken(loginRequest.getEmail(),role);
        int idUser=account.getProfile().getIdProfile();
        return new LoginResponse(accessToken, refreshToken,idUser,role);
    }

    public TokenResponse refreshAccessToken(String refreshToken) {
        try {
            Map<String, Object> claims = jwtUtil.parseClaims(refreshToken);
            String username = (String) claims.get("sub");
            String role = (String) claims.get("role");
            String newAccessToken = jwtUtil.generateToken(username, role);
            return new TokenResponse(newAccessToken);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired refresh token");
        }
    }

    public void Register(RegisterDTO registerDTO) {
        Account account = new Account();
        account.setEmail(registerDTO.getEmail());
        account.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        account.setRole(Role.USER);
        accountRepository.save(account);

        Profile customer = new Profile();
        customer.setName(registerDTO.getName());
        customer.setAddress(registerDTO.getAddress());
        customer.setNumberPhone(registerDTO.getNumberPhone());
        customer.setBirthday(registerDTO.getBirthday());
        customer.setAccount(account);
        profileRepository.save(customer);
    }


    public String hashWithSHA256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));

            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }


}
