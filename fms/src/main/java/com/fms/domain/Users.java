package com.fms.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.relational.core.mapping.Table;

@Table("users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
	
	private Long userId;
	
	private String userName;
	private String firstName;
	
	private String LastName;
	private String emailAddress;
	
	private String password;

}
