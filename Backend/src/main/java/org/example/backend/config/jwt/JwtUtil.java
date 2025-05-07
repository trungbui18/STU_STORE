package org.example.backend.config.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
public class JwtUtil {

    private final SecretKey secretKey;

    @Value("${jwt.accessTokenExpiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refreshTokenExpiration}")
    private long refreshTokenExpiration;

    @Value("${jwt.issuer}")
    private String issuer;

    public JwtUtil(@Value("${jwt.secret}") String jwtSecret) {
        this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username, String roles) {
        try {
            Instant now = Instant.now();
            return Jwts.builder()
                    .issuer(issuer)
                    .subject(username)
                    .claim("role", roles)
                    .issuedAt(Date.from(now))
                    .expiration(Date.from(now.plusSeconds(accessTokenExpiration)))
                    .signWith(secretKey)
                    .compact();
        } catch (Exception e) {
            throw new JwtException("Invalid JWT", e);
        }
    }

    public String generateRefreshToken(String username,String roles) {
        try {
            Instant now = Instant.now();
            return Jwts.builder()
                    .issuer(issuer)
                    .subject(username)
                    .claim("role", roles)
                    .issuedAt(Date.from(now))
                    .expiration(Date.from(now.plusSeconds(refreshTokenExpiration)))
                    .signWith(secretKey)
                    .compact();
        } catch (Exception e) {
            throw new JwtException("Invalid JWT", e);
        }
    }


    public Map<String, Object> parseClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token has expired");
        } catch (JwtException e) {
            throw new RuntimeException("Invalid token");
        }
    }
}