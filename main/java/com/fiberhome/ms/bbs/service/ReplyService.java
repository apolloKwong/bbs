/**
 * 
 */
package com.fiberhome.ms.bbs.service;

import java.util.List;

import com.fiberhome.ms.bbs.entity.Reply;
import com.fiberhome.smartms.BaseService;

/**
 * @author ftl
 *
 */
public interface ReplyService extends BaseService<Reply> {

	List<Reply> getReplyInfoByArticleId(long articleId);

	List<Reply> getReplyDetails(long articleId);

	
}
