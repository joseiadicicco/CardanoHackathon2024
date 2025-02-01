import 'reflect-metadata';
import { Convertible, BaseEntity, asEntity } from 'smart-db';
import {  } from 'lucid-cardano';

@asEntity()
export class ConstitutionEntity extends BaseEntity {
    protected static _apiRoute: string = 'constitution';
    protected static _className: string = 'Constitution';


    // #region fields
    @Convertible()
    dataHash!: string;
    @Convertible()
    url!: string;
    @Convertible()
    script!: string;

    // #endregion fields

    // #region db

    public static defaultFieldsWhenUndefined: Record<string, boolean> = {};

    public static alwaysFieldsForSelect: Record<string, boolean> = {
        ...super.alwaysFieldsForSelect,
          dataHash: true,
          url: true,
          script: true,
    };

    // #endregion db
}


