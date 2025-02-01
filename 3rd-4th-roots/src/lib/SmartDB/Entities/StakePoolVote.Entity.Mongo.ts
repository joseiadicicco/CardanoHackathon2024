
import { Schema, model, models } from 'mongoose';
import 'reflect-metadata';
import { MongoAppliedFor  } from 'smart-db';
import { BaseEntityMongo  } from 'smart-db/backEnd';
import { StakePoolVoteEntity } from './StakePoolVote.Entity';

@MongoAppliedFor([StakePoolVoteEntity])
export class StakePoolVoteEntityMongo extends BaseEntityMongo  {
    protected static Entity = StakePoolVoteEntity;
    protected static _mongoTableName: string = StakePoolVoteEntity.className();

    // #region fields

    // proposalActionId:String
    // poolId:String
    // vote:String
    // dataHash:String
    // url:String

    // #endregion fields

    // #region internal class methods

    public getMongoStatic(): typeof StakePoolVoteEntityMongo {
        return this.constructor as typeof StakePoolVoteEntityMongo;
    }

    public static getMongoStatic(): typeof StakePoolVoteEntityMongo {
        return this as typeof StakePoolVoteEntityMongo;
    }

    public getStatic(): typeof StakePoolVoteEntity {
        return this.getMongoStatic().getStatic() as typeof StakePoolVoteEntity;
    }

    public static getStatic(): typeof StakePoolVoteEntity {
        return this.Entity as typeof StakePoolVoteEntity;
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
            poolId: string;
            vote: string;
            dataHash: string;
            url: string;
        }

        const schema = new Schema<Interface>({
            proposalActionId: { type: String, required: true },
            poolId: { type: String, required: true },
            vote: { type: String, required: true },
            dataHash: { type: String, required: false },
            url: { type: String, required: false },
        });

        const ModelDB = models[this._mongoTableName] || model<Interface>(this._mongoTableName, schema);
        return ModelDB;
    }

    // #endregion mongo db
}

