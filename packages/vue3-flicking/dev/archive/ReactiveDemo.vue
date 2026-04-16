<template>
  <div class="demo-container">
    <h2>Reactive API - Pagination Demo</h2>
    
    <div class="section">
      <h3>Pagination with Reactive API</h3>
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
    
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      <div class="progress-text">Progress: {{ progress.toFixed(1) }}%</div>
    </div>

    <div class="controls">
      <button @click="handlePrev" :disabled="isReachStart" class="btn">
        이전
      </button>
      <button @click="handleNext" :disabled="isReachEnd" class="btn">
        다음
      </button>
    </div>

    <div class="pagination">
      <button 
        v-for="page in totalPanelCount" 
        :key="page"
        :class="{ active: currentPanelIndex + 1 === page }"
        @click="moveTo(page - 1)"
        class="pagination-btn"
      >
        {{ page }}
      </button>
    </div>

    <div class="status">
      <p>총 패널 수: {{ totalPanelCount }}</p>
      <p>현재 인덱스: {{ currentPanelIndex }}</p>
      <p>진행률: {{ progress.toFixed(1) }}%</p>
      <p>첫 번째 패널: {{ isReachStart ? '도달' : '미도달' }}</p>
      <p>마지막 패널: {{ isReachEnd ? '도달' : '미도달' }}</p>
    </div>
  </div>
</template>

<script setup>
import Flicking, { useFlickingReactiveAPI } from "@dev/vue3-flicking";
import { onMounted, reactive, ref } from "vue";

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

// Reactive API 훅 사용
const { currentPanelIndex, totalPanelCount, isReachStart, isReachEnd, progress, moveTo } =
  useFlickingReactiveAPI(flickingRef);

// 메서드들
const handlePrev = () => {
  if (!isReachStart.value) {
    moveTo(currentPanelIndex.value - 1);
  }
};

const handleNext = () => {
  if (!isReachEnd.value) {
    moveTo(currentPanelIndex.value + 1);
  }
};

// 라이프사이클 훅
onMounted(() => {
  if (flickingRef.value) {
    console.log("Flicking 인스턴스가 마운트되었습니다");
  }
});
</script>

<style>
@import './demo-common.css';
</style>

<style scoped>
/* ReactiveDemo 전용 스타일 */
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
