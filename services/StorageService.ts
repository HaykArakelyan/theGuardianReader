import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SingleNewsModel } from '../Models/SingleNewsModel';

export class StorageService {
    public static save(singleNews: SingleNewsModel): Promise<void> {
        return AsyncStorage.setItem(singleNews.id, JSON.stringify(singleNews))
            .then(() => console.log('Item saved'))
            .catch(err => console.log('Error saving item:', err));
    }

    public static get(singleNewsId: string): Promise<SingleNewsModel | null> {
        return AsyncStorage.getItem(singleNewsId)
            .then(singleNews => {
                if (singleNews) {
                    return JSON.parse(singleNews);
                }
                return null;
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }

    public static delete(singleNewsId: string): Promise<void> {
        return AsyncStorage.removeItem(singleNewsId)
            .then(() => console.log('Item deleted'))
            .catch(err => console.log(err));
    }

    public static isSaved(singleNewsId: string): Promise<boolean> {
        return AsyncStorage.getAllKeys()
            .then(keys => Array.from(keys).includes(singleNewsId))
            .catch(err => {
                console.log(err);
                return false;
            });
    }

    public static empty(): Promise<void> {
        return AsyncStorage.clear()
            .then(() => console.log("Storage Cleared"))
            .catch(err => console.log(err))
    }

    public static getKeys(): Promise<string[]> {
        return AsyncStorage.getAllKeys()
            .then(keys => Array.from(keys))
            .catch(err => {
                console.log(err);
                return [];
            })
    }
}