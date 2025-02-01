
import { Schema, model, models } from 'mongoose';
import 'reflect-metadata';
import { MongoAppliedFor  } from 'smart-db';
import { BaseEntityMongo  } from 'smart-db/backEnd';
import { CommitteeEntity } from './Committee.Entity';

@MongoAppliedFor([CommitteeEntity])
export class CommitteeEntityMongo extends BaseEntityMongo  {
    protected static Entity = CommitteeEntity;
    protected static _mongoTableName: string = CommitteeEntity.className();

    // #region fields

    // scriptHash:String
    // revelance:Int

    // #endregion fields

    // #region internal class methods

    public getMongoStatic(): typeof CommitteeEntityMongo {
        return this.constructor as typeof CommitteeEntityMongo;
    }

    public static getMongoStatic(): typeof CommitteeEntityMongo {
        return this as typeof CommitteeEntityMongo;
    }

    public getStatic(): typeof CommitteeEntity {
        return this.getMongoStatic().getStatic() as typeof CommitteeEntity;
    }

    public static getStatic(): typeof CommitteeEntity {
        return this.Entity as typeof CommitteeEntity;
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
            scriptHash: string;
            revelance: number;
        }

        const schema = new Schema<Interface>({
            scriptHash: { type: String, required: true },
            revelance: { type: Number, required: true },
        });

        const ModelDB = models[this._mongoTableName] || model<Interface>(this._mongoTableName, schema);
        return ModelDB;
    }

    // #endregion mongo db
}

