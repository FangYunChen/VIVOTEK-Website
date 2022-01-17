import { Review } from './review';
import { Template } from './template';
export class InvestorsCommittee extends Review {
    templates?: Template[];
    sheet?: string;
}
