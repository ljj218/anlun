
import md5 from '../../util/md5.js';
import fetch from "../axios"
import vue from "vue"

// md5.hexMD5()

//获取banner
export const bannerList = (provId, module, come) => {
	return fetch.get("banner/getBannerList", {
		module: module || 36,
		provId: provId
	})
};
