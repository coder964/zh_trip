<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

// 引入useCityStore
import useCityStore from "@/stores/modules/city";

// 引入子组件
import CityTabControl from "./cpns/city-tab-control.vue"
import CityGroup from "./cpns/city-group.vue"

const router = useRouter();

// 监听取消按钮的点击
const cancelClick = () => {
	router.back();
};
// 控制文本框提示内容是否显示
const isShow = ref(true);

// 文本框状态
const inputValue = ref();

// input事件
const searchInput = (e) => {
	const value = e.target.value;
	console.log(value);
	if (value) {
		isShow.value = false;
		return;
	}
	isShow.value = true;
};
// 清除文本框内容
const clearClick = () => {
	inputValue.value = "";
	isShow.value = true;
};

// 调用action，发送网络请求
const cityStore = useCityStore();
cityStore.fetchAllCityData();
// 从Store中解构获取数据
const { allCity } = storeToRefs(cityStore);

// 保存当前活跃的tab
const tabActive = ref("cityGroup")

// 目的: 获取当前选中的标签的数据
// 1.获取正确的key: 从city-tab-control组件上v-model双向绑定的tabAction中获取
// 2.根据key从allCity获取数据, 默认直接获取的数据不是响应式的, 所以必须包裹computed
const currentGroup = computed(() => allCity.value[tabActive.value])

</script>

<template>
	<div class="city">
		<div class="top">
			<div class="search">
				<label for="input">
					<i class="iconfont icon-sousuo"></i>
					<span v-show="isShow">城市/区域/位置</span>
					<i class="iconfont icon-qingchu" v-show="inputValue" @click="clearClick"></i>
					<input id="input" type="text" v-model="inputValue" @input="searchInput" />
				</label>
			</div>
			<div class="cancel" @click="cancelClick">
				<span>取消</span>
			</div>
		</div>
		<city-tab-control :allCity="allCity" v-model="tabActive"/>
		<div class="content">
			<!-- 方案1： -->
			<!-- <city-group :group-data="currentGroup"/> -->
			<!-- 方案2： -->
			<template v-for="(value, key, index) in allCity">
				<city-group :group-data="value" v-show="tabActive == key"/>
			</template>
		</div>
	</div>
</template>

<style lang="less" scoped>
.top {
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 12px;

	.search {
		label {
			position: relative;

			.icon-sousuo {
				position: absolute;
				top: 1px;
				left: 13px;
				font-size: 14px;
				color: var(--primary-color);
			}

			.icon-qingchu {
				position: absolute;
				top: 1px;
				right: 13px;
				font-size: 16px;
				color: #c8c9cc;
			}

			span {
				position: absolute;
				top: 1px;
				left: 35px;
				font-size: 15px;
				color: #c8c9cc;
			}

			input {
				width: 315px;
				height: 34px;
				border-radius: 20px;
				padding: 0;
				background-color: #f7f8fa;
				text-indent: 11%;
				border: none;
				outline: none;
			}
		}
	}

	.cancel {
		margin-left: 1px;
		font-size: 14px;
	}
}

.content {
	height: calc(100vh - 102px);
	overflow-y: auto;
}
</style>
