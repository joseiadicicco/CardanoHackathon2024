import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CommitteeVoteEntity } from './CommitteeVote.Entity';
import { PostgreSQLAppliedFor, getPostgreSQLTableName } from 'smart-db';
import { BaseEntityPostgreSQL  } from 'smart-db/backEnd';

@PostgreSQLAppliedFor([CommitteeVoteEntity])
@Entity({ name: getPostgreSQLTableName(CommitteeVoteEntity.className()) })

export class CommitteeVoteEntityPostgreSQL extends BaseEntityPostgreSQL  {
    protected static Entity = CommitteeVoteEntity;

    // #region fields

    @PrimaryGeneratedColumn()
    _id!: number; // Auto-generated primary key

    @Column({ type: "varchar", length: 255  })
    proposalActionId!:string;
    @Column({ type: "varchar", length: 255  })
    scriptHash!:string;
    @Column({ type: "varchar", length: 255  })
    vote!:string;
    @Column({ type: "varchar", length: 255 , nullable: true })
    dataHash?:string;
    @Column({ type: "varchar", length: 255 , nullable: true })
    url?:string;

    // #endregion fields

    // #region internal class methods

    public getPostgreSQLStatic(): typeof CommitteeVoteEntityPostgreSQL {
        return this.constructor as typeof CommitteeVoteEntityPostgreSQL;
    }

    public static getPostgreSQLStatic(): typeof CommitteeVoteEntityPostgreSQL {
        return this as typeof CommitteeVoteEntityPostgreSQL;
    }

    public getStatic(): typeof CommitteeVoteEntity {
        return CommitteeVoteEntityPostgreSQL.getPostgreSQLStatic().getStatic() as typeof CommitteeVoteEntity;
    }

    public static getStatic(): typeof CommitteeVoteEntity {
        return this.Entity as typeof CommitteeVoteEntity;
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
