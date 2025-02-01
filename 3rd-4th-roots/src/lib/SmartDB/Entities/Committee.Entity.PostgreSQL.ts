import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CommitteeEntity } from './Committee.Entity';
import { PostgreSQLAppliedFor, getPostgreSQLTableName } from 'smart-db';
import { BaseEntityPostgreSQL  } from 'smart-db/backEnd';

@PostgreSQLAppliedFor([CommitteeEntity])
@Entity({ name: getPostgreSQLTableName(CommitteeEntity.className()) })
@Index(['scriptHash', ]) // Add indices as needed
export class CommitteeEntityPostgreSQL extends BaseEntityPostgreSQL  {
    protected static Entity = CommitteeEntity;

    // #region fields

    @PrimaryGeneratedColumn()
    _id!: number; // Auto-generated primary key

    @Column({ type: "varchar", length: 255  })
    scriptHash!:string;
    @Column({ type: "int"  })
    revelance!:number;

    // #endregion fields

    // #region internal class methods

    public getPostgreSQLStatic(): typeof CommitteeEntityPostgreSQL {
        return this.constructor as typeof CommitteeEntityPostgreSQL;
    }

    public static getPostgreSQLStatic(): typeof CommitteeEntityPostgreSQL {
        return this as typeof CommitteeEntityPostgreSQL;
    }

    public getStatic(): typeof CommitteeEntity {
        return CommitteeEntityPostgreSQL.getPostgreSQLStatic().getStatic() as typeof CommitteeEntity;
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

    // #region posgresql db

    public static PostgreSQLModel() {
        return this;
    }

    // #endregion posgresql db
}
