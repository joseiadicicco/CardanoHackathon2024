import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CandidateEntity } from './Candidate.Entity';
import { PostgreSQLAppliedFor, getPostgreSQLTableName } from 'smart-db';
import { BaseEntityPostgreSQL  } from 'smart-db/backEnd';

@PostgreSQLAppliedFor([CandidateEntity])
@Entity({ name: getPostgreSQLTableName(CandidateEntity.className()) })
@Index(['address', ]) // Add indices as needed
export class CandidateEntityPostgreSQL extends BaseEntityPostgreSQL  {
    protected static Entity = CandidateEntity;

    // #region fields

    @PrimaryGeneratedColumn()
    _id!: number; // Auto-generated primary key

    @Column({ type: "varchar", length: 255  })
    address!:string;
    @Column({ type: "varchar", length: 255  })
    conditionTerm!:boolean;
    @Column({ type: "varchar", length: 255 , nullable: true })
    propursal?:string;

    // #endregion fields

    // #region internal class methods

    public getPostgreSQLStatic(): typeof CandidateEntityPostgreSQL {
        return this.constructor as typeof CandidateEntityPostgreSQL;
    }

    public static getPostgreSQLStatic(): typeof CandidateEntityPostgreSQL {
        return this as typeof CandidateEntityPostgreSQL;
    }

    public getStatic(): typeof CandidateEntity {
        return CandidateEntityPostgreSQL.getPostgreSQLStatic().getStatic() as typeof CandidateEntity;
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

    // #region posgresql db

    public static PostgreSQLModel() {
        return this;
    }

    // #endregion posgresql db
}
