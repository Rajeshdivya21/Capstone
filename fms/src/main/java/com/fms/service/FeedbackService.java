package com.fms.service;

import java.util.concurrent.ExecutionException;

import com.fms.domain.AnswerRequestDTO;
import com.fms.domain.Answers;
import com.fms.domain.FeedbackType;
import com.fms.domain.Questions;
import com.fms.domain.QuestionsDTO;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FeedbackService {
	Flux<QuestionsDTO> getAllQuestions() throws InterruptedException, ExecutionException;
	
    Mono<Questions> saveQuestion(Questions question);
    
    Mono<Void> deleteQuestionById(Long id);
    

    Flux<Answers> getAnswersByQuestionId(Long id);
    
    Mono<QuestionsDTO> getQuestionByQuestionId(Long id) throws InterruptedException, ExecutionException;
    
    Mono<Void> deleteAnswerById(Long id);
   
    Flux<Answers> multiplesaveAnswers(Long questionId, AnswerRequestDTO answers) throws InterruptedException, ExecutionException;
    
    Flux<FeedbackType> getAllFeedbackTypes();
	
}
