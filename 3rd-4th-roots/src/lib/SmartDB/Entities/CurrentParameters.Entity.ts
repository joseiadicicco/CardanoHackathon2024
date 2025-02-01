import 'reflect-metadata';
import { Convertible, BaseEntity, asEntity } from 'smart-db';
import {  } from 'lucid-cardano';

@asEntity()
export class CurrentParametersEntity extends BaseEntity {
    protected static _apiRoute: string = 'currentparameters';
    protected static _className: string = 'CurrentParameters';


    // #region fields
    @Convertible()
    collateralPercentage!: number;
    @Convertible()
    committeeMaxTermLength!: number;
    @Convertible()
    committeeminSize!: number;
    @Convertible()
    monetaryExpansion!: number;
    @Convertible()
    treasuryCut!: number;
    @Convertible()
    maxTxSize!: number;
    @Convertible()
    txFeePerByte!: number;

    // #endregion fields

    // #region db

    public static defaultFieldsWhenUndefined: Record<string, boolean> = {};

    public static alwaysFieldsForSelect: Record<string, boolean> = {
        ...super.alwaysFieldsForSelect,
          collateralPercentage: true,
          committeeMaxTermLength: true,
          committeeminSize: true,
          monetaryExpansion: true,
          treasuryCut: true,
          maxTxSize: true,
          txFeePerByte: true,
    };

    // #endregion db
}


