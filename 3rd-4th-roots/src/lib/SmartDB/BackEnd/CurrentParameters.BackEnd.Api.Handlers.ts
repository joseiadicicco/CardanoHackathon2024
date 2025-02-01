import {
    BackEndApiHandlersFor,
    BackEndAppliedFor,
    BaseBackEndApiHandlers,
    BaseBackEndApplied,
    BaseBackEndMethods,
} from 'smart-db/backEnd';
import { CurrentParametersEntity } from '../Entities/CurrentParameters.Entity';

@BackEndAppliedFor(CurrentParametersEntity)
export class CurrentParametersBackEndApplied extends BaseBackEndApplied   {
    protected static _Entity = CurrentParametersEntity;
    protected static _BackEndMethods = BaseBackEndMethods ;
}

@BackEndApiHandlersFor(CurrentParametersEntity)
export class CurrentParametersApiHandlers extends BaseBackEndApiHandlers    {
    protected static _Entity = CurrentParametersEntity;
    protected static _BackEndApplied = CurrentParametersBackEndApplied;

}

