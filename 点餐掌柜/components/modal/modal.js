Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { 
    show: {
      type: Boolean,
      value: false
    }
   },
  methods: {
    cancel(){
      this.setData({
        show:false
      });
      this.triggerEvent('modalclose');
    }
   }
})