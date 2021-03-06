package com.fms.controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import com.fms.domain.Questions;
import com.fms.domain.QuestionsDTO;
import com.fms.service.FeedbackServiceImpl;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {
	@Autowired
	FeedbackServiceImpl feedbackServiceImpl;
	
	
	@GetMapping()
	public ResponseEntity<Flux<QuestionsDTO>> getAllQuestions() throws InterruptedException, ExecutionException{
		Flux<QuestionsDTO> flux=feedbackServiceImpl.getAllQuestions();
		return new ResponseEntity<>(flux,HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Mono<Questions>> saveQuestion(@RequestBody Questions question){
		return new ResponseEntity<>(feedbackServiceImpl.saveQuestion(question), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public Mono<Void> deleteQuestion(@PathVariable Long id){
		return feedbackServiceImpl.deleteQuestionById(id);
	}
	
	@GetMapping("/{id}")
	public Mono<QuestionsDTO> getQuestionByQuestionId(@PathVariable Long id) throws InterruptedException, ExecutionException{
		return feedbackServiceImpl.getQuestionByQuestionId(id);
	}

}
