let nodeSchedule = require('node-schedule')
let Weather = require('../controller/weather')

//每小时的30分钟执行
let rule = new nodeSchedule.RecurrenceRule()
rule.minute = 30

let schedule = {}

schedule.start = () => {
	//开始任务的时候先更新一次
	Weather.query()
	//注册定时任务
	schedule.job = nodeSchedule.scheduleJob(rule, () => {
		Weather.query()
	})
}

schedule.start()