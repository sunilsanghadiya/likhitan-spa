import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatesService {
    
  private dataSubject = new BehaviorSubject<any>(null);

  public data$ = this.dataSubject.asObservable();

  setData(newValue: any): void {
    this.dataSubject.next(newValue);
  }

  getCurrentValue(): any {
    return this.dataSubject.getValue();
  }
}