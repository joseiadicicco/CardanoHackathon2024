import 'reflect-metadata';
import { Convertible, BaseEntity, asEntity } from 'smart-db';
import {  } from 'lucid-cardano';

@asEntity()
export class ProposalEntity extends BaseEntity {
    protected static _apiRoute: string = 'proposal';
    protected static _className: string = 'Proposal';


    // #region fields
    @Convertible()
    actionId!: string;
    @Convertible()
    txId!: string;
    @Convertible()
    status?: string;
    @Convertible()
    proposedIn!: number;
    @Convertible()
    expiresAfter!: number;
    @Convertible()
    dataHash!: string;
    @Convertible()
    url!: string;
    @Convertible()
    deposit!: string;

    // #endregion fields

    // #region db

    public static defaultFieldsWhenUndefined: Record<string, boolean> = {};

    public static alwaysFieldsForSelect: Record<string, boolean> = {
        ...super.alwaysFieldsForSelect,
          actionId: true,
          txId: true,
          status: true,
          proposedIn: true,
          expiresAfter: true,
          dataHash: true,
          url: true,
          deposit: true,
    };

    // #endregion db
}


