<template>
  <div id="header" class="header">
    <el-row>
      <el-col :span="8" class="input-area">
        <el-row>
          <el-col :span="16">
            <el-input
              class="input"
              type="text"
              placeholder="30文字以下"
              v-model="dictTitle"
              :disabled="isVisibleQuiz"
              clearable
            />
          </el-col>
          <el-col :span="8">
            <template v-if="!isInputLimit">
              <el-button
                @click="createDict(dictTitle)"
                :disabled="isVisibleQuiz"
                type="success"
                plain
                ><i class="el-icon-magic-stick" /> 新規作成</el-button
              >
            </template>
            <template v-else>
              <el-alert
                class="alert"
                title="文字数上限です"
                type="error"
                center
                :closable="false"
                show-icon
              >
              </el-alert>
            </template>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <svg
          ref="imgRef"
          id="svg"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 645.12 345.6"
          width="200"
          height="100"
        >
          <defs>
            <path
              d="M32.67 43.2L100.8 43.2L100.8 286.01L32.67 286.01L32.67 43.2Z"
              id="e127CfT3C"
            ></path>
            <clipPath id="clipe1TDP3aLz">
              <use xlink:href="#e127CfT3C" opacity="1"></use>
            </clipPath>
            <path
              d="M93.22 82.15L136.02 82.15L136.02 288.8L93.22 288.8L93.22 82.15Z"
              id="a8qdiQTxQ"
            ></path>
            <clipPath id="clipa5RWA7pxIh">
              <use xlink:href="#a8qdiQTxQ" opacity="1"></use>
            </clipPath>
            <path
              d="M264.94 269.56L227 289.38L131.32 106.22L169.25 86.4L264.94 269.56Z"
              id="c4fLjpCaSJ"
            ></path>
            <clipPath id="clipe1G3n5kjh">
              <use xlink:href="#c4fLjpCaSJ" opacity="1"></use>
            </clipPath>
            <path d="" id="ec4loD17G"></path>
            <path d="M252.51 286.5L12.51 286.5" id="eXcKh78f"></path>
            <text
              id="bKcg0qSi5"
              x="610.31"
              y="88.55"
              font-size="136"
              font-family="Montserrat Alternates"
              font-weight="normal"
              font-style="normal"
              letter-spacing="0"
              alignment-baseline="before-edge"
              transform="matrix(1 0 0 1 -287.75459459459444 65.48729729729726)"
              style="line-height: 100%"
              xml:space="preserve"
              dominant-baseline="text-before-edge"
            >
              <tspan
                x="610.31"
                dy="0em"
                alignment-baseline="before-edge"
                dominant-baseline="text-before-edge"
                text-anchor="middle"
              >
                B
              </tspan>
            </text>
            <text
              id="e1mAGgv65d"
              x="541.33"
              y="64.09"
              font-size="140"
              font-family="Montserrat Alternates"
              font-weight="400"
              font-style="normal"
              letter-spacing="0"
              alignment-baseline="before-edge"
              transform="matrix(1 0 0 1 -265.03081081081075 -42.487837837837915)"
              style="line-height: 100%"
              xml:space="preserve"
              dominant-baseline="text-before-edge"
            >
              <tspan
                x="541.33"
                dy="0em"
                alignment-baseline="before-edge"
                dominant-baseline="text-before-edge"
                text-anchor="middle"
              >
                V
              </tspan>
            </text>
            <path
              d="M161.28 116.67L161.28 116.67L157.07 116.67L161.28 116.67Z"
              id="e3GBHNypZP"
            ></path>
            <path
              d="M48.47 50.14L93.8 50.14L93.8 275.41L48.47 275.41L48.47 50.14Z"
              id="b1beBiXW2A"
            ></path>
            <path
              d="M105.24 89.87L130.89 89.87L130.89 274.44L105.24 274.44L105.24 89.87Z"
              id="aarvWvY2A"
            ></path>
            <path
              d="M141.12 105.73L168.08 91.5L256.4 258.79L229.44 273.02L141.12 105.73Z"
              id="a1Rk8VXfRQ"
            ></path>
            <text
              id="a80QiVznq"
              x="487.47"
              y="64.09"
              font-size="140"
              font-family="Montserrat Alternates"
              font-weight="400"
              font-style="normal"
              letter-spacing="0"
              alignment-baseline="before-edge"
              transform="matrix(1 0 0 1 11.904493392154507 -39.015945945946044)"
              style="line-height: 100%"
              xml:space="preserve"
              dominant-baseline="text-before-edge"
            >
              <tspan
                x="487.47"
                dy="0em"
                alignment-baseline="before-edge"
                dominant-baseline="text-before-edge"
                text-anchor="middle"
              >
                ca
              </tspan>
            </text>
            <text
              id="arqxjNq83"
              x="542.64"
              y="32.84"
              font-size="139"
              font-family="Montserrat Alternates"
              font-weight="400"
              font-style="normal"
              letter-spacing="0"
              alignment-baseline="before-edge"
              transform="matrix(0.9978801059658186 0.06507913734559742 -0.06507913734559742 0.9978801059658186 -165.64603582976662 -40.7067843070932)"
              style="line-height: 100%"
              xml:space="preserve"
              dominant-baseline="text-before-edge"
            >
              <tspan
                x="542.64"
                dy="0em"
                alignment-baseline="before-edge"
                dominant-baseline="text-before-edge"
                text-anchor="middle"
              >
                o
              </tspan>
            </text>
            <text
              id="eW20Y606r"
              x="616.68"
              y="88.55"
              font-size="136"
              font-family="Montserrat Alternates"
              font-weight="normal"
              font-style="normal"
              letter-spacing="0"
              alignment-baseline="before-edge"
              transform="matrix(1 0 0 1 -115.40972972972952 62.65270270270247)"
              style="line-height: 100%"
              xml:space="preserve"
              dominant-baseline="text-before-edge"
            >
              <tspan
                x="616.68"
                dy="0em"
                alignment-baseline="before-edge"
                dominant-baseline="text-before-edge"
                text-anchor="middle"
              >
                o
              </tspan>
            </text>
            <text
              id="e13hVvQahB"
              x="615.52"
              y="88.55"
              font-size="136"
              font-family="Montserrat Alternates"
              font-weight="normal"
              font-style="normal"
              letter-spacing="0"
              alignment-baseline="before-edge"
              transform="matrix(1 0 0 1 -201.16486486486474 62.6527027027025)"
              style="line-height: 100%"
              xml:space="preserve"
              dominant-baseline="text-before-edge"
            >
              <tspan
                x="615.52"
                dy="0em"
                alignment-baseline="before-edge"
                dominant-baseline="text-before-edge"
                text-anchor="middle"
              >
                o
              </tspan>
            </text>
            <text
              id="aB1YhAx1B"
              x="614.37"
              y="88.55"
              font-size="136"
              font-family="Montserrat Alternates"
              font-weight="normal"
              font-style="normal"
              letter-spacing="0"
              alignment-baseline="before-edge"
              transform="matrix(1 0 0 1 -29.725135135134934 61.75540540540524)"
              style="line-height: 100%"
              xml:space="preserve"
              dominant-baseline="text-before-edge"
            >
              <tspan
                x="614.37"
                dy="0em"
                alignment-baseline="before-edge"
                dominant-baseline="text-before-edge"
                text-anchor="middle"
              >
                k
              </tspan>
            </text>
          </defs>
          <g>
            <g>
              <g>
                <use
                  xlink:href="#e127CfT3C"
                  opacity="1"
                  fill="#8ad88c"
                  fill-opacity="0"
                ></use>
                <g clip-path="url(#clipe1TDP3aLz)">
                  <use
                    xlink:href="#e127CfT3C"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#000000"
                    stroke-width="16"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g>
                <use
                  xlink:href="#a8qdiQTxQ"
                  opacity="1"
                  fill="#bcb0ae"
                  fill-opacity="0"
                ></use>
                <g clip-path="url(#clipa5RWA7pxIh)">
                  <use
                    xlink:href="#a8qdiQTxQ"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#000000"
                    stroke-width="16"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g>
                <use
                  xlink:href="#c4fLjpCaSJ"
                  opacity="1"
                  fill="#bcb0ae"
                  fill-opacity="0"
                ></use>
                <g clip-path="url(#clipe1G3n5kjh)">
                  <use
                    xlink:href="#c4fLjpCaSJ"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#000000"
                    stroke-width="16"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g>
                <g>
                  <use
                    xlink:href="#ec4loD17G"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#0c0c0c"
                    stroke-width="5"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g>
                <g>
                  <use
                    xlink:href="#eXcKh78f"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#0c0c0c"
                    stroke-width="8"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g id="bDdYBlzx8">
                <use
                  xlink:href="#bKcg0qSi5"
                  opacity="1"
                  fill="#000000"
                  fill-opacity="1"
                ></use>
                <g>
                  <use
                    xlink:href="#bKcg0qSi5"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#0c0c0c"
                    stroke-width="1"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g id="b3CZRjeQms">
                <use
                  xlink:href="#e1mAGgv65d"
                  opacity="1"
                  fill="#000000"
                  fill-opacity="1"
                ></use>
                <g>
                  <use
                    xlink:href="#e1mAGgv65d"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#0c0c0c"
                    stroke-width="1"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g>
                <use
                  xlink:href="#e3GBHNypZP"
                  opacity="1"
                  fill="#8ad88c"
                  fill-opacity="1"
                ></use>
              </g>
              <g>
                <use
                  xlink:href="#b1beBiXW2A"
                  opacity="1"
                  fill="#8ad88b"
                  fill-opacity="0.98"
                ></use>
              </g>
              <g>
                <use
                  xlink:href="#aarvWvY2A"
                  opacity="1"
                  fill="#9e0e60"
                  fill-opacity="0.98"
                ></use>
              </g>
              <g>
                <use
                  xlink:href="#a1Rk8VXfRQ"
                  opacity="1"
                  fill="#bcb0ae"
                  fill-opacity="1"
                ></use>
              </g>
              <g id="cwc6X0k4j">
                <use
                  xlink:href="#a80QiVznq"
                  opacity="1"
                  fill="#000000"
                  fill-opacity="1"
                ></use>
                <g>
                  <use
                    xlink:href="#a80QiVznq"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#0c0c0c"
                    stroke-width="1"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g id="e1Ba3VoVJo">
                <use
                  xlink:href="#arqxjNq83"
                  opacity="1"
                  fill="#8ad88c"
                  fill-opacity="1"
                ></use>
                <g>
                  <use
                    xlink:href="#arqxjNq83"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#0c0c0c"
                    stroke-width="0"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g id="c1aY2Yb4At">
                <use
                  xlink:href="#eW20Y606r"
                  opacity="1"
                  fill="#bcb0ae"
                  fill-opacity="1"
                ></use>
                <g>
                  <use
                    xlink:href="#eW20Y606r"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#0c0c0c"
                    stroke-width="0"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g id="a2pVy2DtWg">
                <use
                  xlink:href="#e13hVvQahB"
                  opacity="1"
                  fill="#9e0e60"
                  fill-opacity="1"
                ></use>
                <g>
                  <use
                    xlink:href="#e13hVvQahB"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#0c0c0c"
                    stroke-width="1152"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
              <g id="j3ulC7zo7b">
                <use
                  xlink:href="#aB1YhAx1B"
                  opacity="1"
                  fill="#000000"
                  fill-opacity="1"
                ></use>
                <g>
                  <use
                    xlink:href="#aB1YhAx1B"
                    opacity="1"
                    fill-opacity="0"
                    stroke="#0c0c0c"
                    stroke-width="1"
                    stroke-opacity="1"
                  ></use>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </el-col>
      <el-col :span="8" class="user-area">
        <el-dropdown>
          <span class="user-auth">
            <i class="el-icon-user-solid" />{{ displayName
            }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item size="mini" @click="logout"
                >ログアウト</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import Firebase from "../plugins/firebase";

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
    },
  },
  emits: ["createDict"],
  setup(props, context) {
    const displayName = ref(localStorage.getItem("jwt"));
    const dictTitle = ref<string>("");
    const isVisibleQuiz = computed(() => props.isVisible);
    const isEmpty = ref<boolean>(false);
    const isInputLimit = ref<boolean>(false);

    watch(dictTitle, () => {
      dictTitle.value = dictTitle.value.replace(/\s+/g, "");
      if (dictTitle.value.length > 30) {
        isInputLimit.value = true;
        return;
      }
      isInputLimit.value = false;
    });

    function createDict(title: string) {
      if (title === "") {
        return;
      }
      context.emit("createDict", title);
      dictTitle.value = "";
    }

    async function logout() {
      try {
        await Firebase.logout();
      } catch (err) {
        console.error(err);
      }
    }

    return {
      displayName,
      isEmpty,
      logout,
      dictTitle,
      createDict,
      isVisibleQuiz,
      isInputLimit,
    };
  },
});
</script>
<style lang="postcss" scoped>
#header {
  margin: 0 10px 0 10px;
  height: 20%;
  border-bottom: solid 1px #9e0e60;
  position: relative;
  width: 99%;
}
.header::before {
  content: "";
  display: block;
  border-bottom: 1px solid #8ad88c;
  width: 33%;
  position: absolute;
  left: 0;
  bottom: -1px;
}
.header::after {
  content: "";
  display: block;
  border-bottom: 1px solid #bcb0ae;
  width: 33%;
  position: absolute;
  right: 0;
}
.icon {
  text-align: center;
}
.input-area {
  margin-top: auto;
  margin-bottom: auto;
}
.user-area {
  margin-top: auto;
  margin-bottom: auto;
  text-align: right;
}
.user-auth {
  font-size: 20px;
  margin-right: 30px;
}
</style>