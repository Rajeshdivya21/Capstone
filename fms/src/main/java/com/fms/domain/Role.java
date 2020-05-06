package com.fms.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.relational.core.mapping.Table;


@Table("roles")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role {
	
	private Long roleId;
	
	private String Role;
	
	private List<Users> usersList;

}
