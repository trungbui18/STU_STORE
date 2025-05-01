package org.example.backend.exception;

public class JwtException extends RuntimeException {
    public JwtException(String message, Throwable cause) {
        super(message, cause);
    }
}
