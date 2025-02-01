import 'reflect-metadata';
import { Convertible, BaseEntity, asEntity } from 'smart-db';
import {  } from 'lucid-cardano';

@asEntity()
export class StakePoolVoteEntity extends BaseEntity {
    protected static _apiRoute: string = 'stakepoolvote';
    protected static _className: string = 'StakePoolVote';


    // #region fields
    @Convertible()
    proposalActionId!: string;
    @Convertible()
    poolId!: string;
    @Convertible()
    vote!: string;
    @Convertible()
    dataHash?: string;
    @Convertible()
    url?: string;

    // #endregion fields

    // #region db

    public static defaultFieldsWhenUndefined: Record<string, boolean> = {};

    public static alwaysFieldsForSelect: Record<string, boolean> = {
        ...super.alwaysFieldsForSelect,
          proposalActionId: true,
          poolId: true,
          vote: true,
          dataHash: true,
          url: true,
    };

    // #endregion db
}


