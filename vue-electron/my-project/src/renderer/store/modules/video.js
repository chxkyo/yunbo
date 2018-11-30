const video = {
	state:{
		liveArrs:[
		{
			isAddVideo:false,
			url:'',
			title:''
		},
		{
			isAddVideo:false,
			url:'',
			title:''
		},
		{
			isAddVideo:false,
			url:'',
			title:''
		},
		{
			isAddVideo:false,
			url:'',
			title:''
		}
		],
		camera_list:[]
	},
	mutations:{
		SET_LIVE_ARRS: (state, liveArr) => {
	      state.liveArr = liveArr
	   },
	   SET_CAMERA_LIST:(state, list)=>{
	   	  state.camera_list = list;
	   }
	},
	actions:{
		OperateVideo({commit},liveArrs){
			return new Promise(resolve => {
		        commit('SET_LIVE_ARRS', liveArrs)
		        resolve()
		    })
		},
		setCameraList({commit},list){
			return new Promise(resolve => {
		        commit('SET_CAMERA_LIST', list)
		        resolve()
		    })
		}
	}
}
export default video;