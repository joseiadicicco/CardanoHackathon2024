import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { VoteEntity } from './Vote.Entity';
import { PostgreSQLAppliedFor, getPostgreSQLTableName } from 'smart-db';
import { BaseEntityPostgreSQL  } from 'smart-db/backEnd';

@PostgreSQLAppliedFor([VoteEntity])
@Entity({ name: getPostgreSQLTableName(VoteEntity.className()) })

export class VoteEntityPostgreSQL extends BaseEntityPostgreSQL  {
    protected static Entity = VoteEntity;

    // #region fields

    @PrimaryGeneratedColumn()
    _id!: number; // Auto-generated primary key

    @Column({ type: "varchar", length: 255  })
    propursalId!:string;
    @Column({ type: "varchar", length: 255  })
    address!:string;

    // #endregion fields

    // #region internal class methods

    public getPostgreSQLStatic(): typeof VoteEntityPostgreSQL {
        return this.constructor as typeof VoteEntityPostgreSQL;
    }

    public static getPostgreSQLStatic(): typeof VoteEntityPostgreSQL {
        return this as typeof VoteEntityPostgreSQL;
    }

    public getStatic(): typeof VoteEntity {
        return VoteEntityPostgreSQL.getPostgreSQLStatic().getStatic() as typeof VoteEntity;
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

    // #region posgresql db

    public static PostgreSQLModel() {
        return this;
    }

    // #endregion posgresql db
}
