package com.fms.service;

import java.util.concurrent.ExecutionException;

import com.fms.domain.User;
import com.fms.exception.UserNotFoundException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {
	public Mono<User> findByUserIdAndPassword(String userId,String password) throws UserNotFoundException, InterruptedException, ExecutionException;

	public Mono<User> findByUserName(String username) throws UserNotFoundException, InterruptedException, ExecutionException;
	
	public Flux<User> getPmoEmployees();
	
	public Mono<User> addPMO(String employeeId) throws InterruptedException, ExecutionException;
	
	public Mono<User> removePMO(String employeeId) throws InterruptedException, ExecutionException;


}
