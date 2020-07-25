package com.fiberhome.ms.bbs.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.ms.bbs.dao.PollOptionDao;
import com.fiberhome.ms.bbs.entity.PollOption;
import com.fiberhome.ms.bbs.entity.Question;
import com.fiberhome.ms.bbs.service.PollOptionService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class PollOptionServiceImpl extends BaseServiceImpl<PollOption> implements PollOptionService {

	@Autowired
	private PollOptionDao pollOptionDao;

	protected PollOptionDao getDao() {
		return pollOptionDao;
	}
	@Override
	  @Transactional(readOnly = false)
	  public void voteCountPlusOne(long id) {
	  pollOptionDao.voteCountPlusOne(id);
	  }
	@Override
    public List<PollOption> getPollOptionsByPollId(long pollId){
      return pollOptionDao.getPollOptionsByPollId(pollId);
    }
	////

}
