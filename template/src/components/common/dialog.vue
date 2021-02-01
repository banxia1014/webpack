<template>
	<div class="dialog_container" v-show="showDialog">
		<div class="notice_layer">
			<div class="notice_bg" @click="closeNotice"></div>
			<div class="notice_content">
				<div class="notic-operate notic-operate1">
					<div class="tc notic-img"><img src="../../assets/images/sad_img.png" /></div>
					<div class="tc notic-txt">这是app专享内容啦！<br />你可以下载app，更多精彩内容任你挑！</div>
					<div class="notic-button">
						<span class="btn circle40" @click="closeNotice">知道了</span>
						<span class="go btn circle40 fr goBind">前去下载</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import store from '../../store'
import { loadMobJs, isQianfan, jumpOpenApp } from '../../utils/common.js'
export default {
	name: 'dialog_container',
	props: {},
	data() {
		return {}
	},
	props: {},
	components: {},
	computed: {
		...mapState({
			showDialog: state => state.showDialog,
		}),
	},
	mounted() {
		
	},
	methods: {
		closeNotice() {
			store.commit('updateDialog', false)
		},
	},
	watch: {
		showDialog(val, oldVal) {
			if (val == true) {
				this.$nextTick(() => {
					jumpOpenApp('goBind', -1)
				})
				// if (isQianfan()) {
				// 	window.QFH5ready = function () {
				// 		QFH5.jumpNewWebviewWithClose(this.$store.state.schemeUrl)
				// 	}
				// } else {
				// 	let url = window.location.href
				// 	if (this.$store.state.schemeUrl != '' && typeof this.$store.state.schemeUrl != 'undefined') {
				// 		url = this.$store.state.schemeUrl
				// 	}
				// 	loadMobJs(url, 'goBind')
				// }
			}
		},
	},
}
</script>
<style>
.circle40 {
	border-radius: 0.4rem;
	-webkit-border-radius: 0.4rem;
	-o-border-radius: 0.4rem;
	-moz-border-radius: 0.4rem;
	-ms-border-radius: 0.4rem;
}
.notice_layer {
	position: fixed;
	top: 0;
	left: auto;
	width: 100%;
	max-width: 750px;
	height: 100%;
	z-index: 100;
}
.notice_bg {
	background: rgba(0, 0, 0, 0.6);
	position: fixed;
	top: 0;
	left: auto;
	height: 100%;
	width: 100%;
	max-width: 750px;
}
.notice_content {
	width: 85.33%;
	background: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);
	-o-transform: translate(-50%, -50%);
	-moz-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	border-radius: 0.16rem;
	-webkit-border-radius: 0.16rem;
	-o-border-radius: 0.16rem;
	-moz-border-radius: 0.16rem;
	-ms-border-radius: 0.16rem;
}
.notic-operate {
	padding-left: 7.8%;
	padding-right: 7.8%;
	padding-top: 0.4rem;
	padding-bottom: 0.4rem;
}
.notic-img {
	font-size: 0px;
}
.notic-img img {
	display: inline-block;
	vertical-align: middle;
	width: 0.78rem;
	height: 0.78rem;
}
.notic-img1 img {
	width: 0.72rem;
	height: 0.78rem;
}
.notic-txt {
	color: #333333;
	font-size: 0.28rem;
	line-height: 0.4rem;
	margin-top: 0.32rem;
	margin-bottom: 0.32rem;
}
.notic-txt1 {
	font-size: 0.3rem;
}
.notic-button {
	font-size: 0px;
}
.notic-button .btn {
	color: #15bfff;
	font-size: 0.28rem;
	border: 0.02rem solid #15bfff;
	display: inline-block;
	vertical-align: middle;
	width: 44.5%;
	text-align: center;
	line-height: 0.72rem;
}
.notic-button .go {
	color: #fff;
	background-color: #15bfff;
	box-shadow: 0 0.05rem 0.1rem rgba(21, 191, 255, 0.3);
}
</style>
