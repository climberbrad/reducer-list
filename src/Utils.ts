export async function saveList(items: string[] ) {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (items.length > 0) {
                resolve();
            } else {
                reject();
            }
        }, 1000);
    });
}