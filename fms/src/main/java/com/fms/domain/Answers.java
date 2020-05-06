package com.fms.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table("answers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Answers {
	@Id
	@Column("id")
	private Long answerId;
	
	@Column("name")
	private String answerName;
	
	@Column("q_id")
	private Long questionId;


}
