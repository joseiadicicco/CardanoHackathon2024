import 'reflect-metadata';
import { Convertible, BaseEntity, asEntity } from 'smart-db';
import {  } from 'lucid-cardano';

@asEntity()
export class CommitteeEntity extends BaseEntity {
    protected static _apiRoute: string = 'committee';
    protected static _className: string = 'Committee';


    // #region fields
    @Convertible()
    scriptHash!: string;
    @Convertible()
    revelance!: number;

    // #endregion fields

    // #region db

    public static defaultFieldsWhenUndefined: Record<string, boolean> = {};

    public static alwaysFieldsForSelect: Record<string, boolean> = {
        ...super.alwaysFieldsForSelect,
          scriptHash: true,
          revelance: true,
    };

    // #endregion db
}


