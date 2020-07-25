/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.fiberhome.ms.bbs.entity.ArticleDetails;
import com.fiberhome.ms.bbs.entity.Collect;
import com.fiberhome.ms.bbs.entity.Reply;
import com.fiberhome.ms.bbs.entity.Upvote;
import com.fiberhome.ms.bbs.service.ArticleDetailsService;
import com.fiberhome.ms.bbs.service.CollectService;
import com.fiberhome.ms.bbs.service.ReplyService;
import com.fiberhome.ms.bbs.service.UpvoteService;
import com.fiberhome.smartms.BusinessAccessException;
import com.fiberhome.smartms.Pageable;
import com.fiberhome.smartms.annotation.ApiQueryParam;
import com.fiberhome.smartms.annotation.Compress;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.sql.Command;
import com.fiberhome.smartms.sql.Op;
import com.fiberhome.smartms.sql.QueryFilter;
import com.fiberhome.smartms.ui.BaseResource;
import com.google.inject.PrivateBinder;

import org.aspectj.weaver.AjAttribute.PrivilegedAttribute;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author ftl
 *
 */
@Path("bbs/articleDetails")
// @Resource(code = 20001, model = "Smart2", desc = "Article Resource")
public class ArticleDetailsResource extends BaseResource<ArticleDetails> {
	@Autowired
	private ArticleDetailsService service;

	protected ArticleDetailsService getService() {
		return service;
	}
	@Autowired
	private ReplyService replyService;
	
	@Autowired 
	private UpvoteService upvoteService;
	
	@Autowired
	private CollectService collectService;


	////
	@GET
	@Path(value = "/index")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index() {
		return null;
	}


	@GET
	@Path("/getDetails/list/{page}/{pageSize}")
//	@Operation(code = 3, desc = "read")
	@Compress
	@ApiQueryParam
	public Pageable<ArticleDetails> listPage(@PathParam("page") int page, @PathParam("pageSize") int pageSize)
			throws BusinessAccessException {
		Pageable<ArticleDetails> pageList = getService().getAll(this.getQueryFilter(), page, pageSize);
		if (null != pageList && pageList.getLength() > 0) {
			List<ArticleDetails> oldLst = (List<ArticleDetails>) pageList.getData();
			for (ArticleDetails ad : oldLst) {
				List<Reply> replies = replyService.getReplyDetails(ad.getId());
				if(null != replies && replies.size()>0){
					ad.setReplyComment(replies);
				}
		        QueryFilter query = new QueryFilter();
		        query.addCommand(new Command("articleId", Op.EQ, ad.getId()));
		        //点赞
				List<Upvote> upvotes = upvoteService.getAll(query);
				if(null != upvotes && upvotes.size()>0){
					ad.setUpvoteList(upvotes);
				}
				//收藏
				List<Collect> collect = collectService.getAll(query);
				if(null != collect && collect.size()>0){
					ad.setCollectList(collect);
				}
			}
		}
		return pageList;
	}

	@GET
	@Path("/getDetails/list")
//	@Operation(code = 3, desc = "read")
	@Compress
	@ApiQueryParam
	public List<ArticleDetails> list() throws BusinessAccessException {
		List<ArticleDetails> oldLst = getService().getAll(this.getQueryFilter());
		for (ArticleDetails ad : oldLst) {
			List<Reply> replies = replyService.getReplyDetails(ad.getId());
			if(null != replies && replies.size()>0){
				ad.setReplyComment(replies);
			}
	        QueryFilter query = new QueryFilter();
	        query.addCommand(new Command("articleId", Op.EQ, ad.getId()));
	        //点赞
			List<Upvote> upvotes = upvoteService.getAll(query);
			if(null != upvotes && upvotes.size()>0){
				ad.setUpvoteList(upvotes);
			}
			//收藏
			List<Collect> collect = collectService.getAll(query);
			if(null != collect && collect.size()>0){
				ad.setCollectList(collect);
			}
		}	
		return oldLst;
	}

}
