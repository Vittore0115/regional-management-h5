import api from '@/utils/http'


// 查询数据
export function getInfo(params: any) {
	return api(
		{
			url: "/getAreaList",
			method: "get",
			params,
		}
	)
}