<template>
	<view class="content ">
		<button class="_btn" type="default" @click="checkRequestPermissions">人脸识别</button>
		<button class="_btn" type="default" @tap="startSign">签到</button>
		<image :src="resultImg" v-show="resultImg" class="name"></image>
		<Signature ref="sig"></Signature>
	</view>
</template>

<script>
	import Signature from '@/components/sin-signature/sin-signature.vue'
	export default {
		components:{Signature},
		data() {
			return {
				lineWidth: 6,
				lineColor: '#000000',
				bgColor: '',
				resultImg: '',
				isCrop: true,//裁剪
				show: false,
				safeHeight: 0,
				safeWidth: 0,

			}
		},
		onLoad() {},
		methods: {
			async startSign() {
				let s = await this.$refs.sig.getSyncSignature();
				console.log('组件版本', this.$refs.sig.VERSION);
				console.log('签名数据', s);
				this.resultImg=s
			},
			showCanvas() {
				let res = uni.getSystemInfoSync();
				this.safeHeight = res.safeArea.height;
				this.safeWidth = res.safeArea.width;
				setTimeout(() => {
					this.show = true;
				}, 500)
			},

			//检查权限
			checkRequestPermissions() {
			  const PPFace = uni.requireNativePlugin('PP-BaiduFaceV2');
			  PPFace.checkRequestPermissions(res => {
			      //res.code //返回编码 200 为成功
				   this.initFace();
				  // console.log(res);
				 
				  
			  })
			},
			initFace() {
			    const PPFace = uni.requireNativePlugin('PP-BaiduFaceV2');
			    PPFace.init({
			      androidLicenseFileName: 'idl-license.face-android',
			      androidLicenseId: 'xxx-face-android', //*需要修改 android百度申请到的liceenseid
			      iosLicenseFileName: 'idl-license.face-ios',
			      iosLicenseId: 'xxx-face-ios', //*需要修改 ios百度申请到的liceenseid
			    }, res => {
					console.log(res);
			       //res.code //返回编码 200 为成功
				   if(res.code!=200){
					   uni.showToast({
					   	title:res.msg
					   })
				   }
				   this.faceliveness();
			    })
			},
			faceliveness() {
			    const PPFace = uni.requireNativePlugin('PP-BaiduFaceV2');
			    PPFace.faceliveness({
			      livenessList: ["Eye","Mouth","HeadUp","HeadDown","HeadLeft","HeadRight","HeadLeftOrRight"], //活体要求动作集合，可按需删减
			      isLivenessRandom: true, //是否开启动作随机 默认false
			      isEnableSound: false //是否开启语音播报 默认 true
			    }, res => {
			      //res.code //返回编码 200 为成功
			      //res.base64Image //全景图像 可以加前缀 data:image/jpg;base64, 进行预览
			      //res.base64ImageCrop //裁剪后图像（少量黑边，或者没有） 可以加前缀 data:image/jpg;base64, 进行预览
			    })
			},
			
		}
	}
</script>

<style lang='scss' scoped>
	.content{
		width: 100%;
		min-height:100vh ;
	}
	.temp {
		position: absolute;
		background-color: #fff;
		width: 100vw;
		height: 100vh;

		.btn-wrap {
			position: absolute;
			z-index: 2;
			bottom: 0;
			width: 100%;
			height: 60rpx;

			.btn {
				width: 120rpx;
				
			}
		}
	}
	.name{
		width: 200rpx;
		height: 60rpx;
		/* transform: rotate(-90deg); */
	}
	._btn {
		width: 80%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		margin-bottom: 30rpx;
	}


</style>
