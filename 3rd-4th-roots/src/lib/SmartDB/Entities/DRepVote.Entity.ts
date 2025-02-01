import 'reflect-metadata';
import { Convertible, BaseEntity, asEntity } from 'smart-db';
import {  } from 'lucid-cardano';

@asEntity()
export class DRepVoteEntity extends BaseEntity {
    protected static _apiRoute: string = 'drepvote';
    protected static _className: string = 'DRepVote';


    // #region fields
    @Convertible()
    proposalActionId!: string;
    @Convertible()
    keyHash!: string;
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
          keyHash: true,
          vote: true,
          dataHash: true,
          url: true,
    };

    // #endregion db
}


