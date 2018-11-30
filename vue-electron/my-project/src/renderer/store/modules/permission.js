import { constantRouterMap,Map } from '@/router'
import { getCameraList} from '@/api/userCamera'
const { body } = document
function generateAsyncRouter(routerMap, serverRouterMap) {
  serverRouterMap.forEach(function (item, index) {
  	if(item.component){
  		item.component = routerMap[item.component]
  	}
    if(item.children && item.children.length > 0){
      generateAsyncRouter(routerMap, item.children)
    }
  })
  return serverRouterMap;
}
function isMobile(WIDTH,RATIO) {
  const rect = body.getBoundingClientRect()
  return rect.width - RATIO < WIDTH
}
let device = isMobile(900,3)?'mobile':'desktop';
let RouterMap;
	RouterMap = [
	  {
	    path: '/',
	    component: 'Layout',
	    redirect: '/userManager/userList',
	    hidden: true,
	    meta:{
	    	roles:["admin"]
	    }
	  },
		{
	    path: '/userManager',
	    component: 'Layout',
	    redirect:'/userManager/userList',
	    name: 'userManager',
	    alwaysShow: true,
	    meta: { title: '用户管理', icon: 'user',roles:["admin"],device:['desktop'] },
	    children: [
	      {
	        path: 'userList',
	        name: 'userList',
	        component: 'userList',
	        meta: { title: '用户列表', icon: '',roles:["admin"],device:['desktop']},
	      }
	    ]
	  },
	  	{
	    path: '/cameraManager',
	    component: 'Layout',
	    redirect:'/cameraManager/cameraList',
	    name: 'cameraManager',
	    alwaysShow: true,
	    meta: { title: '摄像管理', icon: 'camera',roles:["admin"],device:['desktop']},
	    children: [
	      {
	        path: 'cameraList',
	        name: 'cameraList',
	        component: 'cameraList',
	        meta: { title: '摄像列表', icon: '',roles:["admin"],device:['desktop']}
	      },{
	      	path: 'cameraAuthority',
	        name: 'cameraAuthority',
	        component: 'cameraAuthority',
	        meta: { title: '摄像权限', icon: '',roles:["admin"],device:['desktop']},
	      }
	    ]
	  },
	   	{
	    path: '/venderManager',
	    component: 'Layout',
	    redirect:'/venderManager/venderList',
	    name: 'venderManager',
	    alwaysShow: true,
	    meta: { title: '厂家管理', icon: 'vender',roles:["admin"] ,device:['desktop']},
	    children: [
	      {
	        path: 'venderList',
	        name: 'venderList',
	        component: 'venderList',
	        meta: { title: '厂家列表', icon: '',roles:["admin"] ,device:['desktop']},
	      }
	    ]
	  }
	]


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes RouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles,device) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit,dispatch}, data) {
      return new Promise((resolve,reject) => {
        const { roles } = data
        let accessedRouters
        if(roles.includes("user")){
        	getCameraList().then(res=>{
			        	let camerList = [];
			        	dispatch("setCameraList",res.data.user_cameras_list);
			        	res.data.user_cameras_list.forEach(function(val,index){
			        		let obj = {
			      				path:'',
			      				meta: { title: val.title, icon: 'add',isOperate:true ,settingPosition:undefined,roles:["user"],serial_number:val.serial_number,flv:val.flv,hls:val.hls,alwaysShow:true}
			        		}
			        		camerList.push(obj);
			        	})
			        let myDevice =   	{
					  		path: '/myDevice',
						    component:'Layout',
						    redirect:'/myDevice/monitorConsole',
						    name: 'myDevice',
						    alwaysShow: true,
						    meta: { title: '我的设备', icon: 'device',roles:["user"]},
						    children: [
						      {
						        path: 'monitorConsole',
						        name: 'monitorConsole',
						        component: 'monitorConsole',
						        meta: { title: '我的监控台', icon: '',roles:["user"]}
						      },{
						      	path: 'monitorConsole2',
						      	alwaysShow: true,
						        meta: { title: '添加对应设备', icon: '',roles:["user"],clickShow:true},
						        component: 'monitorConsole',
						        children:camerList
						      }
						    ]
							};
							let myReplay =   	{
					  		path: '/myReplay',
						    component:'Layout',
						    meta:{roles:["user"]},
						    children: [
						      {
						        path: 'index',
						        name: 'myReplay',
						        component: 'myReplay',
						        meta: { title: '我的回放', icon: 'replay',roles:["user"]}
						      }
						    ]
							};
							if(roles.length === 1 &&  roles.includes('user') || device === 'mobile'){
								RouterMap = [{path: '/',component: 'Layout',redirect: '/myDevice/monitorConsole',hidden: true,meta:{roles:["user","admin"]}},myDevice,{path: '*', redirect: '/404', hidden: true}];
							}else if(roles.includes('admin')){
								RouterMap.push(...[myDevice,myReplay,{path: '*', redirect: '/404', hidden: true}]);
							}else{
								RouterMap = [{path: '*', redirect: '/404', hidden: true}];
							}
							RouterMap = generateAsyncRouter(Map,RouterMap)
		        	accessedRouters = filterAsyncRouter(RouterMap,roles);
			        commit('SET_ROUTERS', accessedRouters)
			        resolve()
		        }).catch(error=>{
		        	reject(error)
		        })
        }else{
        		RouterMap.push({ path: '*', redirect: '/404', hidden: true });
	        	accessedRouters = filterAsyncRouter(RouterMap, roles,state.app.device);
		        commit('SET_ROUTERS', accessedRouters)
		        resolve()
        }
      })
    }
  }
}

export default permission
