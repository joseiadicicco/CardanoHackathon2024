import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { StakePoolVoteEntity } from './StakePoolVote.Entity';
import { PostgreSQLAppliedFor, getPostgreSQLTableName } from 'smart-db';
import { BaseEntityPostgreSQL  } from 'smart-db/backEnd';

@PostgreSQLAppliedFor([StakePoolVoteEntity])
@Entity({ name: getPostgreSQLTableName(StakePoolVoteEntity.className()) })

export class StakePoolVoteEntityPostgreSQL extends BaseEntityPostgreSQL  {
    protected static Entity = StakePoolVoteEntity;

    // #region fields

    @PrimaryGeneratedColumn()
    _id!: number; // Auto-generated primary key

    @Column({ type: "varchar", length: 255  })
    proposalActionId!:string;
    @Column({ type: "varchar", length: 255  })
    poolId!:string;
    @Column({ type: "varchar", length: 255  })
    vote!:string;
    @Column({ type: "varchar", length: 255 , nullable: true })
    dataHash?:string;
    @Column({ type: "varchar", length: 255 , nullable: true })
    url?:string;

    // #endregion fields

    // #region internal class methods

    public getPostgreSQLStatic(): typeof StakePoolVoteEntityPostgreSQL {
        return this.constructor as typeof StakePoolVoteEntityPostgreSQL;
    }

    public static getPostgreSQLStatic(): typeof StakePoolVoteEntityPostgreSQL {
        return this as typeof StakePoolVoteEntityPostgreSQL;
    }

    public getStatic(): typeof StakePoolVoteEntity {
        return StakePoolVoteEntityPostgreSQL.getPostgreSQLStatic().getStatic() as typeof StakePoolVoteEntity;
    }

    public static getStatic(): typeof StakePoolVoteEntity {
        return this.Entity as typeof StakePoolVoteEntity;
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
