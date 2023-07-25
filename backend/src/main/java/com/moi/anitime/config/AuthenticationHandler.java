package com.moi.anitime.config;

import com.moi.anitime.exception.auth.CAuthenticationEntryPointException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AuthenticationHandler implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws CAuthenticationEntryPointException {
        throw new CAuthenticationEntryPointException();
    }
}