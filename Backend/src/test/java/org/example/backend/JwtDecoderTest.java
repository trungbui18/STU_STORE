package org.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import java.time.Instant;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class JwtDecoderTest {

    @Test
    void testDecodeValidToken() {
        String secretKey = "quenemtrongtungcondauhuhu29huhu04huhu!"; // base64 encoded nếu bạn dùng MAC
        JwtDecoder decoder = NimbusJwtDecoder.withSecretKey(
                new javax.crypto.spec.SecretKeySpec(secretKey.getBytes(), "HmacSHA256")
        ).build();

        String token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ5b3VyLWFwcCIsInN1YiI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjpbIlVTRVIiXSwiaWF0IjoxNzQ1OTQ1NDQ5LCJleHAiOjE3NDU5NDkwNDl9.UwlIWBa8SG9UVdNhD7BYF8ghB91Enm48aqWLhTpOwgU";

        Jwt jwt = decoder.decode(token);
        assertEquals("johndoe@example.com", jwt.getSubject());
    }
}
