import { Permission } from './permission';
export class Role {
    id: string;
    name: string;
    isProtected: boolean;
    permissions: Permission[];
}
