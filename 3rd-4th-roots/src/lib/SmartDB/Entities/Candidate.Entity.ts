import 'reflect-metadata';
import { Convertible, BaseEntity, asEntity } from 'smart-db';
import {  } from 'lucid-cardano';

@asEntity()
export class CandidateEntity extends BaseEntity {
    protected static _apiRoute: string = 'candidate';
    protected static _className: string = 'Candidate';


    // #region fields
    @Convertible()
    address!: string;
    @Convertible()
    conditionTerm!: boolean;
    @Convertible()
    propursal?: string;

    // #endregion fields

    // #region db

    public static defaultFieldsWhenUndefined: Record<string, boolean> = {};

    public static alwaysFieldsForSelect: Record<string, boolean> = {
        ...super.alwaysFieldsForSelect,
          address: true,
          conditionTerm: true,
          propursal: true,
    };

    // #endregion db
}


