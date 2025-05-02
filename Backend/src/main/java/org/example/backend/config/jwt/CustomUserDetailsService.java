package org.example.backend.config.jwt;


import org.example.backend.model.Account;
import org.example.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account accountEntity = accountRepository.findByEmail(email).orElseThrow(()->new RuntimeException("ko tim thay"));
        return User.builder()
                .username(accountEntity.getProfile().getName())
                .password(accountEntity.getPassword())
                .roles("ROLE_" + accountEntity.getRole().toString())
                .build();
    }
}
