import {getStart, getWaiting, getGameResult, getUserInfo, putMatch, putChange, getScore} from "./RESTApi.js";


const NUM = 900;

const user = [];
// const Bad
let turn = 0;

const auth_key = await getStart(2);

for(let i=0; i<=NUM; i++){
    let User = {
        id: i,
        grade: 5000,
        from: 0,
        game: 0,
        lose: 0,
    }
    user.push(User);
}

while(1){
    let waitingInfo = await getWaiting(auth_key);
    let resultInfo = await getGameResult(auth_key);
    let waiting = [];
    let changed = [];
    let pairs = [];
    let commands = [];
    // 점수 Change
    resultInfo.forEach(info => {
        let win = info.win;
        let lose = info.lose;
        let plus = Math.floor((40-info.taken))+50;
        user[win].grade += plus;
        user[lose].grade -= plus;
        // 어뷰져 처리
        user[win].game++;
        user[lose].game++;
        user[lose].lose++;
        if(user[win].grade-user[lose].grade<750){
            if(info.taken<=10){
                user[win].grade -= plus*2;
                user[lose].grade += plus*2;
            }
        }

        changed.push(win);
        changed.push(lose);
    });
    changed.forEach(id => {
        let obj = {
            id: id,
            grade: user[id].grade
        }
        commands.push(obj);
    });
    let status = await putChange(auth_key, commands);

    //Match
    waitingInfo.forEach(info => {
        let id = info.id;
        let from = info.from;
        user[id].from = from;
        waiting.push(id);
    })
    waiting.sort((a,b) => {
        return user[a].grade - user[b].grade;
    })
    for(let i=0; i<waiting.length; i++){
        if(i+1<waiting.length){
            let f = waiting[i];
            let s = waiting[i+1];
            if(Math.abs(user[f].grade-user[s].grade)>1250)  continue;
            pairs.push([waiting[i], waiting[i+1]]);
            i++;
        }
    }
    let matchInfo = await putMatch(auth_key, pairs);
    turn = matchInfo.time;
    console.log(matchInfo);
    if(matchInfo.status === "finished") break;
}
console.log(user.sort((a,b)=>{
    return a.grade-b.grade;
}));
console.log(user.slice(800));
const score = await getScore(auth_key);
console.log(score);