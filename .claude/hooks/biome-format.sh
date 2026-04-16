#!/bin/bash
# biome-format.sh
# PostToolUse hook: 편집된 파일에 Biome check --write 자동 실행

INPUT=$(cat)
FILE_PATH=$(python3 -c "
import sys, json
d = json.loads(sys.argv[1])
ti = d.get('tool_input', {})
print(ti.get('file_path', '') or ti.get('path', ''))
" "$INPUT" 2>/dev/null)

# 파일 경로가 없으면 통과
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Biome가 처리할 수 있는 확장자만 대상
if echo "$FILE_PATH" | grep -qE '\.(ts|tsx|js|jsx|json|css|vue)$'; then
  npx @biomejs/biome check --write "$FILE_PATH" 2>/dev/null || echo "Biome format warning: $FILE_PATH" >&2
fi

exit 0
