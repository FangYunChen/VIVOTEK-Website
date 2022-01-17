export class TreeNode {
    title: string;
    expanded?: boolean;
    folder?: boolean;
    type: string;
    lazy?: boolean;
    dbData?: any;
    children?: TreeNode[];
}
