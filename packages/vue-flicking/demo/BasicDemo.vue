<template>
  <div class="reactive-demo">
    <h2>Vue2 Options API Flicking Demo</h2>
    
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

<script>
import Flicking from '../src/Flicking'

export default {
  name: 'BasicDemo',
  components: {
    Flicking
  },
  data() {
    return {
      // 반응형 데이터
      panels: [
        { id: 1, text: '패널 1', color: '#ff6b6b' },
        { id: 2, text: '패널 2', color: '#4ecdc4' },
        { id: 3, text: '패널 3', color: '#45b7d1' },
        { id: 4, text: '패널 4', color: '#96ceb4' },
        { id: 5, text: '패널 5', color: '#feca57' }
      ],
      // Flicking 옵션
      flickingOptions: {
        circular: false,
        bound: false,
        duration: 500,
        defaultIndex: 0
      },
      // 상태 변수들
      isCircular: false,
      isBound: false,
      currentIndex: 0
    }
  },
  computed: {
    // 계산된 속성
    panelCount() {
      return this.panels.length
    }
  },
  methods: {
    addPanel() {
      const newId = Math.max(...this.panels.map(p => p.id)) + 1
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      
      this.panels.push({
        id: newId,
        text: `패널 ${newId}`,
        color: randomColor
      })
    },
    removePanel() {
      if (this.panels.length > 1) {
        this.panels.pop()
      }
    },
    prev() {
      if (this.$refs.flickingRef) {
        this.$refs.flickingRef.prev()
      }
    },
    next() {
      if (this.$refs.flickingRef) {
        this.$refs.flickingRef.next()
      }
    },
    moveTo(index) {
      if (this.$refs.flickingRef) {
        this.$refs.flickingRef.moveTo(index)
      }
    },
    updateOptions() {
      this.flickingOptions.circular = this.isCircular
      this.flickingOptions.bound = this.isBound
    },
    // 이벤트 리스너
    onChanged(e) {
      this.currentIndex = this.$refs.flickingRef.index
    }
  },
  mounted() {
    if (this.$refs.flickingRef) {
      // 이벤트 리스너 등록
      this.$refs.flickingRef.on('changed', this.onChanged)
      console.log('Flicking 인스턴스가 마운트되었습니다')
    }
  },
  watch: {
    panels: {
      handler(newPanels) {
        console.log('패널이 변경되었습니다:', newPanels.length)
      },
      deep: true
    }
  }
}
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

.btn:hover {
  background-color: #0056b3;
}

.btn:active {
  transform: translateY(1px);
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

label {
  display: inline-block;
  margin: 10px 20px 10px 0;
  cursor: pointer;
}

input[type="checkbox"] {
  margin-right: 5px;
}
</style> 