
import { Schema, model, models } from 'mongoose';
import 'reflect-metadata';
import { MongoAppliedFor  } from 'smart-db';
import { BaseEntityMongo  } from 'smart-db/backEnd';
import { CurrentParametersEntity } from './CurrentParameters.Entity';

@MongoAppliedFor([CurrentParametersEntity])
export class CurrentParametersEntityMongo extends BaseEntityMongo  {
    protected static Entity = CurrentParametersEntity;
    protected static _mongoTableName: string = CurrentParametersEntity.className();

    // #region fields

    // collateralPercentage:Int
    // committeeMaxTermLength:Int
    // committeeminSize:Int
    // monetaryExpansion:Float
    // treasuryCut:Float
    // maxTxSize:Int
    // txFeePerByte:Float

    // #endregion fields

    // #region internal class methods

    public getMongoStatic(): typeof CurrentParametersEntityMongo {
        return this.constructor as typeof CurrentParametersEntityMongo;
    }

    public static getMongoStatic(): typeof CurrentParametersEntityMongo {
        return this as typeof CurrentParametersEntityMongo;
    }

    public getStatic(): typeof CurrentParametersEntity {
        return this.getMongoStatic().getStatic() as typeof CurrentParametersEntity;
    }

    public static getStatic(): typeof CurrentParametersEntity {
        return this.Entity as typeof CurrentParametersEntity;
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
            collateralPercentage: number;
            committeeMaxTermLength: number;
            committeeminSize: number;
            monetaryExpansion: number;
            treasuryCut: number;
            maxTxSize: number;
            txFeePerByte: number;
        }

        const schema = new Schema<Interface>({
            collateralPercentage: { type: Number, required: true },
            committeeMaxTermLength: { type: Number, required: true },
            committeeminSize: { type: Number, required: true },
            monetaryExpansion: { type: Number, required: true },
            treasuryCut: { type: Number, required: true },
            maxTxSize: { type: Number, required: true },
            txFeePerByte: { type: Number, required: true },
        });

        const ModelDB = models[this._mongoTableName] || model<Interface>(this._mongoTableName, schema);
        return ModelDB;
    }

    // #endregion mongo db
}

