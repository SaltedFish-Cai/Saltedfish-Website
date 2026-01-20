<template>
  <!-- transfer -->
  <el-col v-if="inItem.type == 'transfer'" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :span="24">
    <el-form-item :prop="inItem.prop" :class="[display ? 'm-form-display' : '']">
      <template #label v-if="inItem.label && !noLabel">
        <form-label
          :label="inItem.label"
          :tip="inItem.tip"
          :item="inItem"
          :data="data"
          :labelWidth="labelWidth"
          :labelPosition="labelPosition"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </form-label>
      </template>
      <!-- <div class="flex-center" style="width: 100%"> -->
      <transferItem
        :item="{
          ...inItem,
          placeholder,
          disabled: inItem.disabled || disabledFn(data),
          size: props.size
        }"
        :data="data"
        :exOptions="exOptions"
        :contrastData="contrastData"
        :alwaysContrast="alwaysContrast"
      ></transferItem>
      <!-- </div> -->
    </el-form-item>
  </el-col>

  <!-- item -->
  <el-col
    v-else-if="inItem.prop"
    :xs="(inItem?.prop && itemSpanSize?.[Array.isArray(inItem.prop) ? inItem.prop.join('-') : inItem.prop]) || baseSpanSize"
    :sm="(inItem?.prop && itemSpanSize?.[Array.isArray(inItem.prop) ? inItem.prop.join('-') : inItem.prop]) || baseSpanSize"
    :md="(inItem?.prop && itemSpanSize?.[Array.isArray(inItem.prop) ? inItem.prop.join('-') : inItem.prop]) || baseSpanSize"
    :lg="(inItem?.prop && itemSpanSize?.[Array.isArray(inItem.prop) ? inItem.prop.join('-') : inItem.prop]) || baseSpanSize"
    :xl="(inItem?.prop && itemSpanSize?.[Array.isArray(inItem.prop) ? inItem.prop.join('-') : inItem.prop]) || baseSpanSize"
    :span="baseSpanSize"
  >
    <el-form-item
      :prop="Array.isArray(inItem.prop) ? inItem.prop.join('-') : inItem.prop"
      :class="[display ? 'm-form-display' : '', inItem.exStyles?.class || '']"
      :style="inItem.exStyles?.style || {}"
    >
      <!-- label -->
      <template #label v-if="inItem.label && !noLabel">
        <form-label
          :label="inItem.label"
          :tip="inItem.tip"
          :item="inItem"
          :data="data"
          :labelWidth="labelWidth"
          :labelPosition="labelPosition"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </form-label>
      </template>

      <section class="flex-start-start flex-cell">
        <!-- input -->
        <template v-if="inItem.type == 'input' || inItem.type == 'textarea'">
          <inputItem
            v-if="!useAlone"
            :item="{
              ...inItem,
              placeholder,
              disabled: inItem.disabled || disabledFn(data),
              size: props.size,
              display
            }"
            :id="id + '-' + inItem.prop + '-input'"
            :data="data"
            :contrastData="contrastData"
            :alwaysContrast="alwaysContrast"
          />
          <m-input
            v-else
            :id="id + '-' + inItem.prop + '-input'"
            v-model="data[inItem.prop]"
            :type="inItem.type"
            :placeholder="inItem.placeholder"
            :disabled="inItem.disabled || disabledFn(data)"
            :display="display"
            :maxLength="inItem.maxLength"
            :minLength="inItem.minLength"
            :clearable="inItem.clearable"
            :showWordLimit="inItem.showWordLimit"
            :minRows="inItem.minRows"
            :maxRows="inItem.maxRows"
            :autofocus="inItem.autofocus"
            :size="inItem.size"
            :inputParser="inItem.inputParser"
            :inputFormatter="inItem.inputFormatter"
            :contrastData="inItem.prop && contrastData?.[inItem.prop]"
            :alwaysContrast="alwaysContrast"
            @change="value => emitFn({ prop: inItem.prop, ...value })"
          ></m-input>
        </template>

        <!-- number -->
        <template v-else-if="inItem.type == 'number'">
          <number-item
            v-if="!useAlone"
            :item="{
              ...inItem,
              placeholder,
              disabled: inItem.disabled || disabledFn(data),
              size: props.size,
              display
            }"
            :id="id + '-' + inItem.prop + '-number'"
            :data="data"
            :contrastData="contrastData"
            :alwaysContrast="alwaysContrast"
          />
          <m-number
            v-else
            :id="id + '-' + inItem.prop + '-number'"
            v-model="data[inItem.prop]"
            :placeholder="inItem.placeholder"
            :disabled="inItem.disabled || disabledFn(data)"
            :display="display"
            :min="inItem.min"
            :max="inItem.max"
            :precision="inItem.precision"
            :controls="inItem.controls"
            :controlsPosition="inItem.controlsPosition"
            :valueOnClear="inItem.clearOnValue || inItem.valueOnClear"
            :step="inItem.step"
            :stepStrictly="inItem.stepStrictly"
            :size="inItem.size"
            :contrastData="inItem.prop && contrastData?.[inItem.prop]"
            :alwaysContrast="alwaysContrast"
            @change="value => emitFn({ prop: inItem.prop, ...value })"
          ></m-number>
        </template>

        <!-- select -->
        <template
          v-else-if="
            inItem.type == 'select' ||
            inItem.type == 'multiple-select' ||
            inItem.type == 'request-select' ||
            inItem.type == 'multiple-request-select' ||
            inItem.type == 'online-select' ||
            inItem.type == 'multiple-online-select'
          "
        >
          <template v-if="!useAlone">
            <select-item
              v-if="inItem.type == 'select' || inItem.type == 'multiple-select'"
              :item="{
                ...inItem,
                placeholder,
                disabled: inItem.disabled || disabledFn(data),
                size: props.size,
                display
              }"
              :id="id + '-' + inItem.prop + '-select'"
              :data="data"
              :contrastData="contrastData"
              :alwaysContrast="alwaysContrast"
              :exOptions="exOptions"
              @change="changeEvent"
            >
              <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                <slot :name="slot" v-bind="scope"></slot>
              </template>
            </select-item>
            <select-item
              v-else-if="inItem.type == 'request-select' || inItem.type == 'multiple-request-select'"
              :item="{
                ...inItem,
                placeholder,
                disabled: inItem.disabled || disabledFn(data),
                size: props.size,
                display
              }"
              :id="id + '-' + inItem.prop + '-select'"
              :data="data"
              :contrastData="contrastData"
              :alwaysContrast="alwaysContrast"
              :exOptions="onLineOptions"
              @remote-method="data => remoteMethod(data.query, data.prop, data.item, data.data)"
              @change="changeEvent"
            >
              <template v-for="slot in Object.keys($slots)" #[slot]="scope"> <slot :name="slot" v-bind="scope"></slot> </template>
            </select-item>
            <select-item
              v-else-if="inItem.type == 'online-select' || inItem.type == 'multiple-online-select'"
              :item="{
                ...inItem,
                placeholder,
                disabled: inItem.disabled || disabledFn(data),
                size: props.size,
                display
              }"
              :id="id + '-' + inItem.prop + '-select'"
              :data="data"
              :contrastData="contrastData"
              :alwaysContrast="alwaysContrast"
              :exOptions="onLineOptions"
              @remote-method="data => remoteMethod(data.query, data.prop, data.item, data.data)"
              @change="changeEvent"
            >
              <template v-for="slot in Object.keys($slots)" #[slot]="scope"> <slot :name="slot" v-bind="scope"></slot> </template>
            </select-item>
          </template>

          <m-select
            v-else
            :id="id + '-' + inItem.prop + '-select'"
            v-model="data[inItem.prop]"
            :type="inItem.type"
            :displayValue="inItem.displayProp ? data[inItem.displayProp] : undefined"
            :exOptions="exOptions[inItem.prop] || inItem.options"
            :requestApi="exDependent?.remoteMethod?.[inItem.prop]"
            :optionKey="inItem.optionKey"
            :placeholder="inItem.placeholder"
            :disabled="inItem.disabled || disabledFn(data)"
            :display="display"
            :clearable="inItem.clearable"
            :multipleLimit="inItem.multipleLimit"
            :collapseTags="inItem.collapseTags"
            :maxCollapseTags="inItem.maxCollapseTags"
            :size="inItem.size"
            :contrastData="inItem.prop && contrastData?.[inItem.prop]"
            :alwaysContrast="alwaysContrast"
            @change="value => emitFn({ prop: inItem.prop, ...value })"
          ></m-select>
        </template>

        <!-- cascader -->
        <template
          v-else-if="
            inItem.type == 'cascader' ||
            inItem.type == 'cascader-check' ||
            inItem.type == 'multiple-cascader-check' ||
            inItem.type == 'multiple-cascader'
          "
        >
          <cascaderItem
            v-if="!useAlone"
            :item="{
              ...inItem,
              placeholder,
              disabled: inItem.disabled || disabledFn(data),
              size: props.size,
              display
            }"
            :id="id + '-' + inItem.prop + '-select'"
            :data="data"
            :contrastData="contrastData"
            :alwaysContrast="alwaysContrast"
            :exOptions="exOptions"
            @change="changeEvent"
          >
            <template v-for="slot in Object.keys($slots)" #[slot]="scope"> <slot :name="slot" v-bind="scope"></slot> </template>
          </cascaderItem>

          <m-cascader
            v-else
            :id="id + '-' + inItem.prop + '-cascader'"
            v-model="data[inItem.prop]"
            :displayValue="inItem.displayProp ? data[inItem.displayProp] : undefined"
            :type="inItem.type"
            :exOptions="exOptions[inItem.prop] || inItem.options"
            :placeholder="inItem.placeholder"
            :clearable="inItem.clearable"
            :disabled="inItem.disabled || disabledFn(data)"
            :collapseTags="inItem.collapseTags"
            :maxCollapseTags="inItem.maxCollapseTags"
            :display="display"
            :size="inItem.size"
            :contrastData="contrastData?.[inItem.prop]"
            :alwaysContrast="alwaysContrast"
            @change="value => emitFn({ prop: inItem.prop, ...value })"
          ></m-cascader>
        </template>

        <!-- select-icon -->
        <selectIcon
          v-else-if="inItem.type == 'select-icon'"
          :id="id + '-' + inItem.prop + '-select-icon'"
          :item="{
            ...inItem,
            placeholder,
            disabled: inItem.disabled || disabledFn(data),
            size: props.size,
            display
          }"
          :data="data"
          :contrastData="contrastData"
          :alwaysContrast="alwaysContrast"
          @change="changeEvent"
        />

        <!-- switch -->
        <template v-else-if="inItem.type == 'switch'">
          <switchItem
            v-if="!useAlone"
            :item="{
              ...inItem,
              disabled: inItem.disabled || disabledFn(data),
              size: props.size,
              display
            }"
            :id="id + '-' + inItem.prop + '-switch'"
            :data="data"
            :contrastData="contrastData"
            :alwaysContrast="alwaysContrast"
            :exOptions="exOptions"
          />

          <m-switch
            v-else
            :id="id + '-' + inItem.prop + '-switch'"
            v-model="data[inItem.prop]"
            :disabled="inItem.disabled || disabledFn(data)"
            :exOptions="exOptions[inItem.prop] || inItem.options"
            :display="display"
            :size="inItem.size"
            :activeValue="inItem.activeValue"
            :inActiveValue="inItem.inActiveValue"
            :activeText="inItem.activeText"
            :inActiveText="inItem.inActiveText"
            :contrastData="inItem.prop && contrastData?.[inItem.prop]"
            :alwaysContrast="alwaysContrast"
            @change="value => emitFn({ prop: inItem.prop, ...value })"
          ></m-switch>
        </template>

        <!-- checkbox -->
        <template v-else-if="inItem.type == 'checkbox'">
          <checkBoxItem
            v-if="!useAlone"
            :item="{
              ...inItem,
              disabled: inItem.disabled || disabledFn(data),
              size: props.size,
              display
            }"
            :id="id + '-' + inItem.prop + '-checkbox'"
            :data="data"
            :contrastData="contrastData"
            :alwaysContrast="alwaysContrast"
            :exOptions="exOptions"
            @change="changeEvent"
          />

          <m-checkbox
            v-else
            :id="id + '-' + inItem.prop + '-checkbox'"
            v-model="data[inItem.prop]"
            :disabled="inItem.disabled || disabledFn(data)"
            :exOptions="exOptions[inItem.prop] || inItem.options"
            :display="display"
            :size="inItem.size"
            :contrastData="inItem.prop && contrastData?.[inItem.prop]"
            :alwaysContrast="alwaysContrast"
            @change="value => emitFn({ prop: inItem.prop, ...value })"
          ></m-checkbox>
        </template>

        <!-- radio -->
        <template v-else-if="inItem.type == 'radio'">
          <radioItem
            v-if="!useAlone"
            :item="{
              ...inItem,
              disabled: inItem.disabled || disabledFn(data),
              size: props.size,
              display
            }"
            :id="id + '-' + inItem.prop + '-radio'"
            :data="data"
            :contrastData="contrastData"
            :alwaysContrast="alwaysContrast"
            :exOptions="exOptions"
            @change="changeEvent"
          />

          <m-radio
            v-else
            :id="id + '-' + inItem.prop + '-radio'"
            v-model="data[inItem.prop]"
            :disabled="inItem.disabled || disabledFn(data)"
            :exOptions="exOptions[inItem.prop] || inItem.options"
            :display="display"
            :size="inItem.size"
            :contrastData="inItem.prop && contrastData?.[inItem.prop]"
            :alwaysContrast="alwaysContrast"
            @change="value => emitFn({ prop: inItem.prop, ...value })"
          ></m-radio>
        </template>

        <!-- address -->
        <addressItem
          v-else-if="inItem.type == 'address'"
          :id="id + '-' + inItem.prop + '-address'"
          :item="{
            ...inItem,
            placeholder,
            disabled: inItem.disabled || disabledFn(data),
            size: props.size,
            display
          }"
          :data="data"
          :contrastData="contrastData"
          :alwaysContrast="alwaysContrast"
          @change="changeEvent"
        />

        <!-- time -->
        <template
          v-else-if="
            inItem.type == 'time-picker' ||
            inItem.type == 'time-picker-group' ||
            inItem.type == 'date-time-range' ||
            inItem.type == 'date-picker' ||
            inItem.type == 'date-picker-group' ||
            inItem.type == 'month-picker' ||
            inItem.type == 'month-picker-group' ||
            inItem.type == 'year-picker' ||
            inItem.type == 'year-picker-group'
          "
        >
          <template v-if="!useAlone">
            <timePickerItem
              v-if="inItem.type == 'time-picker' || inItem.type == 'time-picker-group'"
              :item="{
                ...inItem,
                placeholder,
                disabled: inItem.disabled || inItem.disabled || disabledFn(data),
                size: props.size,
                disabledDateFn: exDependent?.disabledDateFn?.[inItem.prop],
                display
              }"
              :id="id + '-' + inItem.prop + '-time'"
              :data="data"
              :contrastData="contrastData"
              :alwaysContrast="alwaysContrast"
            />

            <datePickerItem
              v-else-if="inItem.type == 'date-time-range' || inItem.type == 'date-picker' || inItem.type == 'date-picker-group'"
              :item="{
                ...inItem,
                placeholder,
                disabled: inItem.disabled || disabledFn(data),
                size: props.size,
                disabledDateFn: exDependent?.disabledDateFn?.[inItem.prop],
                display
              }"
              :id="id + '-' + inItem.prop + '-time'"
              :data="data"
              :contrastData="contrastData"
              :alwaysContrast="alwaysContrast"
            />

            <monthPickerItem
              v-else-if="inItem.type == 'month-picker' || inItem.type == 'month-picker-group'"
              :item="{
                ...inItem,
                placeholder,
                disabled: inItem.disabled || disabledFn(data),
                size: props.size,
                disabledDateFn: exDependent?.disabledDateFn?.[inItem.prop],
                display
              }"
              :id="id + '-' + inItem.prop + '-time'"
              :data="data"
              :contrastData="contrastData"
              :alwaysContrast="alwaysContrast"
            />

            <yearPickerItem
              v-else-if="inItem.type == 'year-picker' || inItem.type == 'year-picker-group'"
              :item="{
                ...inItem,
                placeholder,
                disabled: inItem.disabled || disabledFn(data),
                size: props.size,
                disabledDateFn: exDependent?.disabledDateFn?.[inItem.prop],
                display
              }"
              :id="id + '-' + inItem.prop + '-time'"
              :data="data"
              :contrastData="contrastData"
              :alwaysContrast="alwaysContrast"
            />
          </template>

          <m-time
            v-else
            :id="id + '-' + inItem.prop + '-time'"
            v-model="data[inItem.prop]"
            :type="inItem.type"
            :display="display"
            :placeholder="inItem.placeholder"
            :disabled="inItem.disabled || disabledFn(data)"
            :size="inItem.size"
            :disabledDateFn="inItem.disabledDateFn || exDependent?.disabledDateFn?.[inItem.prop]"
            :contrastData="inItem.prop && contrastData?.[inItem.prop]"
            :alwaysContrast="alwaysContrast"
            @change="value => emitFn({ prop: inItem.prop, ...value })"
          ></m-time>
        </template>

        <!-- file -->
        <fileItem
          v-else-if="inItem.type == 'file'"
          :id="id + '-' + inItem.prop + '-file'"
          :item="{
            ...inItem,
            placeholder,
            fileAttached: (exDependent?.fileData && exDependent?.fileData[inItem.prop]) || inItem.fileAttached || inItem.exData,
            fileMultiple: (exDependent?.fileMultiple && exDependent?.fileMultiple[inItem.prop]) || inItem.fileMultiple,
            disabled: inItem.disabled || disabledFn(data),
            size: props.size,
            display
          }"
          :data="data"
          :contrastData="contrastData"
          :alwaysContrast="alwaysContrast"
          @change="changeEvent"
          @change-state="changeState"
        />

        <!-- slot -->
        <slot-item
          v-else-if="inItem.type == 'slot' || $slots[String(inItem.prop)]"
          :item="inItem"
          :data="data"
          :contrastData="contrastData"
          :alwaysContrast="alwaysContrast"
          :exOptions="exOptions"
          :labelWidth="labelWidth"
          :labelPosition="labelPosition"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="scope" :key="slot">
            <slot :name="slot" :row="scope.row"></slot>
          </template>
        </slot-item>
      </section>

      <div class="cell-slots" v-if="$slots[`cell-${inItem.prop}`]">
        <slot :name="'cell-' + inItem.prop" v-bind="{ data, item: inItem }"></slot>
      </div>

      <div v-if="inItem.exStyles?.message" :class="inItem.exStyles?.messageClass" :style="inItem.exStyles?.messageStyle">
        {{ inItem.exStyles?.message }}
      </div>
    </el-form-item>
  </el-col>

  <!-- null -->
  <el-col
    v-else-if="inItem.type == 'null'"
    :xs="(inItem?.prop && itemSpanSize?.[inItem.prop]) || baseSpanSize"
    :sm="(inItem?.prop && itemSpanSize?.[inItem.prop]) || baseSpanSize"
    :md="(inItem?.prop && itemSpanSize?.[inItem.prop]) || baseSpanSize"
    :lg="(inItem?.prop && itemSpanSize?.[inItem.prop]) || baseSpanSize"
    :xl="(inItem?.prop && itemSpanSize?.[inItem.prop]) || baseSpanSize"
    :span="baseSpanSize"
  >
    <div class="h26" />
  </el-col>
  <!-- docEditor -->
  <!-- <editor-item v-else-if="inItem.type == 'editor'" :item="item" :data="data"></editor-item> -->

  <!-- slot -->
  <!-- <template v-else-if="inItem.type == 'slot'">
    <slot :name="inItem.slotName" :row="item" />
  </template> -->

  <!-- <input-item v-else :item="item" :data="data" :labelWidth="labelWidth" :exFormatter="exFormatter" :exParser="exParser" /> -->
