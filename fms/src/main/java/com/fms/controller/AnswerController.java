package com.fms.controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import com.fms.domain.AnswerRequestDTO;
import com.fms.domain.Answers;
import com.fms.service.FeedbackServiceImpl;


@RestController
@CrossOrigin("*")
@RequestMapping("/answer")
public class AnswerController {
	
	
	
	@Autowired
	FeedbackServiceImpl feedbackServiceImpl;
	
	@PatchMapping("/saveall/{questionId}")
	public Flux<Answers> bulkSaveAnswers(@PathVariable Long questionId, @RequestBody AnswerRequestDTO answers) throws InterruptedException, ExecutionException{
		return feedbackServiceImpl.multiplesaveAnswers(questionId, answers);
	}
	
	@DeleteMapping("/{answerId}")
	public Mono<Void> deleteAnswer(@PathVariable Long answerId){
		return feedbackServiceImpl.deleteAnswerById(answerId);
	}
	
	@GetMapping("/{questionId}")
	public Flux<Answers> getAllAnswersById(@PathVariable Long questionId){
		return feedbackServiceImpl.getAnswersByQuestionId(questionId);
	}
	
}
