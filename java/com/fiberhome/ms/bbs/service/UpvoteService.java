/**
 * 
 */
package com.fiberhome.ms.bbs.service;

import java.util.List;

import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.ms.bbs.entity.Upvote;
import com.fiberhome.smartms.BaseService;

/**
 * @author ftl
 *
 */
public interface UpvoteService extends BaseService<Upvote> {

	void cancelUpvote(long userId, long articleId);
	
	public long getId(long userId, long articleId);
	
	List<Upvote> getByUserId(long userId);

	
}
