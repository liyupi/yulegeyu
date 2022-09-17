<template>
  <div id="customConfigPage">
    <h2>
      自定义难度
      <a-button style="float: right" @click="doBack">返回</a-button>
    </h2>
    <a-form
      ref="formRef"
      label-align="left"
      :label-col="{ style: { width: '120px' } }"
      :model="config"
      @finish="handleFinish"
    >
      <a-form-item label="槽容量" name="slotNum">
        <a-input-number v-model:value="config.slotNum" />
      </a-form-item>
      <a-form-item label="合成数" name="composeNum">
        <a-input-number v-model:value="config.composeNum" />
      </a-form-item>
      <a-form-item label="动物数" name="typeNum">
        <a-input-number v-model:value="config.typeNum" />
      </a-form-item>
      <a-form-item label="动物图案" name="animalStr">
        <a-input v-model:value="config.animalStr" />
      </a-form-item>
      <a-form-item label="总层数" name="levelNum">
        <a-input-number v-model:value="config.levelNum" />
      </a-form-item>
      <a-form-item label="每层块数" name="levelBlockNum">
        <a-input-number v-model:value="config.levelBlockNum" />
      </a-form-item>
      <a-form-item label="边界收缩" name="borderStep">
        <a-input-number v-model:value="config.borderStep" />
      </a-form-item>
      <a-form-item label="随机区数" name="randomAreaNum">
        <a-input-number v-model:value="config.randomAreaNum" />
      </a-form-item>
      <a-form-item label="随机区块数" name="randomBlockNum">
        <a-input-number v-model:value="config.randomBlockNum" />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="margin-bottom: 12px"
          block
        >
          开始
        </a-button>
        <a-button block style="margin-bottom: 12px" @click="resetForm"
          >重置
        </a-button>
        <a-button block danger @click="resetConfig">还原最初配置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormInstance } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../core/globalStore";
import { defaultGameConfig } from "../core/gameConfig";

const formRef = ref<FormInstance>();
const router = useRouter();
const { customConfig, setGameConfig, setCustomConfig, reset } =
  useGlobalStore();
const initConfig = {
  randomAreaNum: 2,
  randomBlockNum: 8,
  animalStr: defaultGameConfig.animals.join(""),
  ...customConfig,
};
const config = reactive<any>(initConfig);

/**
 * 表单提交
 * @param values
 */
const handleFinish = (values: any) => {
  config.randomBlocks = new Array(values.randomAreaNum).fill(
    values.randomBlockNum
  );
  if (values.animalStr) {
    config.animals = Array.from(values.animalStr);
  }
  setGameConfig(config);
  setCustomConfig(config);
  router.push("/game");
};

const resetForm = () => {
  formRef?.value?.resetFields();
};

/**
 * 还原至初始配置
 */
const resetConfig = () => {
  reset();
  router.go(0);
};

/**
 * 回上一页
 */
const doBack = () => {
  router.back();
};
</script>
<style></style>
