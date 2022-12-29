import * as readline from "readline"

async function prompt_s(msg: string): Promise<string>{
    const read = readline.createInterface({input: process.stdin, output: process.stdout});
    return await new Promise<string>((resolve) =>{
        read.question(msg, (ans)=>{
            resolve(ans)
            read.close();
        })
    })
}

async function  main(){
    const keta: number = parseInt(await prompt_s("桁数を入力してください: "));
    if(keta>10||keta<1){
        console.log("桁数は1-10のみ可能です");
        return;
    }
    let ans = "";

    //答えの生成
    let num: string[] = ["0","1","2","3","4","5","6","7","8","9"];
    for(let i:number =0;i<keta;i++){
        let r:number = Math.floor(Math.random() * (10-i));
        ans = ans+ num[r];
        num[r] = num[9-i];
    }
    console.log("答(デバック用):"+ans);

    let cnt: number = 1;
    while(true){
        const get:string = await prompt_s("答えを入力してください: ");
        if(ans == get){
            console.log("正解！　試行回数: "+cnt);
            break;
        }
        let hit:number , blow:number;
        hit = blow = 0;
        for(let i:number = 0;i<keta;i++){
            if(ans.charAt(i)==get.charAt(i))hit++;
            else if(ans.indexOf(get.charAt(i)) > -1)blow++;
        }
        console.log(hit+"Hit, "+blow+"Blow");
        cnt++;
    }
}
    
main()
