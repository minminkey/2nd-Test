import { getStart, getOnCalls, postAction } from "./RESTApi.js";

const height = 5;    //건물 높이
const N = 4;        //elevator 수
const M = 6;        //Call의 수
const maxNum = 8;   //엘리베이터 최대 수용인원

let elevator = [];
let calls = [];
let time = 0;

const auth_token = await getStart(0, 4);

for(let i=0; i<N; i++){
    let Elevator = {
        id: i,
        status: "STOP",
        go: 0,             //-1이면 내려가는중, 0이면 정지, 1이면올라가는 중
        floor: 1,
        last: 1,
        finish: 0,
        passengers: []
    };
    elevator.push(Elevator);
}

for(let i=0; i<M; i++){
    let Call = {
        id: i,
        start: -1,
        end: -1,
        live: 1,
    };
    calls.push(Call);
}
let cnt = 20;
while(cnt--){
    let layer = [];
    let commands = [];
    for(let i=0; i<=height; i++){
        layer.push([]);
    }

    const nowInfo = await getOnCalls(auth_token);
    const callInfo = nowInfo.calls;
    const elevatorInfo = nowInfo.elevators;
    console.log(nowInfo);
    //상태 최신화
    callInfo.forEach(info => {
        let id = info.id;
        calls[id].start = info.start;
        calls[id].end = info.end;
        layer[info.start].push(calls[id]);
    });
    
    elevatorInfo.forEach(info => {
        let id = info.id;
        elevator[id].floor = info.floor;
        elevator[id].passengers = info.passengers;
        elevator[id].status = info.status;
    })
    console.log(elevator);
    
    let tmp = layer.slice();
    for(let i=0; i<N; i++){
        let com = {
            elevator_id: i,
            command: "STOP"
        };
        let now = elevator[i].floor;
        if(elevator[i].go === 0){
            let foo = 0;
            while((now-foo>0)||(now+foo<=height)){
                let up = now+foo;
                let down = now-foo;
                if(up===now&&tmp[up].length>0){
                    com.command = "OPEN";
                    elevator[i].go = 1;
                    tmp[up].shift();
                    break;
                }
                if(up<=height&&tmp[up].length>0){
                    elevator[i].last = up;
                    elevator[i].go = 1;
                    com.command = "UP";
                    tmp[up].shift();
                    break;
                }
                if(down>0&&tmp[down].length>0){
                    elevator[i].last = down;
                    elevator[i].go = -1;
                    com.command = "DOWN";
                    tmp[down].shift();
                    break;
                }
                foo++;
            }
            commands.push(com);
            continue;
        }
        if(elevator[i].status === "STOPPED"){
            let flag = 0;
            let flag2 = 0;
            if(elevator[i].passengers.length<maxNum){
                for(let k=0; k<layer[now].length; k++){
                    if(elevator[i].status === "UPWARD"&&layer[now][k].end>floor){
                        elevator[i].finish = 1;
                        flag2 = 1;
                        break;
                    }
                    else if(elevator[i].status === "DOWNWARD"&&layer[now][k].end<floor){
                        elevator[i].finish = 1;
                        flag2 = 1;
                        break;
                    }
                }
            }
            elevator[i].passengers.forEach(p=>{
                if(p.end === now){
                    elevator[i].finish = 2;
                    flag = 1;
                }
            });
            if(flag === 1 || flag2 === 1){
                com.command = "OPEN";
            }
            else{
                if(now === elevator[i].last){
                    elevator[i].go = 0;
                    com.command = "STOP";
                }
                else if(now < elevator[i].last){
                    com.command = "UP";
                }
                else if(now > elevator[i].last){
                    com.command = "DOWN";
                }
            }
        }
        else if(elevator[i].status === "UPWARD"||elevator[i].status === "DOWNWARD"){
            let flag = 0;
            let flag2 = 0;
            if(elevator[i].last === now){
                com.command = "STOP";
                elevator[i].go = 0;
                commands.push(com);
                continue;
            }
            if(elevator[i].passengers.length<maxNum){
                for(let k=0; k<layer[now].length; k++){
                    if(elevator[i].status === "UPWARD"&&layer[now][k].end>now){
                        elevator[i].finish = 1;
                        flag2 = 1;
                        break;
                    }
                    else if(elevator[i].status === "DOWNWARD"&&layer[now][k].end<now){
                        elevator[i].finish = 1;
                        flag2 = 1;
                        break;
                    }
                }
            }
            elevator[i].passengers.forEach(p=>{
                if(p.end === now){
                    elevator[i].finish = 2;
                    flag = 1;
                }
            });
            if(flag === 1 || flag2 === 1){
                com.command = "STOP";
            }
            else{
                if(elevator[i].status === "UPWARD"){
                    com.command = "UP";
                }
                else{
                    com.command = "DOWN";
                }
            }

        }
        else if(elevator[i].status === "OPENED"){
            let flag = 0;
            let flag2 = 0;
            for(let k=0; k<elevator[i].passengers.length; k++){
                let id = elevator[i].passengers[k].id;
                if(calls[id].end === now){
                    com.command = "EXIT";
                    if(com["call_ids"] === undefined){
                        com["call_ids"] = [];
                    }
                    com["call_ids"].push(id);
                    flag = 1;
                    
                }
            }
            
            if(flag === 1){
                commands.push(com);
                continue;
            }
            if(elevator[i].passengers.length<maxNum){
                for(let k=0; k<layer[now].length; k++){
                    let id = layer[now][k].id;
                    if(calls[id].live === 0)    continue;
                    if(elevator[i].go === 1&&calls[id].end>now){
                        com.command = "ENTER";
                        if(com["call_ids"] === undefined){
                            com["call_ids"] = [];
                        }
                        com["call_ids"].push(id);
                        elevator[i].passengers.push(calls[id]);
                        calls[id].live = 0;
                        flag2 = 1;
                        if(elevator[i].passengers.length>=maxNum){
                            break;
                        }
                    }
                    else if(elevator[i].go === -1&&calls[id].end<now){
                        com.command = "ENTER";
                        if(com["call_ids"] === undefined){
                            com["call_ids"] = [];
                        }
                        com["call_ids"].push(id);
                        elevator[i].passengers.push(calls[id]);
                        calls[id].live = 0;
                        flag2 = 1;
                        if(elevator[i].passengers.length>=maxNum){
                            break;
                        }
                    }
                }
            }
            if(flag2 === 1){
                commands.push(com);
                continue;
            }
            com.command = "CLOSE";
        }
        commands.push(com);
    }
    console.log(commands);
    const is_end = await postAction(auth_token, commands);
    if(is_end)  break;
}
