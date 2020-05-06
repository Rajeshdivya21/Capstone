package com.fms.service;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fms.domain.User;
import com.fms.exception.UserNotFoundException;
import com.fms.repository.UserRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepo;
	

	@Override
	public Mono<User> findByUserIdAndPassword(String username, String password) throws UserNotFoundException, InterruptedException, ExecutionException {
		
		Mono<User> user=userRepo.findByUsernameAndPassword(username, password);
		if(user.toFuture().get() == null) {
			throw new UserNotFoundException("Oops! User doesnt exists");
		}
		return user;
	}


	@Override
	public Mono<User> findByUserName(String username)
			throws UserNotFoundException, InterruptedException, ExecutionException {
		Mono<User> user=userRepo.findByUsername(username);
		if(user.toFuture().get() == null) {
			throw new UserNotFoundException("Oops! Employee doesnt exists");
		}
		return user;
	}


	@Override
	public Flux<User> getPmoEmployees() {
		
		Flux<User> users=userRepo.findByRoletype("PMO");
		return users;
	}


	@Override
	public Mono<User> addPMO(String employeeId) throws InterruptedException, ExecutionException {
		User user=new User();
		user=userRepo.findByEmployee(employeeId).toFuture().get();
		System.out.println(user);
			user.setRole("PMO");
			return userRepo.save(user);
			
	}
	
	@Override
	public Mono<User> removePMO(String employeeId) throws InterruptedException, ExecutionException {
		User user=userRepo.findByEmployee(employeeId).toFuture().get();
			user.setRole("");
			return userRepo.save(user);
			
	}
}
