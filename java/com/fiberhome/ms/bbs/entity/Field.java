package com.fiberhome.ms.bbs.entity;

import com.fiberhome.smartms.annotation.Lookup;
import com.fiberhome.smartms.model.LongIdVO;

public class Field extends LongIdVO {

	private static final long serialVersionUID = 6026503981967602054L;
	private String fieldName;
	private int hit;
	private String order;
	@Lookup(type="fieldState")
	private String fieldState;

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public int getHit() {
		return hit;
	}

	public void setHit(int hit) {
		this.hit = hit;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getFieldState() {
		return fieldState;
	}

	public void setFieldState(String fieldState) {
		this.fieldState = fieldState;
	}


}
