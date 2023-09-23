<script type="text/ecmascript-6">
import AppleItem from "./components/apple-item.vue";
import applePic from '../../assets/apple.png'

const currentWeight = Math.ceil(Math.random() * 1000);
const appleIndex = 0;
const list = [];
const initAppleParam = { currentWeight, appleIndex };
list.push(initAppleParam);

export default {
  components: {
    AppleItem
  },
  data() {
    return {
      applePic,
      list,
      currentWeight,
      currentNumber: 1,
      hasEatNumber: 0,
      hasEatWeight: 0
    };
  },
  computed: {},
  created (){
    window.self1 = this
    console.log("dom mounted")
  },
  methods: {
    getTotalWeight() {
      return this.list.reduce((total, item) => total + item.currentWeight, 0);
    },
    getTotalNumber() {
      return this.list.length;
    },
    addApples() {
      const { appleIndex } = this.list[this.list.length - 1] || {
        appleIndex: 0
      };
      const newApplieIndex = appleIndex + 1;
      const appleParam = {
        currentWeight: Math.ceil(Math.random() * 1000),
        appleIndex: newApplieIndex
      };
      this.list.push(appleParam);
      this.currentWeight = this.getTotalWeight();
      this.currentNumber = this.getTotalNumber();
    },
    changeWeight(appleIndex) {
      this.list.forEach(item => {
        if (item.appleIndex === appleIndex) {
          item.currentWeight = Math.ceil(Math.random() * 1000);
        }
      });
      this.currentWeight = this.getTotalWeight();
      return this.list;
    },
    eatApple(apple) {
      const targetAppleWeight = apple.currentWeight;
      this.list = this.list.filter(
        item => item.appleIndex !== apple.appleIndex
      );
      this.currentWeight = this.getTotalWeight();
      this.currentNumber = this.getTotalNumber();
      this.hasEatNumber = this.hasEatNumber + 1;
      this.hasEatWeight = this.hasEatWeight + targetAppleWeight;
    }
  }
};
</script>

<template>
  <div id="app">
    <div class="appleBasket">
      <div class="title">苹果篮子(vue)</div>
      <div class="stats">
        <div class="section">
          <div class="head">当前</div>
          <div class="content">{{ currentNumber }}个苹果, {{ currentWeight }}克</div>
        </div>
        <div class="section">
          <div class="head">已吃掉</div>
          <div class="content">{{ hasEatNumber }}个苹果, {{ hasEatWeight }}克</div>
        </div>
      </div>
      <appleItem
        v-for="apple in list"
        :key="apple.appleIndex"
        class="appleItem"
        :apple-pic="applePic"
        :apple="apple"
        :change-weight="changeWeight"
        :eat-apple="eatApple"
      ></appleItem>
      <div class="btn-div">
        <button @click="addApples">摘苹果</button>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.appleBasket {
  width: 470px;
  margin: 20px auto;
  border-radius: 4px;
  border: 1px solid #ddd;
  .title {
    height: 66px;
    line-height: 66px;
    text-align: center;
    color: #069;
    font-size: 22px;
    font-weight: bold;
  }
}
.appleBasket > .btn-div {
  text-align: center;
}
.appleBasket > .btn-div > button {
  background-color: #096;
  padding: 10px 45px;
  margin: 10px auto;
}
.appleBasket > .stats {
  width: 100%;
  border-top: 1px dashed #ddd;
  border-bottom: 1px dashed #ddd;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
}
.btn-div > button {
  border: none;
  outline: none;
  margin: 0 3px;
  padding: 8px 15px;
  background-color: #3498db;
  color: #fff;
  font-size: 14px;
  border-radius: 6px;
}
.appleItem {
  width: 420px;
  margin: 10px auto;
  padding: 5px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.appleItem > .info > .name {
  padding: 6px 0;
  font-size: 18px;
  color: #069;
  font-weight: 500;
}
.appleItem > .info > .weight {
  font-size: 15px;
  font-weight: 200;
}
.btn-div > button {
  border: none;
  outline: none;
  margin: 0 3px;
  padding: 8px 15px;
  background-color: #3498db;
  color: #fff;
  font-size: 14px;
  border-radius: 6px;
}
.section {
  width: 50%;
  padding: 0 40px;
  border-right: 1px solid #f0f0f0;
}
.section > .content {
  font-size: 18px;
  font-weight: 400;
}
.section > .head {
  padding: 6px 0;
  font-size: 16px;
  color: #069;
}
.btn-div > button:hover {
  background-color: #5dade2;
}
.appleBasket > .btn-div > button:hover {
  background-color: #55d98d;
}
button {
  cursor: pointer;
}
</style>
