package com.fms.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table("questions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Questions {
	
	@Id
	@Column("q_id")
	private Long questionId;
	
	@Column("q_name")
	private String questionName;
	
	@Column("f_key")
	private Long feedbackId;

}
