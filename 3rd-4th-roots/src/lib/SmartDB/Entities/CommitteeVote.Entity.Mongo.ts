
import { Schema, model, models } from 'mongoose';
import 'reflect-metadata';
import { MongoAppliedFor  } from 'smart-db';
import { BaseEntityMongo  } from 'smart-db/backEnd';
import { CommitteeVoteEntity } from './CommitteeVote.Entity';

@MongoAppliedFor([CommitteeVoteEntity])
export class CommitteeVoteEntityMongo extends BaseEntityMongo  {
    protected static Entity = CommitteeVoteEntity;
    protected static _mongoTableName: string = CommitteeVoteEntity.className();

    // #region fields

    // proposalActionId:String
    // scriptHash:String
    // vote:String
    // dataHash:String
    // url:String

    // #endregion fields

    // #region internal class methods

    public getMongoStatic(): typeof CommitteeVoteEntityMongo {
        return this.constructor as typeof CommitteeVoteEntityMongo;
    }

    public static getMongoStatic(): typeof CommitteeVoteEntityMongo {
        return this as typeof CommitteeVoteEntityMongo;
    }

    public getStatic(): typeof CommitteeVoteEntity {
        return this.getMongoStatic().getStatic() as typeof CommitteeVoteEntity;
    }

    public static getStatic(): typeof CommitteeVoteEntity {
        return this.Entity as typeof CommitteeVoteEntity;
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
            proposalActionId: string;
            scriptHash: string;
            vote: string;
            dataHash: string;
            url: string;
        }

        const schema = new Schema<Interface>({
            proposalActionId: { type: String, required: true },
            scriptHash: { type: String, required: true },
            vote: { type: String, required: true },
            dataHash: { type: String, required: false },
            url: { type: String, required: false },
        });

        const ModelDB = models[this._mongoTableName] || model<Interface>(this._mongoTableName, schema);
        return ModelDB;
    }

    // #endregion mongo db
}

