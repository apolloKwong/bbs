package com.fiberhome.ms.bbs.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.QuestionDao;
import com.fiberhome.ms.bbs.entity.Question;
import com.fiberhome.ms.bbs.service.QuestionService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class QuestionServiceImpl extends BaseServiceImpl<Question> implements QuestionService {

	@Autowired
	private QuestionDao dao;

	protected QuestionDao getDao() {
		return dao;
	}
	
	////
	@Override
    public List<Question> getQuestionsByClassId(long classId){
      return dao.getQuestionsByClassId(classId);
    }

}
