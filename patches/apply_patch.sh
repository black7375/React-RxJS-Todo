#!/bin/bash
DIR=$( cd "$(dirname "$0")" ; pwd )

# Source Patch List
source ${DIR}/patch_list.sh

# apply patch
apply_patch() {
  local target=$1
  local patch=$2
  patch --forward ${DIR}/${target} < ${DIR}/${patch}
}

for (( i = 0; i<${#PATCH_PATH[@]}; i++)); do
   apply_patch ${PATCH_PATH[i]} ${PATCH_PATH[i+2]}
   ((i+=2))
done
