import * as signalR from "@aspnet/signalr"


export class MySignalR {
    constructor() {
    }

    //通信Url
    public url: string = "";
    //发送函数字段
    public onMap: { [key: string]: (...args: any[]) => void } = {}


    //连接对象
    public hubConnectionBuilder: any = null;

    //消息发送
    public send(methodName: string, ...args: any[]): Promise<void> {
        if (this.hubConnectionBuilder != null)
            return this.hubConnectionBuilder.send(methodName, ...args);
        return new Promise(function (resolve, reject) {
            reject("当前连接对象Connection为null");
        });

    }
    //消息接收注册
    public on(methodName: string, newMethod: (...args: any[]) => void) :void {
        this.onMap[methodName] = newMethod
    }
    //开始
    public start(): Promise<any> {
        this.hubConnectionBuilder = new signalR.HubConnectionBuilder()
            .withUrl(this.url)
            .build();
        this.hubConnectionBuilder.start().then((data: any) => {
            //函数渲染
            {
                //接收函数
                {
                    for (let om in this.onMap) {
                        this.hubConnectionBuilder.on(om, this.onMap[om])
                    }

                }

            }
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
        }).catch((err: string) => {
            return new Promise(function (resolve, reject) {
                resolve(err);
            });
        });
        return new Promise(function (resolve, reject) {
            resolve("");
        });
    }
}