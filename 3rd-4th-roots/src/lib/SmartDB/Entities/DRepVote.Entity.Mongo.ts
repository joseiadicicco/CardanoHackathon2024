
import { Schema, model, models } from 'mongoose';
import 'reflect-metadata';
import { MongoAppliedFor  } from 'smart-db';
import { BaseEntityMongo  } from 'smart-db/backEnd';
import { DRepVoteEntity } from './DRepVote.Entity';

@MongoAppliedFor([DRepVoteEntity])
export class DRepVoteEntityMongo extends BaseEntityMongo  {
    protected static Entity = DRepVoteEntity;
    protected static _mongoTableName: string = DRepVoteEntity.className();

    // #region fields

    // proposalActionId:String
    // keyHash:String
    // vote:String
    // dataHash:String
    // url:String

    // #endregion fields

    // #region internal class methods

    public getMongoStatic(): typeof DRepVoteEntityMongo {
        return this.constructor as typeof DRepVoteEntityMongo;
    }

    public static getMongoStatic(): typeof DRepVoteEntityMongo {
        return this as typeof DRepVoteEntityMongo;
    }

    public getStatic(): typeof DRepVoteEntity {
        return this.getMongoStatic().getStatic() as typeof DRepVoteEntity;
    }

    public static getStatic(): typeof DRepVoteEntity {
        return this.Entity as typeof DRepVoteEntity;
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
            keyHash: string;
            vote: string;
            dataHash: string;
            url: string;
        }

        const schema = new Schema<Interface>({
            proposalActionId: { type: String, required: true },
            keyHash: { type: String, required: true },
            vote: { type: String, required: true },
            dataHash: { type: String, required: false },
            url: { type: String, required: false },
        });

        const ModelDB = models[this._mongoTableName] || model<Interface>(this._mongoTableName, schema);
        return ModelDB;
    }

    // #endregion mongo db
}

