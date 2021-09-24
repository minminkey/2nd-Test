import { getStart, getLocations, getTrucks, putSimulate, getScore } from "./RESTApi.js";
import { setTruck, init, setMap } from "./Setting.js";

const auth_key = await getStart(1);

let map = [];
let truck = [];
let location = [];
let dr = [-1, 0, 1, 0];
let dc = [0, 1, 0, -1];
let go = [];
let fuck = 0;

for(let i=0; i<5; i++){
    let tmp = [];
    for(let j=0; j<5; j++){
        tmp.push(0);
    }
    go.push(tmp);
}


init(map, truck, 5, 5);

let truckInfo = await getTrucks(auth_key);
setTruck(truck, truckInfo);
console.log(truck);

let order = [];
for(let i=1; i<5; i++){
    let obj = {};
    obj["truck_id"] = i;
    let com = [];
    for(let j=0; j<i; j++){
        com.push(2);
    }
    obj["command"] = com;
    order.push(obj);
}

const res = await putSimulate(auth_key, order);
let fail = 0;
// console.log(await getLocations(auth_key));

while(1){
    let locationInfo = await getLocations(auth_key);
    setMap(map, locationInfo);
    let orderList = [];
    for(let i=0; i<5; i++){
        let r = truck[i].r;
        let c = truck[i].c;
        let d = truck[i].d;
        let cnt = truck[i].cnt;
        let bick = truck[i].bick;
        let orderCnt = 0;
        let order = [];
        let result = {};
        while(orderCnt<10){
            if((orderCnt+cnt)%7 === 0){
                d = (d+1)%4;
            }
            let nr = r + dr[d];
            let nc = c + dc[d];
            if(nr<0||nc<0||nr>=5||nc>=5){
                d = (d+2)%4;
                continue;
            }
            if(map[r][c]>3){
                let want = map[r][c] - 4;
                while(want!==0&&orderCnt<10&&bick<20){
                    want--;
                    orderCnt++;
                    bick++;
                    order.push(5);
                    map[r][c]--;
                }
            }
            else if(map[r][c]<2){
                let want = 4 - map[r][c];
                while(want!==0&&orderCnt<10&&bick>0){
                    want--;
                    orderCnt++;
                    bick--;
                    order.push(6);
                    map[r][c]++;
                }
            }
            if(orderCnt>=10)    break;
            r = nr;
            c = nc;
            go[r][c]++;
            order.push(d+1);
            orderCnt++;
        }
        truck[i].cnt = cnt+orderCnt;
        truck[i].d = d;
        truck[i].r = r;
        truck[i].c = c;
        truck[i].bick = bick;
        result["truck_id"] = i;
        result["command"] = order;
        orderList.push(result);
    }
    const status = await putSimulate(auth_key, orderList);
    console.log(status, fuck);
    fuck++;
    if(status.status == "finished"){
        console.log(await getScore(auth_key));
        break;
    }
}
console.log(go);