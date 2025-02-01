
import { Schema, model, models } from 'mongoose';
import 'reflect-metadata';
import { MongoAppliedFor  } from 'smart-db';
import { BaseEntityMongo  } from 'smart-db/backEnd';
import { VoteEntity } from './Vote.Entity';

@MongoAppliedFor([VoteEntity])
export class VoteEntityMongo extends BaseEntityMongo  {
    protected static Entity = VoteEntity;
    protected static _mongoTableName: string = VoteEntity.className();

    // #region fields

    // propursalId:ID
    // address:String

    // #endregion fields

    // #region internal class methods

    public getMongoStatic(): typeof VoteEntityMongo {
        return this.constructor as typeof VoteEntityMongo;
    }

    public static getMongoStatic(): typeof VoteEntityMongo {
        return this as typeof VoteEntityMongo;
    }

    public getStatic(): typeof VoteEntity {
        return this.getMongoStatic().getStatic() as typeof VoteEntity;
    }

    public static getStatic(): typeof VoteEntity {
        return this.Entity as typeof VoteEntity;
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
            propursalId: string;
            address: string;
        }

        const schema = new Schema<Interface>({
            propursalId: { type: String, required: true },
            address: { type: String, required: true },
        });

        const ModelDB = models[this._mongoTableName] || model<Interface>(this._mongoTableName, schema);
        return ModelDB;
    }

    // #endregion mongo db
}

