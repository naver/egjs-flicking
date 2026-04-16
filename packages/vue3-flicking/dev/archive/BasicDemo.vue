<template>
  <div class="demo-container">
    <h2>Vue3 Composition API Flicking Demo</h2>
    
    <!-- 기본 Flicking -->
    <div class="section">
      <h3>기본 Flicking</h3>
      <Flicking ref="flickingRef" :options="flickingOptions">
        <div 
          v-for="item in panels" 
          :key="item.id" 
          class="panel"
          :style="{ backgroundColor: item.color }"
        >
          {{ item.text }}
        </div>
      </Flicking>
    </div>

    <!-- 컨트롤 버튼들 -->
    <div class="controls">
      <button @click="addPanel" class="btn">패널 추가</button>
      <button @click="removePanel" class="btn">패널 제거</button>
      <button @click="prev" class="btn">이전</button>
      <button @click="next" class="btn">다음</button>
      <button @click="moveTo(2)" class="btn">3번 패널로 이동</button>
    </div>

    <!-- 현재 상태 표시 -->
    <div class="status">
      <p>총 패널 수: {{ panelCount }}</p>
      <p>현재 인덱스: {{ currentIndex }}</p>
    </div>

    <!-- 동적 옵션 변경 -->
    <div class="section">
      <h3>옵션 변경</h3>
      <label>
        <input 
          type="checkbox" 
          v-model="isCircular" 
          @change="updateOptions"
        />
        circular
      </label>
      <label>
        <input 
          type="checkbox" 
          v-model="isBound" 
          @change="updateOptions"
        />
        bound
      </label>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@dev/vue3-flicking";
import { computed, onMounted, reactive, ref, watch } from "vue";

// Flicking 인스턴스 참조
const flickingRef = ref(null);

// 반응형 데이터
const panels = reactive([
  { id: 1, text: "패널 1", color: "#ff6b6b" },
  { id: 2, text: "패널 2", color: "#4ecdc4" },
  { id: 3, text: "패널 3", color: "#45b7d1" },
  { id: 4, text: "패널 4", color: "#96ceb4" },
  { id: 5, text: "패널 5", color: "#feca57" }
]);

// Flicking 옵션
const flickingOptions = reactive({
  circular: false,
  bound: false,
  duration: 500,
  defaultIndex: 0
});

// 상태 변수들
const isCircular = ref(false);
const isBound = ref(false);
const currentIndex = ref(0);

// 계산된 속성
const panelCount = computed(() => panels.length);

// 메서드들
const addPanel = () => {
  const newId = Math.max(...panels.map(p => p.id)) + 1;
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  panels.push({
    id: newId,
    text: `패널 ${newId}`,
    color: randomColor
  });
};

const removePanel = () => {
  if (panels.length > 1) {
    panels.pop();
  }
};

const prev = () => {
  if (flickingRef.value) {
    flickingRef.value.prev();
  }
};

const next = () => {
  if (flickingRef.value) {
    flickingRef.value.next();
  }
};

const moveTo = index => {
  if (flickingRef.value) {
    flickingRef.value.moveTo(index);
  }
};

const updateOptions = () => {
  flickingOptions.circular = isCircular.value;
  flickingOptions.bound = isBound.value;
};

// 이벤트 리스너
const onChanged = e => {
  currentIndex.value = flickingRef.value.index;
};

// 라이프사이클 훅
onMounted(() => {
  if (flickingRef.value) {
    // 이벤트 리스너 등록
    flickingRef.value.on("changed", onChanged);
  }
});

// 감시자
watch(
  panels,
  newPanels => {
    console.log("패널이 변경되었습니다:", newPanels.length);
  },
  { deep: true }
);
</script>

<style>
@import './demo-common.css';
</style>

<style scoped>
/* BasicDemo 전용 스타일 */
.demo-container {
  max-width: 800px;
}

.panel {
  width: 200px;
  height: 150px;
  margin-right: 10px;
  font-size: 18px;
}
</style>