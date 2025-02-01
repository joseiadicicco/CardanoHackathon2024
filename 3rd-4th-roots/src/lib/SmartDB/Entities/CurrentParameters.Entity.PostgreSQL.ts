import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CurrentParametersEntity } from './CurrentParameters.Entity';
import { PostgreSQLAppliedFor, getPostgreSQLTableName } from 'smart-db';
import { BaseEntityPostgreSQL  } from 'smart-db/backEnd';

@PostgreSQLAppliedFor([CurrentParametersEntity])
@Entity({ name: getPostgreSQLTableName(CurrentParametersEntity.className()) })

export class CurrentParametersEntityPostgreSQL extends BaseEntityPostgreSQL  {
    protected static Entity = CurrentParametersEntity;

    // #region fields

    @PrimaryGeneratedColumn()
    _id!: number; // Auto-generated primary key

    @Column({ type: "int"  })
    collateralPercentage!:number;
    @Column({ type: "int"  })
    committeeMaxTermLength!:number;
    @Column({ type: "int"  })
    committeeminSize!:number;
    @Column({ type: "varchar", length: 255  })
    monetaryExpansion!:number;
    @Column({ type: "varchar", length: 255  })
    treasuryCut!:number;
    @Column({ type: "int"  })
    maxTxSize!:number;
    @Column({ type: "varchar", length: 255  })
    txFeePerByte!:number;

    // #endregion fields

    // #region internal class methods

    public getPostgreSQLStatic(): typeof CurrentParametersEntityPostgreSQL {
        return this.constructor as typeof CurrentParametersEntityPostgreSQL;
    }

    public static getPostgreSQLStatic(): typeof CurrentParametersEntityPostgreSQL {
        return this as typeof CurrentParametersEntityPostgreSQL;
    }

    public getStatic(): typeof CurrentParametersEntity {
        return CurrentParametersEntityPostgreSQL.getPostgreSQLStatic().getStatic() as typeof CurrentParametersEntity;
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

    // #region posgresql db

    public static PostgreSQLModel() {
        return this;
    }

    // #endregion posgresql db
}
