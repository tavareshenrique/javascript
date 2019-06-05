import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif } from '../model/gif';

@Injectable({ providedIn: 'root' })

export class GifSearchService {
    private apiKey: string = "MeGG5sG2LWbeS2S6FhMHEBByZ51gsRie";
    private shortUrl: string = "//api.giphy.com/v1/gifs/search?q=";
    public limitPatter: string = "^-?[0-9]\\d*(\\.\\d{1,2})?$";
    public termPatter: string = "^[a-zA-Z0-9]*$";

    constructor(private http: HttpClient) {

    }

    getUrl(term: string, limit: number): string {
        return this.shortUrl + term + "&api_key=" +  this.apiKey + "&limit=" + limit;
    }

    getApiKey(): string {
        return this.apiKey;
    }

    searchGif(term: string, limit: number): any {
        let url:string = this.getUrl(term, limit);
        return  this.http.get<Gif[]>(`${url}/`);
    }

    async formate(term: string, limit: number) {
        let gifs = [];
    
        let response = await this.searchGif(term, limit)
        .toPromise()
        .catch(error => console.log(error));
    
        response = response.data;
    
        response.forEach(gif => {
          gifs.push(gif);
        });

        return gifs;
      }
}