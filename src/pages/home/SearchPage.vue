<template>
  <div class="Search">
    <div class="header">
      <dy-back mode="light" @click="router.back" class="mr1r"></dy-back>
      <Search placeholder="Search username" :isShowRightText="true" @notice="_no"></Search>
    </div>
    <div class="content">
      <div class="history">
        <div class="row" :key="index" v-for="(item, index) in lHistory">
          <div class="left">
            <img src="../../assets/img/icon/home/time-white.png" alt="" />
            <span> {{ item }}</span>
          </div>
          <dy-back
            img="close"
            mode="gray"
            @click="data.history.splice(index, 1)"
            scale=".7"
          ></dy-back>
        </div>
        <div v-if="data.history.length > 2" class="history-expand" @click="toggle">
          {{ data.isExpand ? 'Clear all search history: 'Show all}}
        </div>
      </div>
      <div class="guess">
        <div class="title">
          <div class="left">You might want to search</div>
          <div class="right" @click.stop="refresh">
            <img class="scan" src="../../assets/img/icon/home/refresh-gray.png" />
            <span>Refresh</span>
          </div>
        </div>
        <div class="keys">
          <div class="key" :key="index" v-for="(item, index) in data.randomGuess">
            <span class="desc">{{ item.name }}</span>
            <img
              v-if="item.type === 1"
              src="../../assets/img/icon/home/new.webp"
              alt=""
              class="type"
            />
          </div>
        </div>
      </div>
      <div class="rank-list">
        <div class="indicator">
          <div class="tab" :class="{ active: data.slideIndex === 0 }" @click="data.slideIndex = 0">
            Trending 
          </div>
          <div class="tab" :class="{ active: data.slideIndex === 1 }" @click="data.slideIndex = 1">
            Live
          </div>
          <div class="tab" :class="{ active: data.slideIndex === 2 }" @click="data.slideIndex = 2">
            Music 
          </div>
          <div class="tab" :class="{ active: data.slideIndex === 3 }" @click="data.slideIndex = 3">
            Brands
          </div>
        </div>
        <!--        TODO 滚动到下面的时候，应该禁止slide-move，因为每个slideitem的高度不一样，高的切到矮的，会闪屏-->
        <SlideHorizontal v-model:index="data.slideIndex" :style="slideListHeight">
          <SlideItem>
            <div class="slide0" ref="slide0">
              <div class="l-row">
                <div class="rank-wrapper">
                  <img src="../../assets/img/icon/home/to-top-yellow.png" class="rank" />
                </div>
                <div class="right">
                  <div class="center">
                    <div class="desc">Topic ：Funny Cat Moments</div>
                  </div>
                </div>
              </div>
              <div class="l-row" :key="index" v-for="(item, index) in data.hotRankList">
                <div class="rank-wrapper">
                  <img
                    v-if="index === 0"
                    src="../../assets/img/icon/home/hot1.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 1"
                    src="../../assets/img/icon/home/hot2.webp"
                    alt=""
                    class="rank"
                  />
                  <img
                    v-else-if="index === 2"
                    src="../../assets/img/icon/home/hot3.webp"
                    alt=""
                    class="rank"
                  />
                  <div v-else class="rank">{{ index + 1 }}</div>
                </div>
                <div class="right">
                  <div class="center">
                    <div class="desc">{{ item.name }}</div>
                    <img
                      v-if="item.type === 1"
                      src="../../assets/img/icon/home/new.webp"
                      alt=""
                      class="type"
                    />
                    <img
                      v-if="item.type === 0"
                      src="../../assets/img/icon/home/hot.webp"
                      alt=""
                      class="type"
                    />
                  </div>
                  <div class="count">999w</div>
                </div>
              </div>
              <div class="more" @click="_no">View Full Trending list></div>
            </div>
          </SlideItem>
          <SlideItem>
            <div class="slide1" ref="slide1">
              <div class="l-row" :key="index" v-for="(item, index) in data.liveRankList">
                <div class="rank-wrapper">
                  <div class="rank" :class="{ top: index < 3 }">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="right">
                  <div class="center">
                    <div class="avatar-wrapper">
                      <img src="../../assets/img/icon/avatar/1.png" alt="" class="avatar" />
                    </div>
                    <div class="desc">{{ item.name }}</div>
                    <div v-if="item.type === 0" class="live-type">
                      <img class="type1" src="../../assets/img/icon/home/pk.webp" />
                      <span>PK</span>
                    </div>
                    <div v-if="item.type === 1" class="live-type">
                      <img class="type2" src="../../assets/img/icon/home/redpack.png" />
                      <span>Gift</span>
                    </div>
                  </div>
                  <div class="count">9.99M Popularity</div>
                </div>
              </div>
              <div class="more" @click="_no">View full live ranking></div>
            </div>
          </SlideItem>
          <SlideItem>
            <div class="slide2" ref="slide2">
              <div
                class="l-row"
                :key="index"
                v-for="(item, index) in data.musicRankList"
                @click="nav('/home/music-rank-list')"
              >
                <div class="rank-wrapper">
                  <div class="rank" :class="{ top: index < 3 }">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="right">
                  <div class="center">
                    <div class="avatar-wrapper">
                      <img v-lazy="_checkImgUrl(item.cover)" alt="" class="avatar" />
                    </div>
                    <div class="desc">{{ item.name }}</div>
                  </div>
                  <div class="count">
                    <img src="../../assets/img/icon/home/hot-gray.png" alt="" />
                    <span>{{ _formatNumber(item.use_count) }}</span>
                  </div>
                </div>
              </div>
              <div class="more" @click="nav('/home/music-rank-list')">查看完整音乐榜 ></div>
            </div>
          </SlideItem>
          <SlideItem>
            <div class="slide3" ref="slide3">
              <div class="slide4-wrapper">
                <div class="brands">
                  <div
                    class="brand"
                    @click="toggleKey(key, i)"
                    :key="i"
                    :class="{ active: key === data.selectBrandKey }"
                    v-for="(key, i) in Object.keys(data.brandRankList)"
                  >
                    {{ key }}
                  </div>
                </div>
                <div class="l-row" :key="index" v-for="(item, index) in selectBrandList">
                  <div class="rank-wrapper">
                    <div class="rank" :class="{ top: index < 3 }">
                      {{ index + 1 }}
                    </div>
                  </div>
                  <div class="right">
                    <div class="center">
                      <div class="avatar-wrapper" :class="item.living ? 'living' : ''">
                        <div class="avatar-out-line"></div>
                        <img v-lazy="_checkImgUrl(item.logo)" alt="" class="avatar" />
                      </div>
                      <div class="desc">{{ item.name }}</div>
                    </div>
                    <div class="count">
                      <img src="../../assets/img/icon/home/hot-gray.png" alt="" />
                      <span>{{ _formatNumber(item.hot_count) }}</span>
                    </div>
                  </div>
                </div>
                <div class="more" @click="_no">View Full brand ranking></div>
              </div>

              <SlideHorizontal v-model:index="data.adIndex" :autoplay="true" indicator>
                <SlideItem>
                  <div class="ad">AD1</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD2</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD3</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD4</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD5</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD6</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD7</div>
                </SlideItem>
                <SlideItem>
                  <div class="ad">AD8</div>
                </SlideItem>
              </SlideHorizontal>
            </div>
          </SlideItem>
        </SlideHorizontal>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Search from '../../components/Search.vue'
