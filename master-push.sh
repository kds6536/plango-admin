#!/bin/bash

for DIR in plango plango-admin; do
  if [ -d "$DIR" ]; then
    echo "==== $DIR 프로젝트 푸시 시작 ===="
    cd "$DIR"
    # 변경사항이 있을 때만 push
    if [ -n "$(git status --porcelain)" ]; then
      MSG="자동 커밋: $DIR 프로젝트 변경사항 반영"
      bash push-safe.sh "$MSG"
    else
      echo "변경사항 없음"
    fi
    cd ..
  fi
  echo
  echo "=============================="
done 