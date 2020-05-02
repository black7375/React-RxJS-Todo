#!/bin/bash

# Source Patch List
source ./patch_list.sh

# Create Patch File
create_patch() {
  local target=$1
  local patched=$2
  local patch=$3
  diff -Naur $target $patched > $patch
}

for (( i = 0; i<${#PATCH_PATH[@]}; i++ )); do
  create_patch ${PATCH_PATH[i]} ${PATCH_PATH[i+1]} ${PATCH_PATH[i+2]}
  ((i+=2))
done
