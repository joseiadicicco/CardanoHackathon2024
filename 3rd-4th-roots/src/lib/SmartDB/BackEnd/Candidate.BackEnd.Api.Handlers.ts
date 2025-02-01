import {
    BackEndApiHandlersFor,
    BackEndAppliedFor,
    BaseBackEndApiHandlers,
    BaseBackEndApplied,
    BaseBackEndMethods,
} from 'smart-db/backEnd';
import { CandidateEntity } from '../Entities/Candidate.Entity';

@BackEndAppliedFor(CandidateEntity)
export class CandidateBackEndApplied extends BaseBackEndApplied   {
    protected static _Entity = CandidateEntity;
    protected static _BackEndMethods = BaseBackEndMethods ;
}

@BackEndApiHandlersFor(CandidateEntity)
export class CandidateApiHandlers extends BaseBackEndApiHandlers    {
    protected static _Entity = CandidateEntity;
    protected static _BackEndApplied = CandidateBackEndApplied;

}

