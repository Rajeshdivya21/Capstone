package com.fms.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id
	@Column("username")
	private String username;
	@Column("password")
	private String password;
	@Column("firstname")
	private String firstname;
	@Column("lastname")
	private String lastname;
	
	@Column("role_type")
	private String role;


}
