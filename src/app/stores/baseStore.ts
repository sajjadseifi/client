import { RootStore } from "./rootStore";

export default abstract class BaseStore{
    constructor(public rootStore: RootStore) { 
    }

}