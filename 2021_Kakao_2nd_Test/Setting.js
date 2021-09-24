let location = [];

export const init = (map, truck, n, m) => {
    for(let i=0; i<n; i++){
        let Truck = {
            r: 0,
            c: 0,
            id: 0,
            d: 0,
            cnt: 0,
            bick: 0,
        };
        truck.push(Truck);
    }
    for(let i=0; i<m; i++){
        map.push(new Array(m).fill(0));
    }
    for(let j=0; j<m; j++){
        for(let i=m-1; i>=0; i--){
            let info = {r:i, c:j};
            location.push(info);
        }
    }
}

export const setTruck = (truck, truckInfo) =>{
    truckInfo.forEach(info => {
        let id = info.id;
        let bick = info.loaded_bikes_count;
        let l_id = info.location_id;
        truck[id].id = id;
        truck[id].bick = bick;
        truck[id].r = location[l_id].r;
        truck[id].c = location[l_id].c;
    });
}

export const setMap = (map, locationInfo) => {
    locationInfo.forEach(info => {
        let id = info.id;
        let r = location[id].r;
        let c = location[id].c;
        map[r][c] = info.located_bikes_count;
    })
}