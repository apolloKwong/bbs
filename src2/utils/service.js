import request from './request'
import _ from 'lodash'

const apiPrefix = "/services"

export default function rpc(model) {
	if(model.charAt(0) == '/'){
		model = model.substring(1);
	}
	var listeners = [], services = {
		create: `${apiPrefix}/${model}/{0}`,
		update: `${apiPrefix}/${model}/{0}`,
		get: `${apiPrefix}/${model}/{0}/{1}`,
		find: `${apiPrefix}/${model}/single/{0}`,
		remove: `${apiPrefix}/${model}/{0}/{1}`,
		list: `${apiPrefix}/${model}/list`,
		tree: `${apiPrefix}/${model}/tree`,
		listPage: `${apiPrefix}/${model}/list/{0}/{1}`,
		path: `${apiPrefix}/${model}/{0}`,
		process: `${apiPrefix}/${model}/process`,
		draft: `${apiPrefix}/${model}/draft`,
	};

	var method = function(method, url, data) {
		let options = {
			method,
			url,
			data,
		};
		//查询参数Q处理

        if(data && method === 'get'){
            let query = {},Q= [];
			if (undefined != data.Q) {
				Q.push(data.Q)
			}
            _.forIn(data,function(v,k){
                if(!_.startsWith(k,'Q_') || v === undefined){
                    query[k]=v;
					return;
				}
                Q.push(_.trimStart(k,'Q_') + '=' + v);
            });
            query.Q = Q;
            options.data= query
        }
		
		return request(options);
	}
	
	function start(data, url) {
		return this.method('post',url || services.process, data);
	}
	
	function approve(data, url) {
		return this.method('put', url || services.process, data);
	}
	
	function draft(data, url) {
		return this.method('post', url || services.draft, data);
	}

	function create(data, url) {
		if(_.isArray(data)){
			return this.method('post', url || services.create.format('batch'), data);
		}
		return this.method('post', url || services.create.format('single'), data);
	}
	function update(data, url) {
		if(_.isArray(data)){
			return this.method('put', url || services.update.format('batch'), data);
		}
		return this.method('put', url || services.update.format('single'), data);
	}
	function get(id, url) {
		if(_.isArray(id)){
			return this.method('get', url || services.get.format('batch',_.join(id)) );
		}
		return this.method('get',url || services.get.format('single',id));
	}

	function getByName(name,url){
		return this.method
	}
	 
	function find(id, url) {
		return this.method('get', url || services.find.format(id));
	}
	function remove(id, url) {
		if(_.isArray(id)){
			return this.method('delete', url || services.remove.format('batch',_.join(id)));
		}
		return this.method('delete', url || services.get.format('single',id));
	}
	function list(q, url) {
		return this.method('get',url || services.list, q);
	}
	
	function tree(q, url) {
		return this.method('get',url || services.tree, q);
	}
	
	function listPage(page, pageSize, q, url) {
		return this.method('get', url || services.listPage.format(page, pageSize), q);
	}
	
	function path(method,path,q) {
        return this.method(method, services.path.format(path), q);
    }
	
	return {
		method: method,
		start: start,
		approve: approve,
		draft: draft,
		create: create,
		update: update,
		get: get,
		find: find,
		remove: remove,
		list: list,
		tree: tree,
		listPage: listPage,
		path: path,
	};
}