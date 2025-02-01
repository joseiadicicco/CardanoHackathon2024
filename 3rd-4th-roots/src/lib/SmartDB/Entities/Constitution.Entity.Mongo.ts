
import { Schema, model, models } from 'mongoose';
import 'reflect-metadata';
import { MongoAppliedFor  } from 'smart-db';
import { BaseEntityMongo  } from 'smart-db/backEnd';
import { ConstitutionEntity } from './Constitution.Entity';

@MongoAppliedFor([ConstitutionEntity])
export class ConstitutionEntityMongo extends BaseEntityMongo  {
    protected static Entity = ConstitutionEntity;
    protected static _mongoTableName: string = ConstitutionEntity.className();

    // #region fields

    // dataHash:String
    // url:String
    // script:String

    // #endregion fields

    // #region internal class methods

    public getMongoStatic(): typeof ConstitutionEntityMongo {
        return this.constructor as typeof ConstitutionEntityMongo;
    }

    public static getMongoStatic(): typeof ConstitutionEntityMongo {
        return this as typeof ConstitutionEntityMongo;
    }

    public getStatic(): typeof ConstitutionEntity {
        return this.getMongoStatic().getStatic() as typeof ConstitutionEntity;
    }

    public static getStatic(): typeof ConstitutionEntity {
        return this.Entity as typeof ConstitutionEntity;
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
            dataHash: string;
            url: string;
            script: string;
        }

        const schema = new Schema<Interface>({
            dataHash: { type: String, required: true },
            url: { type: String, required: true },
            script: { type: String, required: true },
        });

        const ModelDB = models[this._mongoTableName] || model<Interface>(this._mongoTableName, schema);
        return ModelDB;
    }

    // #endregion mongo db
}

