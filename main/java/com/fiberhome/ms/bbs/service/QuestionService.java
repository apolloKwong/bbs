/**
 * 
 */
package com.fiberhome.ms.bbs.service;

import java.util.List;

import com.fiberhome.ms.bbs.entity.Question;
import com.fiberhome.smartms.BaseService;

/**
 * @author ftl
 *
 */
public interface QuestionService extends BaseService<Question> {

  List<Question> getQuestionsByClassId(long classId);
}
