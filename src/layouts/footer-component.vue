<template>
  <footer class="app-main-footer">
    <section class="company-info">
      <div>
        <h4 class="line">联系我们</h4>
        <div class="line">
          <el-icon><Phone /></el-icon>
          <span class="interval">客服电话：0477-3109925</span>
        </div>
        <div class="line">
          <el-icon><Message /></el-icon>
          <span class="interval">邮编：264200</span>
        </div>
        <div class="line">
          <el-icon><Location /></el-icon>
          <span class="interval">办公地址：鄂尔多斯市人才科创中心</span>
        </div>
      </div>
      <div>
        <h4 class="line">帮助中心</h4>
        <div class="line">客户注册指南</div>
        <div class="line">交易规则</div>
        <div class="line">常见问题</div>
      </div>
      <div style="display: flex">
        <div class="code">
          <img width="88" height="88" src="../assets/qrcode.png" alt="国能互通APP" />
          <span class="code-text">国能互通APP</span>
        </div>
        <div class="code" style="margin: 0 36px">
          <img width="88" height="88" src="../assets/qrcode.png" alt="国能互通官方公众号" />
          <span class="code-text">国能互通官方公众号</span>
        </div>
        <div class="code">
          <img width="88" height="88" src="../assets/qrcode.png" alt="国能互通官方微信" />
          <span class="code-text">国能互通官方微信</span>
        </div>
      </div>
    </section>
    <section class="web-info">
      <div class="domain">
        <div>
          <span>ICP备案号：</span>
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">蒙ICP备17001310号</a>
        </div>
        <div style="margin: 0 48px">增值电信业务经营许可证号：蒙B2-20180078</div>
        <div>电话：0477-3109925（交易服务）3109930（信息数据服务）</div>
      </div>
      <div>Copyright 2017-2023 国能互通内蒙古网络科技有限公司 版权所有</div>
    </section>
  </footer>
</template>

<script lang="ts" setup>
import { Message, Location, Phone } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.app-main-footer {
  margin-top: 24px;
  .company-info {
    display: flex;
    width: 100%;
    justify-content: space-around;
    height: 150px;
    .line {
      line-height: 36px;
    }
    .interval {
      margin-left: 6px;
    }
    .code {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .code-text {
        margin-top: 12px;
      }
    }
  }
  .web-info {
    background: #99b0ec;
    text-align: center;
    padding: 16px 0;
    font-size: 14px;
    margin-top: 30px;
    .domain {
      display: flex;
      justify-content: center;
      margin-bottom: 12px;
    }
  }
}
</style>
