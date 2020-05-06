package com.fms.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fms.domain.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtSecurityTokenGeneratorImpl  implements SecurityTokenGenerator{

	@Override
	public Map<String, String> generateToken(User user) {
		String jwtToken = "";
		jwtToken = Jwts.builder().setSubject(user.getUsername()).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256,"secretKey").compact();
		Map<String, String> map = new HashMap<String, String>();
		map.put("token", jwtToken);
		map.put("roletype",user.getRole());
		map.put("username", user.getFirstname()+" "+user.getLastname());
		map.put("employeeId", user.getUsername());
		map.put("message", "User sucessfully logged in");
		return map;
	}

}
