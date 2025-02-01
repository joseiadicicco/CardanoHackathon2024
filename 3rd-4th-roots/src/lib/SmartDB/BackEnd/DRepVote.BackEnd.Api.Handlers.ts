import {
    BackEndApiHandlersFor,
    BackEndAppliedFor,
    BaseBackEndApiHandlers,
    BaseBackEndApplied,
    BaseBackEndMethods,
} from 'smart-db/backEnd';
import { DRepVoteEntity } from '../Entities/DRepVote.Entity';

@BackEndAppliedFor(DRepVoteEntity)
export class DRepVoteBackEndApplied extends BaseBackEndApplied   {
    protected static _Entity = DRepVoteEntity;
    protected static _BackEndMethods = BaseBackEndMethods ;
}

@BackEndApiHandlersFor(DRepVoteEntity)
export class DRepVoteApiHandlers extends BaseBackEndApiHandlers    {
    protected static _Entity = DRepVoteEntity;
    protected static _BackEndApplied = DRepVoteBackEndApplied;

}

