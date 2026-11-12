import {Observable} from "rxjs";
import { userStore } from "@open-dcp/services";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class ODCPRequestService {

  constructor(
    private readonly http: HttpClient
  ) {}

  getData(url: string): Observable<any> {
    return this.http.get(url, this.generateOptions()) as Observable<any> ;
  }

  private generateOptions() {
    const token = userStore.getState().token;
    if (!token) {
      console.error('Form generator token is missing')
    }
    return { headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })};
  }
}
