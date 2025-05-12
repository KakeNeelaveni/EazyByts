package com.chatapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF for simplicity
            .authorizeHttpRequests()
                .requestMatchers("/auth/**", "/chat.html", "/index.html", "/register.html", "/style.css", "/chat.css", "/api.js", "/login.js", "/register.js", "/chat.js").permitAll()
                .anyRequest().authenticated()
            .and()
            .formLogin().disable(); // Disable default login form

        return http.build();
    }
}
