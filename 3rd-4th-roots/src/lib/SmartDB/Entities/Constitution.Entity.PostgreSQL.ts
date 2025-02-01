import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ConstitutionEntity } from './Constitution.Entity';
import { PostgreSQLAppliedFor, getPostgreSQLTableName } from 'smart-db';
import { BaseEntityPostgreSQL  } from 'smart-db/backEnd';

@PostgreSQLAppliedFor([ConstitutionEntity])
@Entity({ name: getPostgreSQLTableName(ConstitutionEntity.className()) })

export class ConstitutionEntityPostgreSQL extends BaseEntityPostgreSQL  {
    protected static Entity = ConstitutionEntity;

    // #region fields

    @PrimaryGeneratedColumn()
    _id!: number; // Auto-generated primary key

    @Column({ type: "varchar", length: 255  })
    dataHash!:string;
    @Column({ type: "varchar", length: 255  })
    url!:string;
    @Column({ type: "varchar", length: 255  })
    script!:string;

    // #endregion fields

    // #region internal class methods

    public getPostgreSQLStatic(): typeof ConstitutionEntityPostgreSQL {
        return this.constructor as typeof ConstitutionEntityPostgreSQL;
    }

    public static getPostgreSQLStatic(): typeof ConstitutionEntityPostgreSQL {
        return this as typeof ConstitutionEntityPostgreSQL;
    }

    public getStatic(): typeof ConstitutionEntity {
        return ConstitutionEntityPostgreSQL.getPostgreSQLStatic().getStatic() as typeof ConstitutionEntity;
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

    // #region posgresql db

    public static PostgreSQLModel() {
        return this;
    }

    // #endregion posgresql db
}
