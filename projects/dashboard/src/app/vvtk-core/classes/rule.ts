export class Rule {
    content: string;
    list: {
        title: string;
        content: string;
        hideContent: boolean;
    }[];
}

export class RuleOpts {
    title: string;
    get: string;
    patch: string;
    dirPath: string;
}
