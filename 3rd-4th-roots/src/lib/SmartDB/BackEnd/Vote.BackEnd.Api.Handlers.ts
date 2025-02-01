import {
    BackEndApiHandlersFor,
    BackEndAppliedFor,
    BaseBackEndApiHandlers,
    BaseBackEndApplied,
    BaseBackEndMethods,
} from 'smart-db/backEnd';
import { VoteEntity } from '../Entities/Vote.Entity';

@BackEndAppliedFor(VoteEntity)
export class VoteBackEndApplied extends BaseBackEndApplied   {
    protected static _Entity = VoteEntity;
    protected static _BackEndMethods = BaseBackEndMethods ;
}

@BackEndApiHandlersFor(VoteEntity)
export class VoteApiHandlers extends BaseBackEndApiHandlers    {
    protected static _Entity = VoteEntity;
    protected static _BackEndApplied = VoteBackEndApplied;

}

