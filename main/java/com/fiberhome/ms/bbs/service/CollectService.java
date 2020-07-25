/**
 * 
 */
package com.fiberhome.ms.bbs.service;

import com.fiberhome.ms.bbs.entity.Collect;
import com.fiberhome.smartms.BaseService;

/**
 * @author ftl
 *
 */
public interface CollectService extends BaseService<Collect> {

	void cancelCollect(long userId,long articleId);
	
	public long getId(long userId, long articleId);
	
}
