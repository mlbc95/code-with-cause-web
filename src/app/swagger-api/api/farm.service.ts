/**
 * CodeWithCause-Node Express
 * CodeWithCause-NodeExpress Documentation
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { IFarmVm } from '../model/iFarmVm';
import { INewFarmParams } from '../model/iNewFarmParams';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class FarmService {

    protected basePath = 'https://localhost/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteById(id: string, observe?: 'body', reportProgress?: boolean): Observable<Array<IFarmVm>>;
    public deleteById(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<IFarmVm>>>;
    public deleteById(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<IFarmVm>>>;
    public deleteById(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<Array<IFarmVm>>(`${this.basePath}/farms/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAll(observe?: 'body', reportProgress?: boolean): Observable<Array<IFarmVm>>;
    public getAll(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<IFarmVm>>>;
    public getAll(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<IFarmVm>>>;
    public getAll(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<IFarmVm>>(`${this.basePath}/farms/getAll`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param newFarmParams 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registerFarm(newFarmParams: INewFarmParams, observe?: 'body', reportProgress?: boolean): Observable<IFarmVm>;
    public registerFarm(newFarmParams: INewFarmParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IFarmVm>>;
    public registerFarm(newFarmParams: INewFarmParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IFarmVm>>;
    public registerFarm(newFarmParams: INewFarmParams, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (newFarmParams === null || newFarmParams === undefined) {
            throw new Error('Required parameter newFarmParams was null or undefined when calling registerFarm.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<IFarmVm>(`${this.basePath}/farms/create`,
            newFarmParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param newFarmParams 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateById(id: string, newFarmParams: INewFarmParams, observe?: 'body', reportProgress?: boolean): Observable<IFarmVm>;
    public updateById(id: string, newFarmParams: INewFarmParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IFarmVm>>;
    public updateById(id: string, newFarmParams: INewFarmParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IFarmVm>>;
    public updateById(id: string, newFarmParams: INewFarmParams, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateById.');
        }
        if (newFarmParams === null || newFarmParams === undefined) {
            throw new Error('Required parameter newFarmParams was null or undefined when calling updateById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<IFarmVm>(`${this.basePath}/farms/${encodeURIComponent(String(id))}`,
            newFarmParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
