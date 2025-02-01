import {
    BackEndApiHandlersFor,
    BackEndAppliedFor,
    BaseBackEndApiHandlers,
    BaseBackEndApplied,
    BaseBackEndMethods,
} from 'smart-db/backEnd';
import { CommitteeEntity } from '../Entities/Committee.Entity';

@BackEndAppliedFor(CommitteeEntity)
export class CommitteeBackEndApplied extends BaseBackEndApplied   {
    protected static _Entity = CommitteeEntity;
    protected static _BackEndMethods = BaseBackEndMethods ;
}

@BackEndApiHandlersFor(CommitteeEntity)
export class CommitteeApiHandlers extends BaseBackEndApiHandlers    {
    protected static _Entity = CommitteeEntity;
    protected static _BackEndApplied = CommitteeBackEndApplied;

}

