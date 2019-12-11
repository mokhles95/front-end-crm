import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseUrl = 'http://localhost:9080/PIDEVS-web/rest/';

    constructor(private https: HttpClient) {
    }

    /*-----------------------------
      Generic methods
    -----------------------------*/

    get(endpoint) {
        return this.https.get<any>(`${this.baseUrl}${endpoint}`, {headers: headers});
    }

    asyncGet(endpoint: string) {
        return this.https.get<any>(`${this.baseUrl}${endpoint}`);
    }

    post(endpoint: string, body: {}) {
        return this.https.post<any>(`${this.baseUrl}${endpoint}`, body);
    }

    delete(endpoint: string) {
        return this.https.delete(`${this.baseUrl}${endpoint}`);
    }

    // put method
    put(endpoint: string, body = {}) {
        return this.https.put(`${this.baseUrl}${endpoint}`, body);
    }
}