import Dom from '../../utils/dom'
import { computed, nextTick, onMounted, reactive, watch } from 'vue'
import { _checkImgUrl, _formatNumber, _no, _showSimpleConfirmDialog, sampleSize } from '@/utils'
import { useRouter } from 'vue-router'
import { useNav } from '@/utils/hooks/useNav'

defineOptions({
  name: 'SearchPage'
})

const router = useRouter()
const nav = useNav()
const data = reactive({
  isExpand: false,
  adIndex: 0,
  history: [
    'Search history 1',
'Search history 2',
'Search history 3',
'Search history 4',
'Search history 5',
'Search history 6',
'Search history 7',
'Search history 8',
'Search history 9',
'Search history 10',
  ],
  guess: [
    { name: 'Diamond new song', type: -1 },
{ name: 'Yanga vs Simba', type: 0 },
{ name: 'Alikiba new album', type: 1 },
{ name: 'When you want new iPhone', type: -1 },
{ name: 'Samia new announcement', type: 0 },
{ name: 'Land Cruiser 2022', type: 1 },
{ name: 'Invisible person', type: -1 },
{ name: 'Azam late night news', type: 0 },
{ name: 'Nissan GT-R 2022', type: 1 },
{ name: 'Best universities in Tanzania', type: -1 },
{ name: 'Company holiday goes viral', type: 0 },
{ name: 'New tuition in Dar es Salaam', type: 1 },
{ name: 'Social life of modern girls', type: -1 },
{ name: 'Azam late night news', type: 0 },
    
  ],
  randomGuess: [],
  hotRankList: [
    { name: 'Biggest software in Tanzania is Android', type: -1 },
{ name: 'Where is my order now', type: -1 },
{ name: 'Diamond is the best manager, A15 is amazing', type: -1 },
{ name: 'Found why iOS is spying on us', type: -1 },
{ name: 'Rebase or merge?', type: -1 },
{ name: 'Going to Zanzibar, what to prepare', type: -1 },
{ name: 'Land Cruiser 01, fuel or hybrid?', type: 1 },
{ name: 'Why buy new phone?', type: -1 },
{ name: 'Pinduoduo vs Jumia, which is better', type: -1 },
{ name: 'Baidu input vs Sogou input', type: -1 },
{ name: 'About iOS app proxy', type: 0 },
{ name: 'iPad mini 6 arrived, change router?', type: -1 },
{ name: 'Any good cloud storage now?', type: -1 },
{ name: 'Bro, Mac battery is swollen', type: -1 },
{ name: 'Found great sync solution Resilio Sync', type: -1 },
{ name: 'Got flu, symptoms and what to do', type: 1 },
{
  name: 'Spilled water on MacBook Pro, urgent',
  type: 0
},
{ name: 'Which tendon board is good?', type: -1 },
{
  name: 'Learning finance basics, teach us',
  type: -1
},
{
  name: 'Anyone using Sidecar for long time',
  type: -1
}
  ],
  liveRankList: [
    { name: 'Diamond Platnumz Live', type: 0 },
{ name: 'Mange Kimambi Live', type: -1 },
{ name: 'Alikiba Live', type: -1 },
{ name: 'Zuchu Live', type: -1 },
{ name: 'Baba Levo', type: 1 },
{ name: 'Mwijaku Live (9237)', type: -1 },
{ name: 'Mwanaidi Shishi', type: -1 },
{ name: 'Caren Comedian', type: -1 },
{ name: 'Mwanaidi (Team)', type: 1 },
{ name: 'Kiki', type: -1 },
{ name: 'Simba SC Live', type: 0 },
{ name: 'Yanga SC 5pm Live', type: -1 },
{ name: 'Hui Zi Tanzania', type: -1 },
{ name: 'Mbeya Boy', type: -1 },
{ name: 'Tunda Man', type: -1 },
{ name: 'Gao Live TZ', type: -1 },
{ name: 'Mwalimu King', type: -1 },
{ name: 'Luo Live TZ', type: 1 },
{ name: 'Suhe Live', type: 0 },
{ name: 'Mdeni Brothers', type: -1 },
{ name: 'Mwalimu Lang', type: -1 },
{ name: 'Chen Live', type: -1 },
{ name: 'Yanghu Live', type: -1 },
{ name: 'imxiaoxin TZ', type: 0 },
{ name: 'Cai Cai', type: -1 },
{ name: 'Xuxu Live', type: -1 },
{ name: 'pigff TZ', type: -1 },
{ name: 'Ling Bei Live', type: -1 },
  ],
  musicRankList: [
    {{
  name: 'Komasava',
  mp3: 'http://im5.tongbu.com/rings/singerring',
  cover: new URL('../../assets/img/music-cover',
  author: 'Diamond Platnumz',
  duration: 99,
  use_count: 37441000,
  is_collect: false,
  is_play: false
},
{
  name: 'Love in Dar es Salaam',
  mp3: 'https://m3.8js.net:99/1916/50120416504',
  cover: new URL('../../assets/img/music-cover',
  author: 'Alikiba',
  duration: 60,
  use_count: 37441000,
  is_collect: false,
  is_play: false
},
{
  name: 'Snail - Pole Pole',
  mp3: 'http://im5.tongbu.com/rings/singerring',
  cover: new URL('../../assets/img/music-cover',
  author: 'Zuchu',
  duration: 60,
  use_count: 37441000,
  is_collect: false,
  is_play: false
},
  ],
  brandRankList: {
    汽车: [
  {
    name: 'Toyota',
    logo: 'https://www.wuling.com/favicon.',
    hot_count: 1395,
    living: false
  },
  {
    name: 'BMW',
    logo: 'https://www.bmw.com.cn/etc/clie',
    hot_count: 1395,
    living: true
  },
  {
    name: 'Nissan',
    logo: 'http://www.cargc.com/uploads/al',
    hot_count: 1395,
    living: false
  },
  {
    name: 'Audi',
    logo: 'https://www.audi.cn/bin/nemo.st',
    hot_count: 1395,
    living: false
  ]
  selectBrandKey: '汽车',
  selectBrandKeyIndex: 0,
  slideIndex: 0,
  timer: null,
  slideItemHeight: null
})

const lHistory = computed(() => {
  if (data.isExpand) {
    if (data.history.length > 10) return data.history.slice(0, 10)
    return data.history
  } else {
    if (data.history.length > 2) return data.history.slice(0, 2)
    return data.history
  }
})

const selectBrandList = computed(() => {
  return data.brandRankList[data.selectBrandKey]
})

const brandListKeys = computed<string[]>(() => {
  return Object.keys(data.brandRankList)
})

const slideListHeight = computed(() => {
  return {
    height: data.slideItemHeight ? data.slideItemHeight + 'px' : '100%'
  }
})

watch(
  () => data.slideIndex,
  (newVal) => {
    nextTick(() => {
      // console.log(data.$refs[`slide${newVal}`])
      data.slideItemHeight = new Dom(`.slide${newVal}`).css('height')
      // console.log(data.slideItemHeight)
      data.slideItemHeight = parseFloat(data.slideItemHeight) + 50
    })
    if (newVal === 3) {
      data.timer = setInterval(() => {
        if (data.selectBrandKeyIndex === brandListKeys.value.length - 1) {
          data.selectBrandKeyIndex = 0
        } else {
          data.selectBrandKeyIndex++
        }
        data.selectBrandKey = brandListKeys.value[data.selectBrandKeyIndex]
      }, 3000)
    } else {
      clearInterval(data.timer)
    }
  },
  { immediate: true }
)

onMounted(() => {
  data.history = data.history.reverse()
  refresh()
})

function toggleKey(key: string, i: number) {
  data.selectBrandKey = key
  data.selectBrandKeyIndex = i
  clearInterval(data.timer)
}

function refresh() {
  data.randomGuess = sampleSize(data.guess, 6)
}

function toggle() {
  if (data.isExpand) {
    _showSimpleConfirmDialog(
      '是否清空历史记录？',
      () => {
        data.history = []
      },
      null,
      '确定',
      '取消'
    )
  } else {
    data.isExpand = true
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.Search {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14rem;

  .type {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16rem;
    width: 16rem;
    font-size: 12rem;
    margin-left: 5rem;
    border-radius: 2rem;

    &.hot {
      background: var(--primary-btn-color);
    }

    &.new {
      background: rgb(186, 51, 226);
    }
  }

  .header {
    z-index: 4;
    background: var(--main-bg);
    height: 60rem;
    font-size: 14rem;
    padding: 0 var(--page-padding);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line-color);
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    top: 0;

    .search-ctn {
      flex: 1;
    }

    .scan {
      transform: scale(2);
      height: 10rem;
      width: 10rem;
    }
  }

  .content {
    padding-top: 60rem;

    .history {
      .row {
        min-height: 40rem;
      }

      .history-expand {
        text-align: center;
        padding: 10rem;
        color: var(--second-text-color);
      }
    }

    .guess {
      padding: 0 var(--page-padding);

      .title {
        font-size: 14rem;
        padding: 10rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--second-text-color);

        .right {
          display: flex;
          align-items: center;

          img {
            margin-right: 5rem;
            width: 13rem;
            height: 13rem;
          }
        }
      }

      .keys {
        font-size: 16rem;
        display: flex;
        flex-wrap: wrap;

        .key {
          box-sizing: border-box;
          padding: 8rem 0;
          width: 49%;
          display: flex;
          align-items: center;

          .desc {
            max-width: 80%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }

    .rank-list {
      .indicator {
        padding: 15rem;
        display: flex;
        align-items: center;
        font-size: 14rem;

        .tab {
          color: var(--second-text-color);
          margin-right: 20rem;

          &.active {
            transform: scale(1.2);
            color: white;
          }

          &:nth-child(1) {
            &.active {
              font-weight: bold;
              background: linear-gradient(to right, rgb(255, 165, 71), rgb(218, 77, 115));
              -webkit-background-clip: text;
              color: transparent;
            }
          }
        }
      }

      .slide0 {
        box-sizing: border-box;
        margin: 0 var(--page-padding) 50rem var(--page-padding);
        background: linear-gradient(to right, rgb(32, 29, 36), rgb(50, 29, 38));
        padding: var(--page-padding);
        border-radius: 10rem;

        .l-row {
          font-size: 14rem;
          display: flex;
          margin-bottom: 16rem;
          align-items: center;
          color: var(--second-text-color);

          .rank-wrapper {
            display: flex;
            align-items: center;

            .rank {
              width: 18rem;
              height: 18rem;
              line-height: 18rem;
              text-align: center;
              margin-right: 15rem;
            }
          }

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 0;

            .center {
              width: calc(100% - 140rem);
              box-sizing: border-box;
              //padding: 0 1rem;
              //flex: 1;
              display: flex;
              align-items: center;
              font-size: 14rem;
              color: white;

              .desc {
                max-width: 85%;
                font-size: 14rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }

            .count {
              font-size: 12rem;
            }
          }
        }
      }

      .slide1 {
        box-sizing: border-box;
        margin: 0 var(--page-padding) 50rem var(--page-padding);
        background: rgb(20, 22, 34);
        border: 1px solid rgba(31, 34, 52, 0.5);
        padding: var(--page-padding);
        border-radius: 10rem;

        .l-row {
          font-size: 14rem;
          display: flex;
          margin-bottom: 10rem;
          align-items: center;
          color: var(--second-text-color);

          &:active {
            opacity: 0.5;
          }

          .rank-wrapper {
            display: flex;
            align-items: center;

            .rank {
              width: 18rem;
              height: 18rem;
              line-height: 18rem;
              text-align: center;
              margin-right: 15rem;

              &.top {
                color: yellow;
              }
            }
          }

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .center {
              width: calc(100% - 160rem);
              box-sizing: border-box;
              //padding: 0 1rem;
              //flex: 1;
              display: flex;
              align-items: center;
              font-size: 14rem;
              color: white;

              .avatar-wrapper {
                @width: 35rem;
                margin-right: 10rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: @width;
                height: @width;
                border-radius: 50%;
                background: var(--primary-btn-color);

                .avatar {
                  width: @width - 0.3;
                  border-radius: 50%;
                  padding: 1rem;
                  background: black;
                }
              }

              .desc {
                max-width: 55%;
                font-size: 14rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .live-type {
                height: 22rem;
                padding: 0 5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                font-size: 10rem;
                color: var(--second-text-color);
                margin-left: 5rem;
                border-radius: 2rem;
                background: var(--second-btn-color-tran);

                .type2 {
                  margin-right: 2rem;
                  width: 10rem;
                  height: 10rem;
                }

                .type1 {
                  margin-right: 2rem;
                  width: 15rem;
                  height: 10rem;
                }
              }
            }

            .count {
              font-size: 12rem;
            }
          }
        }
      }

      .slide2 {
        box-sizing: border-box;
        margin: 0 var(--page-padding) 50rem var(--page-padding);
        background: rgb(20, 22, 34);
        border: 1px solid rgba(31, 34, 52, 0.5);
        padding: var(--page-padding);
        border-radius: 10rem;

        .l-row {
          font-size: 14rem;
          display: flex;
          margin-bottom: 10rem;
          align-items: center;
          color: var(--second-text-color);

          &:active {
            opacity: 0.5;
          }

          .rank-wrapper {
            display: flex;
            align-items: center;

            .rank {
              width: 18rem;
              height: 18rem;
              line-height: 18rem;
              text-align: center;
              margin-right: 15rem;

              &.top {
                color: yellow;
              }
            }
          }

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .center {
              width: calc(100% - 150rem);
              box-sizing: border-box;
              //padding: 0 1rem;
              //flex: 1;
              display: flex;
              align-items: center;
              font-size: 14rem;
              color: white;

              .avatar-wrapper {
                margin-right: 10rem;

                .avatar {
                  width: 30rem;
                  height: 30rem;
                  border-radius: 2rem;
                }
              }

              .desc {
                max-width: 95%;
                font-size: 14rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }

            .count {
              display: flex;
              align-items: center;
              font-size: 12rem;

              img {
                margin-right: 2rem;
                width: 15rem;
                height: 15rem;
              }
            }
          }
        }
      }

      .slide3 {
        box-sizing: border-box;
        margin: 0 var(--page-padding) 50rem var(--page-padding);
        border-radius: 10rem;

        .slide4-wrapper {
          padding: 5rem var(--page-padding);

          .brands {
            color: var(--second-text-color);
            font-size: 12rem;
            margin-bottom: 15rem;
            display: flex;

            .brand {
              border-radius: 2rem;
              margin-right: 10rem;
              padding: 5rem 10rem;
              background: var(--second-btn-color-tran);

              &.active {
                color: white;
                background: var(--second-btn-color);
              }
            }
          }

          .l-row {
            font-size: 14rem;
            display: flex;
            margin-bottom: 10rem;
            align-items: center;
            color: var(--second-text-color);

            &:active {
              opacity: 0.5;
            }

            .rank-wrapper {
              display: flex;
              align-items: center;

              .rank {
                width: 18rem;
                height: 18rem;
                line-height: 18rem;
                text-align: center;
                margin-right: 15rem;

                &.top {
                  color: yellow;
                }
              }
            }

            .right {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .center {
                width: calc(100% - 150rem);
                box-sizing: border-box;
                //padding: 0 1rem;
                //flex: 1;
                display: flex;
                align-items: center;
                font-size: 14rem;
                color: white;

                .avatar-wrapper {
                  @width: 35rem;
                  margin-right: 10rem;

                  &.living {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: @width;
                    height: @width;
                    border-radius: 50%;
                    background: var(--primary-btn-color);

                    .avatar-out-line {
                      width: @width;
                      height: @width;
                      position: absolute;
                      background: transparent;
                      border-radius: 50%;
                      border: 2rem solid var(--primary-btn-color);
                      animation: avatar-out-line 1s infinite;

                      @keyframes avatar-out-line {
                        from {
                          padding: 0;
                        }
                        to {
                          opacity: 0;
                          padding: 2rem;
                        }
                      }
                    }

                    .avatar {
                      padding: 1rem;
                      animation: avatar 1s infinite alternate;
                    }
                  }

                  .avatar {
                    position: relative;
                    z-index: 2;
                    width: @width - 0.3;
                    height: @width - 0.3;
                    border-radius: 50%;
                    background: black;
                    box-sizing: border-box;

                    @keyframes avatar {
                      from {
                        padding: 1rem;
                      }
                      to {
                        padding: 2rem;
                      }
                    }
                  }
                }

                .desc {
                  max-width: 95%;
                  font-size: 14rem;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }

              .count {
                display: flex;
                align-items: center;
                font-size: 12rem;

                img {
                  margin-right: 2rem;
                  width: 15rem;
                  height: 15rem;
                }
              }
            }
          }
        }

        .ad {
          background: var(--second-btn-color-tran);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100rem;
        }
      }

      .more {
        margin-bottom: 20rem;
        font-size: 12rem;
        padding: 10rem 10rem 0 10rem;
        text-align: center;
        color: yellow;
      }
    }
  }
}
</style>
