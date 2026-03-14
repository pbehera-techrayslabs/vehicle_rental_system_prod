export function getData(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}
export function saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function addItem(key: string, item: any) {
    const data = getData(key);
    data.push(item);
    saveData(key, data);
}
export function deleteItem(key: string, id: number) {
    let data = getData(key);
    data = data.filter((item: any) => item.id !== id);
    saveData(key, data);
}
export function updateItem(key: string, updatedItem: any) {
    let data = getData(key);
    data = data.map((item: any) =>
        item.id === updatedItem.id ? updatedItem : item
    );
    saveData(key, data);
}