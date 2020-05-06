package com.fms.service;

import java.util.Map;

import com.fms.domain.User;

public interface SecurityTokenGenerator {
	
	Map<String,String> generateToken(User user);

}
