import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) { }

  generateReportShelves() {
    return this.http.get(`${environment.api}/admin/shelvesReport`);
  }
  extractData(rawData: any) {
    console.log(rawData);
    let totalFree = 0;
    let totalUsed = 0;
    let totalFull = 0;
    let floorReport = [];
    let floortemp = {};
    let floorData = rawData['floor'];
    for (var key in floorData) {
      totalFree += Object.keys(floorData[key]['Free']).length;
      totalUsed += Object.keys(floorData[key]['Used']).length;
      totalFull += Object.keys(floorData[key]['Full']).length;

      let free = Object.keys(floorData[key]['Free']).length;
      let used = Object.keys(floorData[key]['Used']).length;
      let full = Object.keys(floorData[key]['Full']).length;
      let obj = {}
      obj['Free'] = free;
      obj['Used'] = used;
      obj['Full'] = full;
      obj['Floor'] = key;
      floorReport.push(obj)
      let arrFree=[];
      let arrUsed=[];
      let arrFull=[];
      for(var i=0; i<floorData[key]['Free'].length; i++){
        arrFree.push({'shelfId': floorData[key]['Free'][i], 'status':0})
      }
      for(var key2 in floorData[key]['Used']){
        arrUsed.push({'shelfId': key2, 'status':1})
      }
      for(var key2 in floorData[key]['Full']){
        arrFull.push({'shelfId': key2, 'status':2})
      }
      let objTemp={'free':arrFree, 'used':arrUsed, 'full': arrFull}
      floortemp[key]=objTemp;
    }
    console.log(floortemp);
    let unitData = rawData['unit'];
    let unitReport=[];
    let unitTemp = {};
    for(var key in unitData){
      let unit=[];
      let name=unitData[key]['unitName'];
      let free=0;
      let used=0;
      let full=0;
      let arrFree=[];
      let arrUsed=[];
      let arrFull=[];
      //1 unit can stand in some floor
      let floors=unitData[key]['floor'];
      for(var key1 in floors){
        let floor=floors[key1]['floor']
        free+=Object.keys(floortemp[floor]['free']).length;
        used+=Object.keys(floortemp[floor]['used']).length;
        full+=Object.keys(floortemp[floor]['full']).length;
        arrFree=arrFree.concat(floortemp[floor]['free']);
        arrUsed=arrUsed.concat(floortemp[floor]['used']);
        arrFull=arrFull.concat(floortemp[floor]['full']);
      }
      let freeDraw=(free/(free+used+full)*100)+'%';
      let usedDraw=(used/(free+used+full)*100)+'%';
      let fullDraw=(full/(free+used+full)*100)+'%';
      let unitId=unitData[key]['unitId']
      unitReport.push({'unit':name, 'free': free, 'used': used, 'full': full,'freeDraw':freeDraw,'usedDraw':usedDraw,'fullDraw':fullDraw,'unitId':unitId})
      unitTemp[unitId]={'free':arrFree, 'used':arrUsed, 'full': arrFull}
    }
    return ({ 'totalFree': totalFree, 'totalUsed': totalUsed, 'totalFull': totalFull, 'floorReport': floorReport , 'floorTemp' : floortemp, 'unitReport': unitReport, 'unitTemp':unitTemp} )
  }
}

