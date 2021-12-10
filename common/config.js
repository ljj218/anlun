import vue from 'vue'
export const config = {
	// baseUrl: "https://m.51sdx.com/test-choice/", //公共URL
	baseUrl: "https://api.51sdx.com/niuzy/", //公共URL
	// baseUrl: "http://39.97.32.88:8989/test-choice/", //公共URLhttp://39.97.32.88:8989/
	salt: '25raHVwZ2xnemhsbW9jdHBkbGRkZ2dka2pkdG92aHB3ZGVoYHBoAAA',
	verify: 'sdxxqbrolkjwrgoiuyhasdglksjlaghnow32429asnnhg',
	saticPlant: 'zhangshangzhiyuansdx',
	appid: 'wxf9d68c74c9b41eb9',
	wxAPPID:'wxc244a09fd74139b9',
	badAppid: '19011275',
	CHAT_URL: 'wss://api.51sdx.com/niuzy/ws/16/',
	// CHAT_URL:'wss://m.51sdx.com/test-choice/ws/16/',//客服测试环境
	// imgUrl: 'https://m.51sdx.com/t/uniapp_img/',
	imgUrl: 'https://static.51sdx.com/images/uniapp_img/',	// CDN
	qqappid: '101942787',
	tenantId: 0, //租客id
	module: '16',
	wxappid: 'wx018689ad4772af5f', //微信小程序
	zszyAppUrl:'https://m.51sdx.com/t/',
	AppVersion:'1.0.0',
	subjectFirstLevel: [{
		id: 1,
		name: 'A+'
	}, {
		id: 2,
		name: 'A'
	}, {
		id: 3,
		name: 'B+'
	}, {
		id: 4,
		name: 'B'
	}, {
		id: 5,
		name: 'C'
	}, {
		id: 6,
		name: 'D'
	}],
	subjectSecond: [{
		id: 2,
		name: '化学'
	}, {
		id: 4,
		name: '政治'
	}, {
		id: 8,
		name: '地理'
	}, {
		id: 32,
		name: '生物'
	}],
	provScore: [{
			provinceId: 16,
			provinceName: "上海",
			maxScore: 660
		},
		 {
			provinceId: 21,
			provinceName: "海南",
			maxScore: 900
		},

	],
	//学校类型
	feature: [{
			name: '不限',
			id: 0
		},
		{
			name: '985',
			id: 1
		},
		{
			name: '211',
			id: 2
		},
		{
			name: '一流大学',
			id: 3
		},
		{
			name: '一流学科',
			id: 4
		},
		{
			name: '研究生院',
			id: 5
		},
		{
			name: '独立学院',
			id: 6
		},
	],
	//学
	zbType: [{
			name: '不限',
			id: ''
		},
		{
			name: '本科',
			id: 1
		},
		{
			name: '专科',
			id: 2
		},
	],
	//学校隶属
	departType: [{
			name: '不限',
			id: ''
		},
		{
			name: '教育部',
			id: 1
		},
		{
			name: '其他部委',
			id: 2
		},
		{
			name: '地方',
			id: 3
		},
		{
			name: '军校',
			id: 4
		},
	],
	//学校
	isPublic: [{
			name: '不限',
			id: ''
		},
		{
			name: '公办',
			id: 1
		},
		{
			name: '民办',
			id: 2
		},
	],
};
export let channel = () => {
	let channel = uni.getStorageSync('channel') || 'sdx';
	return channel;
};
export let comeFrom = () => {
	let comeFrom = uni.getStorageSync('comeFrom') || '';
	return comeFrom;
};
