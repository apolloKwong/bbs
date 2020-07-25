/**
 * 
 */
package com.fiberhome.ms.bbs.service;

import java.util.List;

import com.fiberhome.ms.bbs.entity.Collect;
import com.fiberhome.ms.bbs.entity.Upvote;
import com.fiberhome.smartms.BaseService;

/**
 * @author ftl
 *
 */
public interface CollectService extends BaseService<Collect> {

	void cancelCollect(long userId,long articleId);
	
	public long getId(long userId, long articleId);
	
	List<Collect> getByUserId(long userId);
}
