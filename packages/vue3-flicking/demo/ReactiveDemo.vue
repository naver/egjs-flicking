<template>
  <div class="reactive-demo">
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
import { ref, reactive, onMounted } from 'vue'
import Flicking from '../src/Flicking'
import { useFlickingReactiveAPI } from "../src/reactive";

// Flicking 인스턴스 참조
const flickingRef = ref(null)

// 반응형 데이터
const panels = reactive([
  { id: 1, text: '패널 1', color: '#ff6b6b' },
  { id: 2, text: '패널 2', color: '#4ecdc4' },
  { id: 3, text: '패널 3', color: '#45b7d1' },
  { id: 4, text: '패널 4', color: '#96ceb4' },
  { id: 5, text: '패널 5', color: '#feca57' }
])

// Flicking 옵션
const flickingOptions = reactive({
  circular: false,
  bound: false,
  duration: 500,
  defaultIndex: 0,
})

// Reactive API 훅 사용
const {
  currentPanelIndex,
  totalPanelCount,
  isReachStart,
  isReachEnd,
  progress,
  moveTo
} = useFlickingReactiveAPI(flickingRef)

// 메서드들
const handlePrev = () => {
  if (!isReachStart.value) {
    moveTo(currentPanelIndex.value - 1)
  }
}

const handleNext = () => {
  if (!isReachEnd.value) {
    moveTo(currentPanelIndex.value + 1)
  }
}

// 라이프사이클 훅
onMounted(() => {
  if (flickingRef.value) {
    console.log('Flicking 인스턴스가 마운트되었습니다')
  }
})
</script>

<style scoped>
.reactive-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.section {
  margin-bottom: 30px;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

h3 {
  color: #666;
  margin-bottom: 15px;
}

.panel {
  width: 200px;
  height: 150px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.progress-container {
  position: relative;
  width: 100%;
  height: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.progress-text {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  font-weight: bold;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn:active:not(:disabled) {
  transform: translateY(1px);
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.pagination-btn:hover {
  background-color: #0056b3;
}

.pagination-btn:active {
  transform: translateY(1px);
}

.pagination-btn.active {
  background-color: #28a745;
}

.status {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
  text-align: center;
}

.status p {
  margin: 5px 0;
  color: #666;
}
</style>
