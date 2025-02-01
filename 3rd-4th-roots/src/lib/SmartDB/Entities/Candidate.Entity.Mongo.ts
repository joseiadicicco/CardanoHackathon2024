
import { Schema, model, models } from 'mongoose';
import 'reflect-metadata';
import { MongoAppliedFor  } from 'smart-db';
import { BaseEntityMongo  } from 'smart-db/backEnd';
import { CandidateEntity } from './Candidate.Entity';

@MongoAppliedFor([CandidateEntity])
export class CandidateEntityMongo extends BaseEntityMongo  {
    protected static Entity = CandidateEntity;
    protected static _mongoTableName: string = CandidateEntity.className();

    // #region fields

    // address:String
    // conditionTerm:Boolean
    // propursal:String

    // #endregion fields

    // #region internal class methods

    public getMongoStatic(): typeof CandidateEntityMongo {
        return this.constructor as typeof CandidateEntityMongo;
    }

    public static getMongoStatic(): typeof CandidateEntityMongo {
        return this as typeof CandidateEntityMongo;
    }

    public getStatic(): typeof CandidateEntity {
        return this.getMongoStatic().getStatic() as typeof CandidateEntity;
    }

    public static getStatic(): typeof CandidateEntity {
        return this.Entity as typeof CandidateEntity;
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
            address: string;
            conditionTerm: boolean;
            propursal: string;
        }

        const schema = new Schema<Interface>({
            address: { type: String, required: true },
            conditionTerm: { type: Boolean, required: true },
            propursal: { type: String, required: false },
        });

        const ModelDB = models[this._mongoTableName] || model<Interface>(this._mongoTableName, schema);
        return ModelDB;
    }

    // #endregion mongo db
}

