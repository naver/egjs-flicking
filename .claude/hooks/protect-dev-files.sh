#!/bin/bash
# protect-dev-files.sh
# PreToolUse hook: dev/ 하위 디렉토리의 index.html, main.* 수정을 차단한다.
# App.* 파일만 수정 허용. (AGENTS.md "dev/ 파일 수정" 규칙 enforcement)

INPUT=$(cat)
FILE_PATH=$(python3 -c "import sys,json; d=json.loads(sys.argv[1]); ti=d.get('tool_input',{}); print(ti.get('file_path','') or ti.get('path',''))" "$INPUT" 2>/dev/null)

# 파일 경로가 없으면 통과
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# packages/*/dev/ 하위의 index.html 차단
if echo "$FILE_PATH" | grep -qE 'packages/[^/]+/dev/(index\.html|[^/]+/index\.html)'; then
  echo "Blocked: dev/ 디렉토리의 index.html은 수정할 수 없습니다. App.* 파일만 수정하세요. (AGENTS.md dev 파일 규칙)" >&2
  exit 2
fi

# packages/*/dev/ 하위의 main.* 차단
if echo "$FILE_PATH" | grep -qE 'packages/[^/]+/dev/[^/]+/main\.[^/]+$'; then
  echo "Blocked: dev/ 디렉토리의 main.* 파일은 수정할 수 없습니다. App.* 파일만 수정하세요. (AGENTS.md dev 파일 규칙)" >&2
  exit 2
fi

exit 0
