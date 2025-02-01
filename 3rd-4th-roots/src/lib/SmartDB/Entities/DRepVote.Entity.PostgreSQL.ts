import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { DRepVoteEntity } from './DRepVote.Entity';
import { PostgreSQLAppliedFor, getPostgreSQLTableName } from 'smart-db';
import { BaseEntityPostgreSQL  } from 'smart-db/backEnd';

@PostgreSQLAppliedFor([DRepVoteEntity])
@Entity({ name: getPostgreSQLTableName(DRepVoteEntity.className()) })

export class DRepVoteEntityPostgreSQL extends BaseEntityPostgreSQL  {
    protected static Entity = DRepVoteEntity;

    // #region fields

    @PrimaryGeneratedColumn()
    _id!: number; // Auto-generated primary key

    @Column({ type: "varchar", length: 255  })
    proposalActionId!:string;
    @Column({ type: "varchar", length: 255  })
    keyHash!:string;
    @Column({ type: "varchar", length: 255  })
    vote!:string;
    @Column({ type: "varchar", length: 255 , nullable: true })
    dataHash?:string;
    @Column({ type: "varchar", length: 255 , nullable: true })
    url?:string;

    // #endregion fields

    // #region internal class methods

    public getPostgreSQLStatic(): typeof DRepVoteEntityPostgreSQL {
        return this.constructor as typeof DRepVoteEntityPostgreSQL;
    }

    public static getPostgreSQLStatic(): typeof DRepVoteEntityPostgreSQL {
        return this as typeof DRepVoteEntityPostgreSQL;
    }

    public getStatic(): typeof DRepVoteEntity {
        return DRepVoteEntityPostgreSQL.getPostgreSQLStatic().getStatic() as typeof DRepVoteEntity;
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

    // #region posgresql db

    public static PostgreSQLModel() {
        return this;
    }

    // #endregion posgresql db
}
