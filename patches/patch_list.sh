#!/bin/bash

# Patch Path
## TargetPath, PatchPatch, CreatedPatchPath
PATCH_PATH=(../node_modules/recyclerlistview/dist/web/core/RecyclerListView.d.ts
            ./recyclerlistview/RecyclerListView.d.ts
            ./created/recyclerlistview-recyclerlistview.patch

            ../node_modules/recyclerlistview/dist/web/core/dependencies/DataProvider.d.ts
            ./recyclerlistview/dependencies/DataProvider.d.ts
            ./created/recyclerlistview-dataprovider.patch
           )
