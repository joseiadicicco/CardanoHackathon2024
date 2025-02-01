
import { Schema, model, models } from 'mongoose';
import 'reflect-metadata';
import { MongoAppliedFor  } from 'smart-db';
import { BaseEntityMongo  } from 'smart-db/backEnd';
import { ProposalEntity } from './Proposal.Entity';

@MongoAppliedFor([ProposalEntity])
export class ProposalEntityMongo extends BaseEntityMongo  {
    protected static Entity = ProposalEntity;
    protected static _mongoTableName: string = ProposalEntity.className();

    // #region fields

    // actionId:String
    // txId:String
    // status:String
    // proposedIn:Int
    // expiresAfter:Int
    // dataHash:String
    // url:String
    // deposit:String

    // #endregion fields

    // #region internal class methods

    public getMongoStatic(): typeof ProposalEntityMongo {
        return this.constructor as typeof ProposalEntityMongo;
    }

    public static getMongoStatic(): typeof ProposalEntityMongo {
        return this as typeof ProposalEntityMongo;
    }

    public getStatic(): typeof ProposalEntity {
        return this.getMongoStatic().getStatic() as typeof ProposalEntity;
    }

    public static getStatic(): typeof ProposalEntity {
        return this.Entity as typeof ProposalEntity;
    }

    public className(): string {
        return this.getStatic().className();
    }

    public static className(): string {
        return this.getStatic().className();
    }

    // #endregion internal class methods

    // #region mongo db

    public static MongoModel() {
        interface Interface {
            actionId: string;
            txId: string;
            status: string;
            proposedIn: number;
            expiresAfter: number;
            dataHash: string;
            url: string;
            deposit: string;
        }

        const schema = new Schema<Interface>({
            actionId: { type: String, required: true },
            txId: { type: String, required: true },
            status: { type: String, required: false },
            proposedIn: { type: Number, required: true },
            expiresAfter: { type: Number, required: true },
            dataHash: { type: String, required: true },
            url: { type: String, required: true },
            deposit: { type: String, required: true },
        });

        const ModelDB = models[this._mongoTableName] || model<Interface>(this._mongoTableName, schema);
        return ModelDB;
    }

    // #endregion mongo db
}

