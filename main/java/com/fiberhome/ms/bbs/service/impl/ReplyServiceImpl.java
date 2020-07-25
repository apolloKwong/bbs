package com.fiberhome.ms.bbs.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.ReplyDao;
import com.fiberhome.ms.bbs.entity.Reply;
import com.fiberhome.ms.bbs.service.ReplyService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class ReplyServiceImpl extends BaseServiceImpl<Reply> implements ReplyService {

	@Autowired
	private ReplyDao dao;

	protected ReplyDao getDao() {
		return dao;
	}

	@Override
	public List<Reply> getReplyInfoByArticleId(long articleId) {
		return dao.getReplyInfoByArticleId(articleId);
	}

	@Override
	public List<Reply> getReplyDetails(long articleId) {
		// 先获取第一级评论
		List<Reply> comments = dao.getComment(articleId);
		// 获取子评论
		for (Reply comment : comments) {
			// 查找以该id为targetId的子评论
			List<Reply> replylist = getReplyItm(comment.getId());
			comment.setReplyComment(replylist);
		}
		return comments;
	}

	// 评论只分为两级
	public List<Reply> getReplyItm(long targetId) {
		// 先获取一级回复
		List<Reply> replies = dao.getReply(targetId);
		// 解决数组迭代 ConcurrentModificationException异常的方法（复制）
		List<Reply> copyReplies = new ArrayList<Reply>();
		copyReplies.addAll(replies);
		// 获取子回复
		if (null != replies && replies.size() > 0) {
			for (Reply comment : replies) {
				List<Reply> replylist = dao.getReply(comment.getId());
				if (null != replylist) {
					for (Reply ry : replylist) {
						copyReplies.add(ry);
						// 迭代调用，把子回复加到一级回复上
						List<Reply> replyItm = new ArrayList<Reply>();
						replyItm = getReplyItm(ry.getId());
						if (null != replyItm) {
							for (Reply Itm : replyItm) {
								copyReplies.add(Itm);
							}
						}
					}
				}
			}
		}
		// 按时间排序。第二个参数返回一个int型的值，就相当于一个标志，告诉sort方法按什么顺序来对list进行排序。
		Collections.sort(copyReplies, new Comparator<Reply>() {
			@Override
			public int compare(Reply o1, Reply o2) {
				try {
					Date dt1 = o1.getReplyDate();
					Date dt2 = o2.getReplyDate();
					if (dt1.getTime() > dt2.getTime()) {
						return 1;
					} else if (dt1.getTime() < dt2.getTime()) {
						return -1;
					} else {
						return 0;
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return 0;
			}

		});
		return copyReplies;
	}

	////

}
