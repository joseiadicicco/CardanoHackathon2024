import {
    BackEndApiHandlersFor,
    BackEndAppliedFor,
    BaseBackEndApiHandlers,
    BaseBackEndApplied,
    BaseBackEndMethods,
} from 'smart-db/backEnd';
import { ProposalEntity } from '../Entities/Proposal.Entity';

@BackEndAppliedFor(ProposalEntity)
export class ProposalBackEndApplied extends BaseBackEndApplied   {
    protected static _Entity = ProposalEntity;
    protected static _BackEndMethods = BaseBackEndMethods ;
}

@BackEndApiHandlersFor(ProposalEntity)
export class ProposalApiHandlers extends BaseBackEndApiHandlers    {
    protected static _Entity = ProposalEntity;
    protected static _BackEndApplied = ProposalBackEndApplied;

}

