import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ProposalEntity } from './Proposal.Entity';
import { PostgreSQLAppliedFor, getPostgreSQLTableName } from 'smart-db';
import { BaseEntityPostgreSQL  } from 'smart-db/backEnd';

@PostgreSQLAppliedFor([ProposalEntity])
@Entity({ name: getPostgreSQLTableName(ProposalEntity.className()) })

export class ProposalEntityPostgreSQL extends BaseEntityPostgreSQL  {
    protected static Entity = ProposalEntity;

    // #region fields

    @PrimaryGeneratedColumn()
    _id!: number; // Auto-generated primary key

    @Column({ type: "varchar", length: 255  })
    actionId!:string;
    @Column({ type: "varchar", length: 255  })
    txId!:string;
    @Column({ type: "varchar", length: 255 , nullable: true })
    status?:string;
    @Column({ type: "int"  })
    proposedIn!:number;
    @Column({ type: "int"  })
    expiresAfter!:number;
    @Column({ type: "varchar", length: 255  })
    dataHash!:string;
    @Column({ type: "varchar", length: 255  })
    url!:string;
    @Column({ type: "varchar", length: 255  })
    deposit!:string;

    // #endregion fields

    // #region internal class methods

    public getPostgreSQLStatic(): typeof ProposalEntityPostgreSQL {
        return this.constructor as typeof ProposalEntityPostgreSQL;
    }

    public static getPostgreSQLStatic(): typeof ProposalEntityPostgreSQL {
        return this as typeof ProposalEntityPostgreSQL;
    }

    public getStatic(): typeof ProposalEntity {
        return ProposalEntityPostgreSQL.getPostgreSQLStatic().getStatic() as typeof ProposalEntity;
    }

    public static getStatic(): typeof ProposalEntity {
        return this.Entity as typeof ProposalEntity;
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
