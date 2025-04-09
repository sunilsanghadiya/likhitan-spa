import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService<T> {
  private dataSubject!: BehaviorSubject<T | null>; // Lazy initialization
  data$!: Observable<T | null>; // Exposed Observable

  constructor() {}

  /**
   * Initializes the data store with a default value.
   * This must be called before using the store.
   * @param initialValue Default value of type T
   */
  initialize(initialValue: T | null = null) {
    this.dataSubject = new BehaviorSubject<T | null>(initialValue);
    this.data$ = this.dataSubject.asObservable();
  }

  /**
   * Updates the stored data.
   * @param data Updated data of type T
   */
  setData(data: T) {
    if (!this.dataSubject) {
      throw new Error('DataStoreService is not initialized. Call initialize() first.');
    }
    this.dataSubject.next(data);
  }

  /**
   * Retrieves the latest stored data.
   * @returns The current value of type T
   */
  getData(): T | null {
    if (!this.dataSubject) {
      throw new Error('DataStoreService is not initialized. Call initialize() first.');
    }
    return this.dataSubject.getValue();
  }

  /**
   * Clears the stored data (sets it to null).
   */
  clearData() {
    if (!this.dataSubject) {
      throw new Error('DataStoreService is not initialized. Call initialize() first.');
    }
    this.dataSubject.next(null);
  }
}
