package com.fiberhome.ms.bbs.service;

import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.ms.bbs.entity.Plate;
import com.fiberhome.smartms.BaseService;


@Transactional
public interface PlateService extends BaseService<Plate> {

public	Plate getByName(String plateName);

}
