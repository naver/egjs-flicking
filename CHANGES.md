## 변경
- anchor, hanger => align
- adaptive => horizontal일때만 적용
- infinite => 삭제
- lastIndex => 삭제
- thresholdAngle => 삭제
- zIndex => 삭제
- gap => 삭제
- overflow => 삭제
- infiniteThreshold => needPanelThreshold
- duration => 100 to 500
- moveType => string만 받음
- bounce => [10, 10]에서 "20%"로 변경
- autoResize => true로 변경
- isEqualSize, isConstantSize => Renderer 타입으로 변경
- collectStatistics => 삭제
- resizeOnContentsReady => 플러그인으로 변경
- getIndex => index
- getAllPanels => panels
- getElement => element
- getCurrentPanel => currentPanel
- needPanel => 0번 패널에서도 발생 가능
- replace => 삭제

## 추가
- interruptable 추가
- autoInit 추가
- useOffsetManipulator 추가
- 옵션별 getter/setter 추가
- insert 추가

## 그 외
- DOM 구조 필요
- CSS import 필요
- 사라진 CSS 관련 옵션(zIndex, overflow) 직접 설정 필요
- gap 옵션을 CSS로 설정 필요
- 이제 패널 인덱스는 항상 연속함
