package com.fms.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionsDTO {
	
	private Long questionId;
	
	private String questionName;
	
	private List<AnswersDTO> answers;
	private FeedbackType feedbackType;
	
	

}
