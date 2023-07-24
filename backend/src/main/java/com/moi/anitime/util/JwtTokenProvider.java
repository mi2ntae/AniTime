package com.moi.anitime.util;

import com.moi.anitime.exception.auth.JwtTokenExpiredException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String secretKey;
    private Key key;
    @Value("${jwt.expiration}")
    private long tokenExpiration;

    @PostConstruct
    protected void init(){
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // 토큰 생성
    public String createToken(int memberNo, int memberKind){
        Claims claims = Jwts.claims().setSubject(String.valueOf(memberNo));
        claims.put("kind", memberKind);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(now.getTime() + tokenExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    //토큰 사용자 인증 추출
    public Authentication getAuthentication(String token){
        Claims claims = this.getTokenClaims(token).getBody();
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(new String[] {claims.get("kind").toString()})
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    //토큰 검증
    public boolean validateToken(String token) {
        try {
            Claims claims = this.getTokenClaims(token).getBody();
            if(claims == null) return false;
            return claims.getExpiration().after(new Date());
        }catch(Exception e) {
            log.info("옳바르지 않은 JWT 토큰입니다.");
            return false;
        }
    }

    private Jws<Claims> getTokenClaims(String token){
        try {
            System.out.println("validate");
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
        } catch (SecurityException e) {
            log.info("JWT 서명이 옳바르지 않습니다.");
        } catch (MalformedJwtException e) {
            log.info("JWT 토큰이 옳바르지 않습니다.");
        } catch (ExpiredJwtException e) {
            log.info("JWT 토큰이 만료되었습니다.");
            throw new JwtTokenExpiredException();
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰 압축이 옳바르지 않습니다.");
            e.printStackTrace();
        }
        return null;
    }
}
