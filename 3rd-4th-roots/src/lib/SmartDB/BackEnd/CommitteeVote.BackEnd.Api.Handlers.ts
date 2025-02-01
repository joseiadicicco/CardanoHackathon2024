import {
    BackEndApiHandlersFor,
    BackEndAppliedFor,
    BaseBackEndApiHandlers,
    BaseBackEndApplied,
    BaseBackEndMethods,
} from 'smart-db/backEnd';
import { CommitteeVoteEntity } from '../Entities/CommitteeVote.Entity';

@BackEndAppliedFor(CommitteeVoteEntity)
export class CommitteeVoteBackEndApplied extends BaseBackEndApplied   {
    protected static _Entity = CommitteeVoteEntity;
    protected static _BackEndMethods = BaseBackEndMethods ;
}

@BackEndApiHandlersFor(CommitteeVoteEntity)
export class CommitteeVoteApiHandlers extends BaseBackEndApiHandlers    {
    protected static _Entity = CommitteeVoteEntity;
    protected static _BackEndApplied = CommitteeVoteBackEndApplied;

}

