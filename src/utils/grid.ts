import { Cat } from "../models/cats";

const shuffleForwards = (cats: Cat[], fromIndex: number, toIndex: number) => {
    return cats.map((cat, index) => {
        if(index < fromIndex && index >= toIndex) {
            return {...cat, position: cat.position + 1};
        }
        if(index === fromIndex) {
            return {...cat, position: cats[toIndex].position}
        }
        return cat;
    });
};

const shuffleBackwards = (cats: Cat[], fromIndex: number, toIndex: number) => {
    return cats.map((cat, index) => {
        if(index > fromIndex && index <= toIndex) {
            return {...cat, position: cat.position - 1};
        }
        if(index === fromIndex) {
            return {...cat, position: cats[toIndex].position}
        }
        return cat;
    });

};

export const reArrangeGrid = (cats: Cat[], draggedCat: Cat, catDroppedOn: Cat) => {
	let fromIndex = Number(draggedCat.position  - 1);
	let toIndex = Number(catDroppedOn.position - 1);
    if(fromIndex > toIndex) {
        return shuffleForwards(cats, fromIndex, toIndex);
	} else {
        return shuffleBackwards(cats, fromIndex, toIndex);
    }
};