import { DatabaseListen } from './bootstrap';
export default class DatabaseBootstrap extends DatabaseListen{
    listen(): void {
        throw new Error("Method not implemented.");
    }
    initialize(): Promise<boolean | Error> {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve(true)
                console.log("connected to database")
            }, 2000);
        })
    }
}