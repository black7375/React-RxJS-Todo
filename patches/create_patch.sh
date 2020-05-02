#!/bin/bash

DIR=$( cd "$(dirname "$0")" ; pwd )

# Source Patch List
source ${DIR}/patch_list.sh

# Create Patch File
create_patch() {
  local target=$1
  local patched=$2
  local patch=$3
  diff -Naur ${DIR}/${target} ${DIR}/${patched} > ${DIR}/${patch}
}

for (( i = 0; i<${#PATCH_PATH[@]}; i++ )); do
  create_patch ${PATCH_PATH[i]} ${PATCH_PATH[i+1]} ${PATCH_PATH[i+2]}
  ((i+=2))
done
