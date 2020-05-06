package com.fms.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table("feedback")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackType {
	
	@Id
	@Column("f_key")
	private Long feedbackId;
	
	@Column("f_type")
	private String feedbackType;

	
}
