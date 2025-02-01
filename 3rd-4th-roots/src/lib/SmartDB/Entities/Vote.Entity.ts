import 'reflect-metadata';
import { Convertible, BaseEntity, asEntity } from 'smart-db';
import {  } from 'lucid-cardano';

@asEntity()
export class VoteEntity extends BaseEntity {
    protected static _apiRoute: string = 'vote';
    protected static _className: string = 'Vote';


    // #region fields
    @Convertible()
    propursalId!: string;
    @Convertible()
    address!: string;

    // #endregion fields

    // #region db

    public static defaultFieldsWhenUndefined: Record<string, boolean> = {};

    public static alwaysFieldsForSelect: Record<string, boolean> = {
        ...super.alwaysFieldsForSelect,
          propursalId: true,
          address: true,
    };

    // #endregion db
}


