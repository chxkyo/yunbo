// pages/mallactivity/questionnaire/questionnaire.js
Page({
  data: {
    items: [
      { name: 'USA', value: '问卷选择A' },
      { name: 'CHN', value: '问卷选择B', checked: 'true' },
    ]
  },
  onLoad: function (options) {

  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})