</template>

<script lang="ts" setup>
// # Import
import { ref, computed, nextTick, inject } from "vue";
import formLabel from "./label.vue";

import inputItem from "../../m-elements/input/index.vue";
import numberItem from "../../m-elements/number/index.vue";
import selectItem from "../../m-elements/select/index.vue";
import cascaderItem from "../../m-elements/cascader/index.vue";
import selectIcon from "../../m-elements/icon/index.vue";
import switchItem from "../../m-elements/switch/index.vue";
import checkBoxItem from "../../m-elements/checkbox/index.vue";
import radioItem from "../../m-elements/radio/index.vue";
import timePickerItem from "../../m-elements/time/time.vue";
import datePickerItem from "../../m-elements/time/date.vue";
import monthPickerItem from "../../m-elements/time/month.vue";
import yearPickerItem from "../../m-elements/time/year.vue";
import fileItem from "../../m-elements/file/index.vue";
import addressItem from "../../m-elements/address/index.vue";
import transferItem from "../../m-elements/transfer/index.vue";

import slotItem from "./items/slot.vue";

import { BasicsItemPropsType } from "../item";
import lodashPkg from "lodash";
const { isNil } = lodashPkg;

import { useBaseStore } from "../../store/index";

// # Var
const props = withDefaults(defineProps<BasicsItemPropsType>(), {
  data: () => ({}),
  useAlone: false
});

