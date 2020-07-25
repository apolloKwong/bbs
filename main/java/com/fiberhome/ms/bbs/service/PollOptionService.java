package com.fiberhome.ms.bbs.service;


import java.util.List;

import com.fiberhome.ms.bbs.entity.PollOption;
import com.fiberhome.ms.bbs.entity.Question;
import com.fiberhome.smartms.BaseService;


/**
 * @author ftl
 *
 */
public interface PollOptionService extends BaseService<PollOption> {
  List<PollOption> getPollOptionsByPollId(long pollId);
  void voteCountPlusOne(long id);
}
