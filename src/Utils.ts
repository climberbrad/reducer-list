import { ListItem } from './ListReducer';

export async function saveList(items: ListItem[] ) {

    // throw an error if nothing is selected
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (items.filter((item) => item.selected).length > 0) {
                resolve();
            } else {
                reject();
            }
        }, 1000);
    });
}