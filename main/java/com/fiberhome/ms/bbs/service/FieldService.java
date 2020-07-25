package com.fiberhome.ms.bbs.service;

import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.ms.bbs.entity.Field;
import com.fiberhome.smartms.BaseService;


@Transactional
public interface FieldService extends BaseService<Field> {

public	Field getByName(String fieldName);

}
