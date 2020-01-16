export class Claim {
    id :number;
    claimType: string;
    subject: string;
    content: string;
    date: Date;
    solution: string;
    status: string;
    reason : string;
    public Claim (subject:string,content:string,claimType:string){
        this.subject = subject;
        this.content = content;
        this.claimType = claimType;
    }
}