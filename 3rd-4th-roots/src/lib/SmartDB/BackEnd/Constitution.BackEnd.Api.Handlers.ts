import {
    BackEndApiHandlersFor,
    BackEndAppliedFor,
    BaseBackEndApiHandlers,
    BaseBackEndApplied,
    BaseBackEndMethods,
} from 'smart-db/backEnd';
import { ConstitutionEntity } from '../Entities/Constitution.Entity';

@BackEndAppliedFor(ConstitutionEntity)
export class ConstitutionBackEndApplied extends BaseBackEndApplied   {
    protected static _Entity = ConstitutionEntity;
    protected static _BackEndMethods = BaseBackEndMethods ;
}

@BackEndApiHandlersFor(ConstitutionEntity)
export class ConstitutionApiHandlers extends BaseBackEndApiHandlers    {
    protected static _Entity = ConstitutionEntity;
    protected static _BackEndApplied = ConstitutionBackEndApplied;

}

