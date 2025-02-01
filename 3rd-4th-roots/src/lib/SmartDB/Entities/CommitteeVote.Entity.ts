import 'reflect-metadata';
import { Convertible, BaseEntity, asEntity } from 'smart-db';
import {  } from 'lucid-cardano';

@asEntity()
export class CommitteeVoteEntity extends BaseEntity {
    protected static _apiRoute: string = 'committeevote';
    protected static _className: string = 'CommitteeVote';


    // #region fields
    @Convertible()
    proposalActionId!: string;
    @Convertible()
    scriptHash!: string;
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
          scriptHash: true,
          vote: true,
          dataHash: true,
          url: true,
    };

    // #endregion db
}


