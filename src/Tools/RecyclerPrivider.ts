import { BaseDataProvider } from 'recyclerlistview/dist/web/core/dependencies/DataProvider'
import { DataProvider } from 'recyclerlistview/web'
import { ObjectUtil } from "ts-object-utils";
import { List } from 'immutable'

// == RecyclerListView DataProvinder ===========================================
/***
 * You can create a new instance or inherit and override default methods
 * Allows access to data and size. Clone with rows creates a new data provider and let listview know where to calculate row layout from.
 *
 * Customized: https://github.com/Flipkart/recyclerlistview/blob/master/src/core/dependencies/DataProvider.ts
 * It works when you fix recyclerlistview/dist/web/core/dependencies/DataProvider.d.ts
 * getAllData(): any[] => getAllData(): any[] | any;
 * cloneWithRows(newData: any[], ... => cloneWithRows(newData: any[] | any, ...
 * */

export abstract class GenericDataProvider<T, K = keyof T> extends BaseDataProvider{
  public rowHasChanged: (r1: T | any, r2: T | any) => boolean;

  // In JS context make sure stable id is a string
  public getStableId: (index: number) => string;
  protected m_firstIndexToProcess: number = 0;
  protected m_size: number = 0;
  protected m_data: K | any = List<T>([]);
  protected m_hasStableIds = false;
  protected m_requiresDataChangeHandling = false;

  constructor(rowHasChanged: (r1: T | any, r2: T | any) => boolean,
              getStableId?:  (index: number) => string) {
    super(rowHasChanged, getStableId);
    this.rowHasChanged = rowHasChanged;
    if (getStableId) {
      this.getStableId = getStableId;
      this.m_hasStableIds = true;
    } else {
      this.getStableId = (index) => index.toString();
    }
  }

  public abstract newInstance(
    rowHasChanged: (r1: T, r2: T) => boolean,
    getStableId?: (index: number) => string    ): GenericDataProvider<T, K>;
  public abstract getDataForIndex(index: number): T | undefined;
  public abstract cloneWithRows(newData: K | any,
                    firstModifiedIndex?: number): DataProvider;

  public getAllData(): K | any {
    return this.m_data;
  }

  public getSize(): number {
    return this.m_size;
  }

  public hasStableIds(): boolean {
    return this.m_hasStableIds;
  }

  public requiresDataChangeHandling(): boolean {
    return this.m_requiresDataChangeHandling;
  }

  public getFirstIndexToProcessInternal(): number {
    return this.m_firstIndexToProcess;
  }
}

// == RecyclerListView Dataprovider with IMMUTABLE.JS ==========================
export abstract class ListBaseDataProvider<T> extends GenericDataProvider<T, List<T>> {
  public abstract newInstance(
    rowHasChanged: (r1: T, r2: T) => boolean,
    getStableId?:  (index: number)     => string  ): ListBaseDataProvider<T>;

  public getDataForIndex(index: number): T | undefined {
    return this.m_data.get(index);
  }

  // Fast Matching Lists
  private getFirstIndexChange(newData: List<T>, newSize: number): number {
    if(this.m_data.equals(newData)) {
      return this.m_size;
    }

    if(this.m_size > newSize) {
      const sizeData = newData.setSize(this.m_size);
      return (this.m_data as List<T>)
        .findIndex((value, index) => this.rowHasChanged(value, sizeData.get(index)));
    } else {
      const sizeData = this.m_data.setSize(newSize);
      return (sizeData as List<T>)
        .findIndex((value, index) => this.rowHasChanged(value, newData.get(index)));
    }
  }

  //No need to override this one
  //If you already know the first row where rowHasChanged will be false pass it upfront to avoid loop
  public cloneWithRows(newData: List<T>, firstModifiedIndex?: number): DataProvider {
    const dp        = this.newInstance(this.rowHasChanged, this.getStableId);
    const newSize   = newData.size;

    dp.m_firstIndexToProcess = ObjectUtil.isNullOrUndefined(firstModifiedIndex)
                            ? this.getFirstIndexChange(newData, newSize)
                            : Math.max(Math.min(firstModifiedIndex, this.m_data.size), 0);

    if (dp.m_firstIndexToProcess !== this.m_data.size) {
      dp.m_requiresDataChangeHandling = true;
    }
    dp.m_data = newData;
    dp.m_size = newSize;
    return dp;
  }
}

export default class ListDataProvider<T> extends ListBaseDataProvider<T> {
  public newInstance(rowHasChanged: (r1: T, r2: T)  => boolean,
                     getStableId?: ((index: number) => string) | undefined): ListBaseDataProvider<T> {
                       return new ListDataProvider(rowHasChanged, getStableId);
                     }
}
