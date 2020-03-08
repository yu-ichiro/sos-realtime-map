export interface Place {
    name: string,
    x: number,
    y: number
}

const MyRanch: Place = {
    name: "牧場",
    x: 385,
    y: 405
};

const ChickenRanch: Place = {
    name: "にわとりりあ",
    x: 548,
    y: 342
};

const Smith: Place = {
    name: "鍛冶屋サイバラ",
    x: 425,
    y: 275
};

const Store: Place = {
    name: "ザッカ屋",
    x: 573,
    y: 80
};

export {
    MyRanch,
    ChickenRanch,
    Store,
    Smith
};

export const all = [
    MyRanch,
    ChickenRanch,
    Store,
    Smith
];