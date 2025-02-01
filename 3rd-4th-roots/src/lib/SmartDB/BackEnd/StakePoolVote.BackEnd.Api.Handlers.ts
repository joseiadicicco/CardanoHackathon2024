import {
    BackEndApiHandlersFor,
    BackEndAppliedFor,
    BaseBackEndApiHandlers,
    BaseBackEndApplied,
    BaseBackEndMethods,
} from 'smart-db/backEnd';
import { StakePoolVoteEntity } from '../Entities/StakePoolVote.Entity';

@BackEndAppliedFor(StakePoolVoteEntity)
export class StakePoolVoteBackEndApplied extends BaseBackEndApplied   {
    protected static _Entity = StakePoolVoteEntity;
    protected static _BackEndMethods = BaseBackEndMethods ;
}

@BackEndApiHandlersFor(StakePoolVoteEntity)
export class StakePoolVoteApiHandlers extends BaseBackEndApiHandlers    {
    protected static _Entity = StakePoolVoteEntity;
    protected static _BackEndApplied = StakePoolVoteBackEndApplied;

}

