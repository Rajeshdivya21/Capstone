package com.fms.repository;

import org.springframework.data.r2dbc.repository.query.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.fms.domain.User;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<User, String>{
	
	@Query("Select username,password,firstname,lastname,u.role_type from users u inner join roles r on u.role_type=r.role_type where u.username=? and u.password=?")
	Mono<User> findByUsernameAndPassword(String username,String password);
	
	@Query("Select username,password,firstname,lastname,u.role_type from users u inner join roles r on u.role_type=r.role_type where u.username=?")
	Mono<User> findByUsername(String username);
	
	@Query("Select username,password,firstname,lastname,u.role_type from users u inner join roles r on u.role_type=r.role_type where u.role_type=?")
	Flux<User> findByRoletype(String roletype);
	
	@Query("select * from users where username=?")
	Mono<User> findByEmployee(String Username);

}
