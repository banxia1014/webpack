<template>
	<div class="nationalComponents" style="height: 100%">
		<div class="phoneNational" style="height: 100%">
			<div class="phoneTop">
				<div class="phoneSearch">
					<img src="../../assets/images/16@2x.png" alt="" :class="{ ifText: numNow != '' }" />
					<input type="text" placeholder="搜索" @input="searchNum()" v-model="numNow" />
				</div>
			</div>
			<div class="phoneContent">
				<div
					class="countryAllList"
					v-for="(item, index) in countryLetterList"
					:ref="item.type"
					:key="item.type"
				>
					<div class="phoneStart">{{ item.type }}</div>
					<div
						class="nationalArea"
						v-for="(itemCountry, index2) in item.countryTypeList"
						@click="getNationalNum(itemCountry.phone)"
					>
						<div class="phoneOneDetail">
							<div class="phoneOne">{{ itemCountry.name }}</div>
							<div class="phoneNum">+{{ itemCountry.phone }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="belong">
				<div>#</div>
				<div
					v-for="(item, indexChoose) in firstList"
					:id="item"
					:ref="item"
					@click="handleLetterClick(item)"
					@touchstart="touchStart($event, item)"
					@touchmove="touchMove($event)"
					@touchend="touchEnd($event, item)"
				>
					{{ item }}
				</div>
			</div>
			<div class="showMove" v-if="showLetter">
				{{ letterText }}
			</div>
		</div>
	</div>
</template>

<script>
import { countryList } from '../../api/user.js'
export default {
	name: 'nationalChoose',
	data() {
		return {
			cities: [],
			firstListNow: [],
			firstList: [],
			countryAllList: [],
			countryLetterList: [],
			letters: [
				'#',
				'A',
				'B',
				'C',
				'D',
				'E',
				'F',
				'G',
				'H',
				'I',
				'J',
				'K',
				'L',
				'M',
				'N',
				'O',
				'P',
				'Q',
				'R',
				'S',
				'T',
				'U',
				'V',
				'W',
				'X',
				'Y',
				'Z',
			],
			viewId: '',
			startY: '',
			showLetter: false,
			letterText: '',
			numNow: '',
		}
	},
	methods: {
		searchNum() {
			let countryAllListNew = []
			for (let i = 0; i < this.countryAllList.length; i++) {
				if (
					-1 != this.countryAllList[i].country.indexOf(this.numNow) ||
					-1 != this.countryAllList[i].mobile_prefix.indexOf(this.numNow)
				) {
					countryAllListNew.push(this.countryAllList[i])
				}
			}
			console.info(countryAllListNew)
			this.getCountries(countryAllListNew)
		},
		initData() {
			countryList().then(res => {
				console.info(res)
				this.countryAllList = res.data
				this.getCountries(this.countryAllList)
			})
		},
		getCountries(countryAllList) {
			this.firstList = []
			this.firstListNow = []
			this.countryLetterList = []
			for (var i = 0; i < countryAllList.length; i++) {
				let firstText = countryAllList[i].char
				if (this.firstListNow.indexOf(firstText) == -1) {
					this.firstListNow.push(firstText)
				}
			}
			for (var j = 0; j < this.letters.length; j++) {
				for (var k = 0; k < this.firstListNow.length; k++) {
					if (this.letters[j] == this.firstListNow[k]) {
						this.firstList.push(this.letters[j])
					}
				}
			}
			for (var m = 0; m < this.firstList.length; m++) {
				let cityType = {
					type: '',
					countryTypeList: [],
				}
				for (var n = 0; n < countryAllList.length; n++) {
					if (countryAllList[n].char == this.firstList[m]) {
						let countryDetail = {
							name: '',
							phone: 0,
						}
						countryDetail.name = countryAllList[n].country
						countryDetail.phone = countryAllList[n].mobile_prefix
						cityType.type = countryAllList[n].char
						cityType.countryTypeList.push(countryDetail)
					}
				}
				this.countryLetterList.push(cityType)
			}
			console.info(this.countryLetterList)
			console.info(this.firstList)
		},
		/*点击事件*/
		handleLetterClick(key) {
			console.info(key)
			this.viewId = key
			this.letterText = this.viewId
			console.info(this.$refs[this.viewId])
			let elment = this.$refs[this.viewId][0]
			elment.scrollIntoView()
		},
		touchStart(e, key) {
			this.startY = e.touches[0].pageY
			this.showLetter = true
		},
		touchMove(e) {
			let touchLetter = e.currentTarget.id
			let pageY = e.touches[0].pageY

			let moveY = Math.round((pageY - this.startY) / 20)
			let startIndex = this.firstList.indexOf(touchLetter)
			console.info(pageY)
			console.info(moveY)
			console.info(startIndex)
			if (moveY > 0) {
				if (moveY + startIndex > this.firstList.length) {
					this.viewId = this.firstList[this.firstList.length - 1]
					this.letterText = this.viewId
					let elment = this.$refs[this.viewId][0]
					elment.scrollIntoView()
				} else {
					if (moveY + startIndex == 22) {
						this.viewId = this.firstList[this.firstList.length - 1]
					} else {
						this.viewId = this.firstList[moveY + startIndex]
					}
					this.letterText = this.viewId
					let elment = this.$refs[this.viewId][0]
					elment.scrollIntoView()
				}
			} else {
				if (moveY + startIndex < 0) {
					this.viewId = this.firstList[0]
					this.letterText = this.viewId
					let elment = this.$refs[this.viewId][0]
					elment.scrollIntoView()
				} else {
					this.viewId = this.firstList[moveY + startIndex]
					this.letterText = this.viewId
					let elment = this.$refs[this.viewId][0]
					elment.scrollIntoView()
				}
			}
		},
		touchEnd(e, key) {
			console.info('end')
			this.showLetter = false
			/*console.info(e)
          console.info(key)*/
		},
		getNationalNum(num) {
			console.info(num)
			this.$emit('nationalNum', num)
		},
	},
	mounted() {
		this.initData()
		/*this.scroll = new Bscroll(this.$refs.national,{
          click: true,
          scrollY: true,
          disableMouse:false
        })*/
	},
}
</script>

<style lang="scss">
/*body {
      background-color: #ff0000;
  }*/
.nationalComponents {
	background: #fff;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 999;
	.phoneNational {
		width: 100%;
		position: relative;
		background: rgba(255, 255, 255, 1);
		.phoneTop {
			width: 100%;
			height: 1.1rem;
			background: rgba(244, 245, 246, 1);
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			.phoneSearch {
				width: 90%;
				height: 0.7rem;
				border-radius: 0.1rem;
				display: flex;
				align-items: center;
				background: #fff;
				position: relative;
				text-align: center;
				margin: 0 auto;
				input {
					width: 100%;
					height: 0.7rem;
					text-align: center !important;
				}
				input::-ms-input-placeholder {
					text-align: center;
				}
				input::-webkit-input-placeholder {
					text-align: center;
				}
				img {
					width: 0.25rem;
					height: 0.25rem;
					position: absolute;
					left: calc(45% - 0.24rem);
					transition: left 1s;
					/*transform: translate(0, 48%);*/
					/*margin: 0 0 0 5rpx;*/
				}
				.ifText {
					left: 0.24rem;
				}
			}
		}
		.phoneContent {
			width: 100%;
			height: 100%;
			position: fixed;
			margin-top: 55px;
			overflow-y: auto;
			.phoneStart {
				width: 100%;
				height: 0.6rem;
				background: rgba(244, 245, 246, 1);
				padding: 0 0 0 0.1rem;
			}
			.nationalArea {
				width: 100%;
				height: 1.04rem;
				.phoneOneDetail {
					width: 90%;
					height: 100%;
					line-height: 1rem;
					margin: 0 auto 0 0.25rem;
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #e5e5e5;
					.phoneNum {
						color: #999999;
						padding-right: 0.5rem;
					}
				}
			}
		}
		.belong {
			position: absolute;
			width: 0.2rem;
			right: 0.2rem;
			top: 50%;
			transform: translate(0, -50%);
			font-size: 0.28rem;
		}
	}
	.showMove {
		position: absolute;
		width: 2.5rem;
		height: 2.5rem;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.6rem;
		background: rgba(180, 186, 189, 0.7);
		color: #ffffff;
		text-align: center;
		line-height: 2.5rem;
	}
}
</style>
