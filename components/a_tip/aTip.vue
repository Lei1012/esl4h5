<template>
  <!-- 小程序顶部提示 -->
  <view>
    <view
      class="tip_box"
      :class="{ anScale: isAm }"
      v-if="showTip"
      :style="{ top: isCustom ? boxTop + 'px' : '0px' }"
    >
      <view class="arrow" :style="{ 'margin-right': arrowMargin + 'px', borderBottomColor: bgColor }"></view>
      <view
        class="container"
        :style="{
          'margin-right': cotainerMargin + 'px',
          backgroundColor: bgColor,
          borderRadius: borderR + 'px',
        }"
      >
        <!-- 提示文字 -->
        <view
          class="tips"
          :style="{ color: fontObj.color, fontSize: fontObj.fontSize, fontWeight: fontObj.fontWeight }"
          >{{ text }}</view
        >
        <view class="close" @tap="tipHidden">
          <image
            class="closeImg"
            v-if="closeColor"
            src="https://i.loli.net/2021/02/02/KezCMOxqposThtP.png"
          />
          <image
            v-else
            class="closeImg"
            src="https://i.loli.net/2021/02/02/mXNqJOrTEcobKd5.png"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showTip: false,
      boxTop: 0,
      arrowMargin: 0,
      cotainerMargin: 0,
      screenWidth: 0,
    };
  },
  props: {
    /* 是否是自定义头部 */
    isCustom: {
      type: Boolean,
      default: false,
    },
    /* 背景颜色 */
    bgColor: {
      type: String,
      default: "#00b3d2",
    },
    /* 提示文字 */
    text: {
      type: String,
      default: "添加到我的小程序",
    },
    /* 提示文字样式 */
    fontObj: {
      type: Object,
      default: function () {
        return {
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: "0",
        };
      },
    },
    /* 圆角大小  px*/
    borderR: {
      type: Number,
      default: 5,
    },
    /* 延时出现 */
    delay: {
      type: Number,
      default: 2000,
    },
    /* 关闭btn黑白两色 或者自行添加 */
    closeColor: {
      type: Boolean,
      default: true,
    },
    /* 动画效果 */
    isAm: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    tipHidden: function () {
      uni.setStorageSync("my_tips_2021", "true");
      this.showTip = false;
    },
    timeOut() {
      setTimeout(() => {
        this.showTip = true;
        setTimeout(() => {
          this.tipHidden();
        }, this.delay + 3000);
      }, this.delay);
    },
    init() {
      if (uni.getStorageSync("my_tips_2021")) return;
      let rect = uni.getMenuButtonBoundingClientRect();
      let screenWidth = uni.getSystemInfoSync().screenWidth;
      this.boxTop = rect.bottom;
      this.arrowMargin = rect.width * 0.75 + 4;
      this.cotainerMargin = screenWidth - rect.right;
      this.timeOut();
    },
  },
  onReady() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
@keyframes anScale {
  from {
    -webkit-transform: scale3d(0.96, 0.96, 0.96);
    transform: scale3d(0.96, 0.96, 0.96);
  }

  50% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  to {
    -webkit-transform: scale3d(0.96, 0.96, 0.96);
    transform: scale3d(0.96, 0.96, 0.96);
  }
}

.anScale {
  animation: anScale 1s linear infinite;
}
.tip_box {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  .arrow {
    width: 0;
    height: 0;
    border: 10rpx solid;
    border-color: transparent;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16rpx 24rpx;
    .tips {
      flex: 1;
      padding-right: 12rpx;
    }
    .close {
      height: 30rpx;
      width: 30rpx;
      .closeImg {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
