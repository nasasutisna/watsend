import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseCheckVersionDto, ResponseDataDto } from './instant-wa-api.dto';

@Injectable({
  providedIn: 'root'
})
export class InstantWaApiService {
  private readonly baseApi = 'https://panman.my.id/tiludep-server/api/instantWa';
  constructor(
    private http: HttpClient
  ) { }

  checkVersion(body: any) {
    return this.http.post<ResponseDataDto<ResponseCheckVersionDto>>
      (`${this.baseApi}/checkVersion`, body).toPromise();
  }
}
