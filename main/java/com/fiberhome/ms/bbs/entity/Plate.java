package com.fiberhome.ms.bbs.entity;

import com.fiberhome.smartms.annotation.Lookup;
import com.fiberhome.smartms.model.LongIdVO;

public class Plate extends LongIdVO {

	private static final long serialVersionUID = 6026503981967602054L;
	private String plateName;
	private int hit;
	private String order;
	@Lookup(type="plateState")
	private String plateState;

	public String getPlateName() {
		return plateName;
	}

	public void setPlateName(String plateName) {
		this.plateName = plateName;
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

	public String getPlateState() {
		return plateState;
	}

	public void setPlateState(String plateState) {
		this.plateState = plateState;
	}


}