const onLineOptions = ref({});

const globalState = useBaseStore();

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});

let placeholder = props.item?.placeholder;
if (!placeholder) {
  const item = props.item;
  if (item.type == "input" || item.type == "textarea" || item.type == "number") {
    placeholder = languagePackage.value["input"] + item.label;
  } else if (
    item.type == "select" ||
    item.type == "multiple-select" ||
    item.type == "cascader" ||
    item.type == "cascader-check" ||
    item.type == "multiple-cascader-check" ||
    item.type == "multiple-cascader" ||
    item.type == "online-select" ||
    item.type == "multiple-online-select" ||
    item.type == "request-select" ||
    item.type == "multiple-request-select" ||
    item.type == "time-picker" ||
    item.type == "time-picker-group" ||
    item.type == "month-picker" ||
    item.type == "month-picker-group" ||
    item.type == "year-picker" ||
    item.type == "year-picker-group" ||
    item.type == "date-time-range" ||
    item.type == "date-picker" ||
    item.type == "date-picker-group" ||
    item.type == "address"
  ) {
    placeholder = languagePackage.value["select"] + item.label;
  }
}
const inItem = computed(() => {
  return { ...props.item, placeholder };
});

const changeFormState: any = inject("changeFormState");
const emitFn: any = inject("emitFn");
const exDependent: any = inject("propDependent");
const exOptions: any = inject("propOptions");

