export async function saveList(pies: string[] ) {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (pies.length > 0) {
                resolve();
            } else {
                reject();
            }
        }, 1000);
    });
}