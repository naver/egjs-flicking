### pnpm 모노 레포 루트 디렉토리에서 `pnpm run api-docs:generate`를 실행하면 아래의 작업들이 진행된다.
1. packages/flicking 의 타입 선언 파일(~~.d.ts)들이 만들어진다.
2. 타입 선언 파일들 대상으로 api-extractor가 실행되고 결과물(flicking.api.json)이 packages/api-docs-generator/api-atrifacts/ 에 저장된다.
3. packages/api-docs-generator/main.ts가 실행되고 결과물들로 mdx 파일들이 생성된다.


### 참고
- api-extractor.json 은 분석 대상 패키지의 루트에 위치해야 한다. 따라서 여기서는 packages/flicking 에 위치해있다.
- 모노레포 루트의 pnpm run api-docs:generate 명령어에서 `api-extractor run -c packages/flicking/api-extractor.json --local` 관련한 기록
  - `--local` 옵션을 추가하면 report.md를 생성하지 않는다. 
  - api-extractor는 기본적으로 매 실행시 report.md를 생성하고 기존의 report.md와 차이가 있다면 새로 생성한 temp/report.md 에 임시로 저장해둔다.
  - 이렇게 temp/report.md가 생성되는 경우 api-extractor 프로세스의 exit code가 1 이 되어서 후행하는 명령어가 실행되지 못하는 문제가 있다.
  - report.md는 api 변경 사항이 있을 떄 PR 리뷰를 쉽게 해주는 게 목적인데 지금 당장은 필요 없으므로 --local 옵션을 사용하였다.
    - api-extractor.json 에서 apiReport.enabled 를 false로도 해보았으나 내부적으로 뭔가 다른지, 이 경우에는 리포트 생성을 하지 않음에도 exid code가 1이 되는 문제가 해결되지 않았다.