// #Computed 监听Display状态
const display = computed(() => {
  return props.enforcementDisplay || (!isNil(props.item.display) ? props.item.display : props.display || false);
});

// #Function 执行外部disabled方法
function disabledFn(data) {
  if (!props.item.prop || !exDependent?.value?.disabledRule) return false;

  const prop = Array.isArray(props.item.prop) ? props.item.prop.join("-") : props.item.prop;
  const disabledRule = exDependent?.value?.disabledRule;

  return disabledRule[prop] && disabledRule[prop](data);
}

// #Function 检验单个字段
function changeEvent({ item }) {
  nextTick(() => {
    props.ruleFormRef.validateField(item.prop);
  });
}

// #Function 变更formState状态
function changeState(data: "Pending" | "Working") {
  changeFormState(data);
}

// #Function 执行传入方法
async function remoteMethod(query, prop, item, data) {
  // if (item.display || item.disabled) return;
  if (exDependent?.value.remoteMethod && exDependent?.value?.remoteMethod[item.prop]) {
    const _fn = exDependent?.value?.remoteMethod[item.prop];
    if (_fn) {
      const options = await _fn(query || data[prop], prop, item, data);
      onLineOptions.value[prop] = options.length ? options : [];
    }
    return;
  }
  return window.log.error("使用 online-select 时，必须添加 exDependent.remoteMethod 属性");
}
</script>

<style lang="scss" scoped>
.flex-cell {
  width: 100%;
  word-break: break-all;
}
.cell-slots {
  font-size: 14px;
  line-height: 1.5em;
  word-break: break-all;
  padding-top: 5px;
}

.h26 {
  height: 26px;
}
</style>

<style lang="scss">
// .span_item_all-center {
//   width: 100%;
//   .el-form-item {
//     margin-bottom: 18px !important;
//     &__content {
//       display: flex;
//       justify-content: center;
//     }
//   }
// }
</style>
